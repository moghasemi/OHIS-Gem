from rest_framework import serializers
from .models import PatientDossier, Referral

class ReferralSerializer(serializers.ModelSerializer):
    class Meta:
        model = Referral
        fields = '__all__'

class PatientDossierSerializer(serializers.ModelSerializer):
    referrals = ReferralSerializer(many=True, read_only=True)

    class Meta:
        model = PatientDossier
        fields = '__all__'
