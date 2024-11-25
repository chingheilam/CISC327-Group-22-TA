# Assignment-5/backend/flights/tests.py
import unittest
from django.test import Client, TestCase
from django.urls import reverse
from flights.models import Flight
import json
import datetime

class FlightAppIntegrationTest(unittest.TestCase):
    
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.client = Client()

    def setUp(self):
        # Add sample flight records to the test database
        Flight.objects.create(
            flight_number='NAN9072',
            departure_city='Toronto',
            arrival_city='Vancouver',
            departure_date=datetime.date(2024, 7, 6),
            departure_time=datetime.time(10, 0),
            arrival_time=datetime.time(15, 0),
            duration='5h 0min',
            aircraft='Boeing 787',
            price_economy=389,
            price_premium=869,
            price_first=2445
        )

    def test_add_and_retrieve_flight(self):
        # Step 1: Add a new flight search request using POST
        new_search = {
            'departure': 'Toronto',
            'arrival': 'Vancouver',
            'date': '2024-07-06'
        }
        response = self.client.post(
            reverse('flights:flight-search'), 
            data=json.dumps(new_search),
            content_type='application/json'
        )
        print(f"Response Status Code (POST): {response.status_code}")
        print(f"Response Data (POST): {response.json()}")
        self.assertEqual(response.status_code, 200)
        self.assertIn('flights', response.json())
        self.assertGreater(len(response.json()['flights']), 0)

        # Step 2: Retrieve all flights using GET with query parameters
        response = self.client.get(
            reverse('flights:flight-search'), 
            data=new_search  
        )
        print(f"Response Status Code (GET): {response.status_code}")
        print(f"Response Data (GET): {response.json()}")
        self.assertEqual(response.status_code, 200)
        self.assertIn('flights', response.json())
        self.assertGreater(len(response.json()['flights']), 0)

if __name__ == '__main__':
    unittest.main()
