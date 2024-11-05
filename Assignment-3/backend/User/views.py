from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import make_password, check_password
from .models import Registration


# Create your views here.
# 定义序列化器 data serializer
class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = '__all__'

# 用户注册 User Registration
@api_view(['POST'])
def register(request):
    data = request.data.copy()
    serializer = RegistrationSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 用户登录 Login in
@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = Registration.objects.get(email=email)
        print(f"User found: {user}")
        print(f"Password in database: {user.password}")
    except Registration.DoesNotExist:
        return Response({'error': 'Invalid email or password1'}, status=status.HTTP_400_BAD_REQUEST)

    if password == user.password:
        return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid email or password2'}, status=status.HTTP_400_BAD_REQUEST)