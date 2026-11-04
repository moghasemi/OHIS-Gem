from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.cache import cache
from .models import PatientDossier, Referral
from .serializers import PatientDossierSerializer, ReferralSerializer

class PatientDossierViewSet(viewsets.ModelViewSet):
    queryset = PatientDossier.objects.all()
    serializer_class = PatientDossierSerializer

    def retrieve(self, request, *args, **kwargs):
        dossier_id = kwargs.get('pk')
        cache_key = f"dossier_detail_{dossier_id}"
        cached_data = cache.get(cache_key)
        if cached_data:
            return Response(cached_data)

        response = super().retrieve(request, *args, **kwargs)
        cache.set(cache_key, response.data, timeout=300)
        return response

    @action(detail=True, methods=['post'], url_path='lock')
    def lock_dossier(self, request, pk=None):
        dossier = self.get_object()
        doctor_opinion = request.data.get('opinion')
        recommendations = request.data.get('recommendations', '')

        try:
            dossier.lock_dossier(doctor_opinion, recommendations)
            # Invalidate redis cache on lock
            cache.delete(f"dossier_detail_{pk}")
            return Response({
                'success': True,
                'message': 'پرونده پزشکی شاغل با موفقیت قفل شد.',
                'status': dossier.status,
                'is_locked': dossier.is_locked,
            })
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ReferralViewSet(viewsets.ModelViewSet):
    queryset = Referral.objects.all()
    serializer_class = ReferralSerializer
