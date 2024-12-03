from django.shortcuts import render
from rest_framework import viewsets
from .models import User, Card
from .serializers import UserSerializer, CardSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

