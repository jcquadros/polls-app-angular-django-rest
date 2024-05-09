from rest_framework import serializers

from .models import Question, Choice
        
class ChoiceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Choice
        fields = ['url', 'id', 'question', 'choice_text', 'votes']
        
class QuestionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Question
        fields = ['url', 'id', 'question_text', 'pub_date', 'was_published_recently']
        