import uuid
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True
    dependencies = []
    operations = [
        migrations.CreateModel(
            name="PatientDossier",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("dossier_number", models.CharField(db_index=True, max_length=32, unique=True)),
                ("national_id", models.CharField(db_index=True, max_length=10)),
                ("first_name", models.CharField(max_length=100)),
                ("last_name", models.CharField(max_length=100)),
                ("father_name", models.CharField(blank=True, max_length=100)),
                ("birth_year", models.CharField(max_length=4)),
                ("gender", models.CharField(choices=[("M", "مرد"), ("F", "زن")], max_length=10)),
                ("mobile", models.CharField(max_length=15)),
                ("company_name", models.CharField(max_length=200)),
                ("job_title", models.CharField(max_length=200)),
                ("duty", models.TextField(blank=True)),
                ("examination_type", models.CharField(choices=[("PRE_EMPLOYMENT", "بدواستخدام"), ("PERIODIC", "دوره‌ای"), ("CASE", "موردی")], default="PERIODIC", max_length=20)),
                ("examination_date", models.CharField(max_length=10)),
                ("status", models.CharField(choices=[("RECEPTION", "پذیرش اولیه"), ("LAB_PENDING", "در انتظار آزمایشگاه"), ("PARACLINIC_PENDING", "در انتظار پاراکلینیک"), ("HSE_PENDING", "در انتظار بهداشت حرفه‌ای"), ("DOCTOR_REVIEW", "در انتظار پزشک طب کار"), ("COMPLETED_LOCKED", "تکمیل و قفل قطعی")], default="RECEPTION", max_length=30)),
                ("is_locked", models.BooleanField(default=False)),
                ("locked_at", models.DateTimeField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"db_table": "ohis_patient_dossier", "ordering": ["-created_at"]},
        ),
        migrations.CreateModel(
            name="Referral",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("specialty", models.CharField(max_length=150)),
                ("reason", models.TextField()),
                ("referral_date", models.CharField(max_length=10)),
                ("result", models.TextField(blank=True)),
                ("status", models.CharField(choices=[("PENDING", "در انتظار"), ("RESOLVED", "تکمیل شده")], default="PENDING", max_length=20)),
                ("dossier", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="referrals", to="clinical.patientdossier")),
            ],
            options={"db_table": "ohis_referral"},
        ),
    ]
