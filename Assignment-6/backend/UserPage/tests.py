from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import User


class UserProfileIntegrationTest(TestCase):
    def setUp(self):
        """Set up test client and sample user data"""
        self.client = APIClient()
        self.user_data = {
            "firstName": "Alice",
            "lastName": "Smith",
            "address": "123 Main St",
            "province": "Ontario",
            "postalCode": "K1A 0B1",
            "dob": "1990-01-01",
            "gender": "Female",
            "email": "alice@example.com",
            "password": "securepassword",
        }
        self.user_list_url = reverse('user-list')  # Endpoint for the user resource.

    def test_create_and_retrieve_user(self):
        """Test creating a user and retrieving the user profile"""
        # Step 1: Create a user via POST
        response = self.client.post(self.user_list_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Verify the user was created in the database
        created_user = User.objects.get(email=self.user_data['email'])
        self.assertEqual(created_user.firstName, self.user_data['firstName'])
        self.assertEqual(created_user.lastName, self.user_data['lastName'])

        # Step 2: Retrieve the created user via GET
        user_detail_url = reverse('user-detail', args=[created_user.id])
        response = self.client.get(user_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verify the response data matches the user
        response_data = response.json()
        self.assertEqual(response_data['firstName'], self.user_data['firstName'])
        self.assertEqual(response_data['email'], self.user_data['email'])
