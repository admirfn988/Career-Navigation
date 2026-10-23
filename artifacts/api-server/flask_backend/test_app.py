import os
import unittest

os.environ.setdefault("SESSION_SECRET", "test-only-session-secret")
os.environ.pop("MYSQL_URL", None)

from app import app  # noqa: E402


class CareerApiTests(unittest.TestCase):
    def setUp(self):
        app.config["TESTING"] = True
        self.client = app.test_client()

    def test_health_reports_missing_mysql_without_claiming_ready(self):
        response = self.client.get("/api/career/healthz")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), {
            "status": "degraded",
            "database": "not_configured",
        })

    def test_read_fails_explicitly_when_mysql_is_not_configured(self):
        response = self.client.get("/api/career/state")
        self.assertEqual(response.status_code, 503)
        self.assertEqual(response.get_json()["error"], "database_unavailable")

    def test_invalid_write_is_rejected_before_database_access(self):
        response = self.client.put(
            "/api/career/state",
            json={"profile": {}},
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.get_json()["error"], "invalid_request")

    def test_invalid_scenario_type_is_rejected_before_database_access(self):
        response = self.client.put(
            "/api/career/state",
            json={
                "profile": {
                    "education": "Test learning path",
                    "skills": ["research"],
                    "experience": "",
                    "projects": "",
                    "interests": ["technology"],
                },
                "profileIsSample": False,
                "selectedCareerId": None,
                "scenario": [],
            },
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.get_json()["error"], "invalid_request")

    def test_valid_write_does_not_claim_success_without_mysql(self):
        response = self.client.put(
            "/api/career/state",
            json={
                "profile": {
                    "education": "Test learning path",
                    "skills": ["research"],
                    "experience": "",
                    "projects": "",
                    "interests": ["technology"],
                },
                "profileIsSample": False,
                "selectedCareerId": None,
                "scenario": "moderate",
            },
        )
        self.assertEqual(response.status_code, 503)
        self.assertEqual(response.get_json()["error"], "database_unavailable")


if __name__ == "__main__":
    unittest.main()
