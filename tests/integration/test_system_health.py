"""
Integration Tests for OHIS Infrastructure Health.
Validates live connection and operations with PostgreSQL and Redis.
"""
import pytest
from django.db import connection
from django.core.cache import cache
from django.core.management import call_command


@pytest.mark.django_db
def test_postgres_live_connection():
    """
    Verifies actual database connectivity to PostgreSQL
    by executing a live SQL query through Django's DB connection.
    """
    with connection.cursor() as cursor:
        cursor.execute("SELECT 1;")
        row = cursor.fetchone()
    assert row == (1,), f"Expected (1,), got {row}"


def test_redis_live_operations():
    """
    Verifies live Redis cache and broker connectivity
    by executing read/write/delete operations with TTL.
    """
    test_key = "ohis:health:ping"
    test_value = "pong_2026"

    # Set value with 30s timeout
    cache.set(test_key, test_value, timeout=30)
    retrieved = cache.get(test_key)
    assert retrieved == test_value, f"Expected {test_value}, got {retrieved}"

    # Clean up
    cache.delete(test_key)
    assert cache.get(test_key) is None


def test_django_system_check():
    """
    Executes Django's internal system checks to verify apps, models, and settings.
    """
    # call_command('check') raises SystemCheckError if there are fatal issues
    call_command('check')
