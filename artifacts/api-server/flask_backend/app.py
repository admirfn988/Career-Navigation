import os
import uuid
from typing import Any

from flask import Flask, jsonify, request, session

from database import DatabaseUnavailable, check_database, read_state, write_state

SESSION_SECRET = os.environ.get("SESSION_SECRET")
if not SESSION_SECRET:
    raise RuntimeError(
        "SESSION_SECRET is required. Configure it in Replit Secrets before starting the Flask API."
    )

app = Flask(__name__)
app.config.update(
    SECRET_KEY=SESSION_SECRET,
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Lax",
    SESSION_COOKIE_SECURE=os.environ.get("SESSION_COOKIE_SECURE", "false").lower()
    == "true",
    SESSION_COOKIE_PATH="/api/career",
)

MAX_SKILLS = 40
MAX_INTERESTS = 20


def _error(error: str, message: str, status: int):
    return jsonify({"error": error, "message": message}), status


def _validate_text(value: Any, name: str, max_length: int, required: bool) -> str:
    if not isinstance(value, str):
        raise ValueError(f"{name} must be text.")
    value = value.strip()
    if required and not value:
        raise ValueError(f"{name} is required.")
    if len(value) > max_length:
        raise ValueError(f"{name} must be {max_length} characters or fewer.")
    return value


def _validate_list(value: Any, name: str, max_items: int) -> list[str]:
    if not isinstance(value, list) or not value or len(value) > max_items:
        raise ValueError(f"{name} must contain between 1 and {max_items} items.")

    normalized = []
    for item in value:
        normalized_item = _validate_text(item, name, 100, required=True).lower()
        if normalized_item not in normalized:
            normalized.append(normalized_item)
    return normalized


def _validate_state(payload: Any) -> dict:
    if not isinstance(payload, dict):
        raise ValueError("The request body must be a JSON object.")

    expected = {"profile", "profileIsSample", "selectedCareerId", "scenario"}
    if set(payload) != expected:
        raise ValueError("Provide profile, selectedCareerId, and scenario.")

    profile = payload["profile"]
    if not isinstance(profile, dict):
        raise ValueError("profile must be an object.")
    profile_fields = {"education", "skills", "experience", "projects", "interests"}
    if set(profile) != profile_fields:
        raise ValueError(
            "profile must include education, skills, experience, projects, and interests."
        )

    selected_career_id = payload["selectedCareerId"]
    profile_is_sample = payload["profileIsSample"]
    if not isinstance(profile_is_sample, bool):
        raise ValueError("profileIsSample must be true or false.")
    if selected_career_id is not None:
        selected_career_id = _validate_text(
            selected_career_id, "selectedCareerId", 100, required=True
        )

    scenario = payload["scenario"]
    if not isinstance(scenario, str) or scenario not in {"moderate", "fast"}:
        raise ValueError("scenario must be moderate or fast.")

    return {
        "profile": {
            "education": _validate_text(profile["education"], "education", 500, True),
            "skills": _validate_list(profile["skills"], "skills", MAX_SKILLS),
            "experience": _validate_text(
                profile["experience"], "experience", 5000, False
            ),
            "projects": _validate_text(profile["projects"], "projects", 5000, False),
            "interests": _validate_list(
                profile["interests"], "interests", MAX_INTERESTS
            ),
        },
        "profileIsSample": profile_is_sample,
        "selectedCareerId": selected_career_id,
        "scenario": scenario,
    }


@app.before_request
def ensure_browser_session():
    if request.endpoint in {"get_career_state", "save_career_state"}:
        if not session.get("navigator_session_id"):
            session["navigator_session_id"] = uuid.uuid4().hex


@app.get("/api/career/healthz")
def career_api_health():
    database = check_database()
    return jsonify(
        {
            "status": "ok" if database == "connected" else "degraded",
            "database": database,
        }
    )


@app.get("/api/career/state")
def get_career_state():
    try:
        state = read_state(session["navigator_session_id"])
        return jsonify(state)
    except DatabaseUnavailable as error:
        return _error("database_unavailable", str(error), 503)


@app.put("/api/career/state")
def save_career_state():
    try:
        state = _validate_state(request.get_json(silent=True))
    except ValueError as error:
        return _error("invalid_request", str(error), 400)

    try:
        saved_state = write_state(session["navigator_session_id"], state)
        return jsonify(saved_state)
    except DatabaseUnavailable as error:
        return _error("database_unavailable", str(error), 503)


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", "5000")),
        debug=False,
    )
