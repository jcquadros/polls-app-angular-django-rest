from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authentication import SessionAuthentication

from .serializers import QuestionSerializer, ChoiceSerializer
from .models import Question, Choice

class QuestionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows questions to be viewed or edited.
    """
    queryset = Question.objects.all().order_by('-pub_date')
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    lookup_field = 'pk'

    # recuperar as choices de uma question
    @action(detail=True, methods=['get'])
    def choices(self, request, pk=None):
        question = self.get_object()
        choices = question.choice_set.all()
        serializer = ChoiceSerializer(choices, many=True, context={'request': request})
        return Response(serializer.data)

class ChoiceViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows choices to be viewed or edited.
    """
    queryset = Choice.objects.all().order_by('-votes')
    serializer_class = ChoiceSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    lookup_field = 'pk'

    @action(detail=True, methods=['post'])
    def vote(self, request, pk=None):
        choice = self.get_object()
        try:
            choice.votes += 1
            choice.save()
            return Response({"message": "Vote recorded."})
        except:
            return Response({"error": "Failed to record vote."}, status=400)