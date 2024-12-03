from django.test import TestCase

# Create your tests here.
from django.urls import reverse
from rest_framework import status
from .models import Registration

class LoginAPITest(TestCase):

    def setUp(self):
        """----Create Test User----"""
        self.user_data = {
            "email": "testuser@example.com",
            "password": "testpassword",
            "first_name": "Test",
            "last_name": "User",
            "gender": "Male",
            "phone_number": "1234567890",
            "birth": "1990-01-01",
            "address": "123 Test Street",
            "unit": "",
            "city": "Test City",
            "country": "Test Country",
            "postal_code": "12345"
        }
        # Create test user
        Registration.objects.create(**self.user_data)

    def test_login_success(self):
        """Login Successful Case"""
        login_data = {
            "email": "testuser@example.com",
            "password": "testpassword"
        }

        response = self.client.post(reverse('login'), data=login_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['message'], 'Login successful')

    def test_login_failure_wrong_password(self):
        """Login Failed Case, Wrong Passwd"""
        login_data = {
            "email": "testuser@example.com",
            "password": "wrongpassword"
        }

        response = self.client.post(reverse('login'), data=login_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json()['error'], 'Invalid email or password')

    def test_login_failure_invalid_email(self):
        """Login Failed Case, Invalid email address"""
        login_data = {
            "email": "nonexistent@example.com",
            "password": "testpassword"
        }

        response = self.client.post(reverse('login'), data=login_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json()['error'], 'Invalid email or password')
