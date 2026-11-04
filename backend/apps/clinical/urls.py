from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PatientDossierViewSet, ReferralViewSet

router = DefaultRouter()
router.register(r'dossiers', PatientDossierViewSet, basename='dossier')
router.register(r'referrals', ReferralViewSet, basename='referral')

urlpatterns = [
    path('', include(router.urls)),
]
