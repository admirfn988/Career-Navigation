import json
import logging
import os
import ssl
import threading
from datetime import timezone
from urllib.parse import parse_qs, unquote, urlparse

import pymysql
from pymysql.cursors import DictCursor

logger = logging.getLogger(__name__)
_schema_lock = threading.Lock()
_schema_ready = False

CREATE_STATE_TABLE = """
CREATE TABLE IF NOT EXISTS career_navigator_state (
    session_id CHAR(32) NOT NULL PRIMARY KEY,
    profile JSON NOT NULL,
    profile_is_sample BOOLEAN NOT NULL DEFAULT FALSE,
    selected_career_id VARCHAR(100) NULL,
    scenario VARCHAR(20) NOT NULL DEFAULT 'moderate',
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
"""


class DatabaseUnavailable(Exception):
    """Raised when the external MySQL service cannot be used."""


def _connection_options() -> dict:
    raw_url = os.environ.get("MYSQL_URL", "").strip()
    if not raw_url:
        raise DatabaseUnavailable(
            "MySQL is not configured. Add a MYSQL_URL secret to enable saving."
        )

    try:
        parsed = urlparse(raw_url)
        port = parsed.port or 3306
        database = unquote(parsed.path.lstrip("/"))
    except ValueError as error:
        raise DatabaseUnavailable(
            "MYSQL_URL is invalid. Check its host, port, and database name."
        ) from error

    if parsed.scheme not in {"mysql", "mysql+pymysql"}:
        raise DatabaseUnavailable(
            "MYSQL_URL must use the mysql:// connection format."
        )
    if not parsed.hostname or not parsed.username or not database:
        raise DatabaseUnavailable(
            "MYSQL_URL must include a username, host, and database name."
        )

    options = {
        "host": parsed.hostname,
        "port": port,
        "user": unquote(parsed.username),
        "password": unquote(parsed.password or ""),
        "database": database,
        "charset": "utf8mb4",
        "cursorclass": DictCursor,
        "connect_timeout": 5,
        "read_timeout": 10,
        "write_timeout": 10,
        "autocommit": False,
        "init_command": "SET time_zone = '+00:00'",
    }

    if parse_qs(parsed.query).get("ssl", ["false"])[0].lower() == "true":
        options["ssl"] = ssl.create_default_context()

    return options


def get_connection():
    global _schema_ready

    try:
        connection = pymysql.connect(**_connection_options())
        with _schema_lock:
            if not _schema_ready:
                with connection.cursor() as cursor:
                    cursor.execute(CREATE_STATE_TABLE)
                connection.commit()
                _schema_ready = True
        return connection
    except DatabaseUnavailable:
        raise
    except Exception as error:
        logger.error("MySQL connection or schema setup failed (%s)", type(error).__name__)
        raise DatabaseUnavailable(
            "MySQL could not be reached. Check the connection details, network access, and TLS settings."
        ) from error


def read_state(session_id: str) -> dict:
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT profile, profile_is_sample, selected_career_id, scenario, updated_at
                FROM career_navigator_state
                WHERE session_id = %s
                """,
                (session_id,),
            )
            row = cursor.fetchone()
        if not row:
            return {
                "profile": None,
                "profileIsSample": False,
                "selectedCareerId": None,
                "scenario": "moderate",
                "updatedAt": None,
            }

        profile = row["profile"]
        if isinstance(profile, (str, bytes, bytearray)):
            profile = json.loads(profile)

        updated_at = row["updated_at"]
        if updated_at.tzinfo is None:
            updated_at = updated_at.replace(tzinfo=timezone.utc)

        return {
            "profile": profile,
            "profileIsSample": bool(row["profile_is_sample"]),
            "selectedCareerId": row["selected_career_id"],
            "scenario": row["scenario"],
            "updatedAt": updated_at.isoformat().replace("+00:00", "Z"),
        }
    except DatabaseUnavailable:
        raise
    except Exception as error:
        logger.error("MySQL state read failed (%s)", type(error).__name__)
        raise DatabaseUnavailable(
            "MySQL could not read the saved career state."
        ) from error
    finally:
        connection.close()


def write_state(session_id: str, state: dict) -> dict:
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO career_navigator_state
                    (session_id, profile, profile_is_sample, selected_career_id, scenario)
                VALUES (%s, %s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    profile = VALUES(profile),
                    profile_is_sample = VALUES(profile_is_sample),
                    selected_career_id = VALUES(selected_career_id),
                    scenario = VALUES(scenario),
                    updated_at = CURRENT_TIMESTAMP
                """,
                (
                    session_id,
                    json.dumps(state["profile"], ensure_ascii=False),
                    state["profileIsSample"],
                    state["selectedCareerId"],
                    state["scenario"],
                ),
            )
        connection.commit()
    except DatabaseUnavailable:
        raise
    except Exception as error:
        connection.rollback()
        logger.error("MySQL state write failed (%s)", type(error).__name__)
        raise DatabaseUnavailable(
            "MySQL could not save the career state."
        ) from error
    finally:
        connection.close()

    return read_state(session_id)


def check_database() -> str:
    if not os.environ.get("MYSQL_URL", "").strip():
        return "not_configured"

    try:
        connection = get_connection()
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1 AS connected")
                cursor.fetchone()
        finally:
            connection.close()
        return "connected"
    except DatabaseUnavailable:
        return "unavailable"
