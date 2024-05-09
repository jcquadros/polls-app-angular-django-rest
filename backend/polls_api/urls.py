from django.urls import path, include
from rest_framework import routers

from . import viewsets

router = routers.DefaultRouter()
router.register(r"questions", viewsets.QuestionViewSet)
router.register(r"choices", viewsets.ChoiceViewSet)

urlpatterns = [
   path('', include(router.urls)),
]