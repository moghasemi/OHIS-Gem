import pytest
from django.contrib.auth import get_user_model
from django.db import connection
from rest_framework.test import APIClient


@pytest.mark.django_db
def test_clinical_initial_migration_creates_tables():
    tables = set(connection.introspection.table_names())
    assert "ohis_patient_dossier" in tables
    assert "ohis_referral" in tables


@pytest.mark.django_db
def test_clinical_api_is_denied_to_anonymous_and_authenticated_users():
    client = APIClient()
    anonymous = client.get("/api/v1/clinical/dossiers/")
    assert anonymous.status_code in (401, 403)

    user = get_user_model().objects.create_user(
        username="clinical-api-denied-test", password="test-only-password"
    )
    client.force_authenticate(user=user)
    assert client.get("/api/v1/clinical/dossiers/").status_code == 403
    assert client.get("/api/v1/clinical/referrals/").status_code == 403
