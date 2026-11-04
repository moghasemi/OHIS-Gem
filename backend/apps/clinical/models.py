import uuid
from django.db import models
from django.core.exceptions import ValidationError

class ExaminationType(models.TextChoices):
    PRE_EMPLOYMENT = 'PRE_EMPLOYMENT', 'بدواستخدام'
    PERIODIC = 'PERIODIC', 'دوره‌ای'
    CASE = 'CASE', 'موردی'

class DossierStatus(models.TextChoices):
    RECEPTION = 'RECEPTION', 'پذیرش اولیه'
    LAB_PENDING = 'LAB_PENDING', 'در انتظار آزمایشگاه'
    PARACLINIC_PENDING = 'PARACLINIC_PENDING', 'در انتظار پاراکلینیک'
    HSE_PENDING = 'HSE_PENDING', 'در انتظار بهداشت حرفه‌ای'
    DOCTOR_REVIEW = 'DOCTOR_REVIEW', 'در انتظار پزشک طب کار'
    COMPLETED_LOCKED = 'COMPLETED_LOCKED', 'تکمیل و قفل قطعی'

class PatientDossier(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    dossier_number = models.CharField(max_length=32, unique=True, db_index=True)
    national_id = models.CharField(max_length=10, db_index=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    father_name = models.CharField(max_length=100, blank=True)
    birth_year = models.CharField(max_length=4)
    gender = models.CharField(max_length=10, choices=[('M', 'مرد'), ('F', 'زن')])
    mobile = models.CharField(max_length=15)
    company_name = models.CharField(max_length=200)
    job_title = models.CharField(max_length=200)
    duty = models.TextField(blank=True)
    examination_type = models.CharField(max_length=20, choices=ExaminationType.choices, default=ExaminationType.PERIODIC)
    examination_date = models.CharField(max_length=10)
    status = models.CharField(max_length=30, choices=DossierStatus.choices, default=DossierStatus.RECEPTION)
    is_locked = models.BooleanField(default=False)
    locked_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'ohis_patient_dossier'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.dossier_number} - {self.first_name} {self.last_name}"

    def lock_dossier(self, doctor_opinion, recommendations):
        """Clinical Guard: Strict check before locking"""
        if self.is_locked:
            raise ValidationError("پرونده قبلاً قفل شده است.")
        if self.referrals.filter(status='PENDING').exists():
            raise ValidationError("در صورت وجود ارجاع تخصصی در انتظار، اعلام نظریه نهایی منوط به دریافت نتیجه ارجاع است.")
        self.is_locked = True
        self.status = DossierStatus.COMPLETED_LOCKED
        self.save()

class Referral(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    dossier = models.ForeignKey(PatientDossier, on_delete=models.CASCADE, related_name='referrals')
    specialty = models.CharField(max_length=150)
    reason = models.TextField()
    referral_date = models.CharField(max_length=10)
    result = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=[('PENDING', 'در انتظار'), ('RESOLVED', 'تکمیل شده')], default='PENDING')

    class Meta:
        db_table = 'ohis_referral'
