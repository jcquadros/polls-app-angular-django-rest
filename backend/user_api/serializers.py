from django.forms import ValidationError
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    	
	def create(self, validated_data):
		user = UserModel.objects.create_user(**validated_data)
		return user
	
	class Meta:
		model = UserModel
		fields = ('username', 'password')
		extra_kwargs = {'password': {'write_only': True}}

	def validate(self, data):
		username = data['username'].strip()
		password = data['password'].strip()

		if not username:
			raise ValidationError('Username is required')
		
		if not password or len(password) < 8:
			raise ValidationError('Password must be at least 8 characters long')
		
		if UserModel.objects.filter(username=data['username']).exists():
			raise ValidationError('User already exists')
		return data

class UserLoginSerializer(serializers.Serializer):
	username = serializers.CharField()
	password = serializers.CharField()

	def check_user(self, validated_data):
		user = authenticate(username=validated_data['username'], password=validated_data['password'])
		if user is None:
			raise ValidationError('Invalid username or password')
		return user

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ('username', )
		extra_kwargs = {'username': {'read_only': True}}

	