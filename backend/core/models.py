"""
OHIS Core Architecture - Foundational Abstract Models
Phase 6.2 Skeleton Specification.
Minimal TimeStampedModel without tenancy, soft-delete, or data ownership logic.
"""
from django.db import models


class TimeStampedModel(models.Model):
    """
    An abstract base class model that provides self-updating
    'created_at' and 'updated_at' fields.
    """
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="تاریخ ایجاد",
        help_text="زمان ثبت اولیه رکورد در سامانه"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="تاریخ آخرین ویرایش",
        help_text="زمان آخرین به‌روزرسانی رکورد"
    )

    class Meta:
        abstract = True
