from rest_framework import generics
from django.http import HttpResponse
from .models import Flight
from .serializers import FlightSerializer

class FlightSearchView(generics.ListAPIView):
    serializer_class = FlightSerializer

    def get_queryset(self):
        # Extract query parameters from the request
        departure_city = self.request.query_params.get('departure')
        arrival_city = self.request.query_params.get('arrival')
        departure_date = self.request.query_params.get('date')

        print(f"Departure: {departure_city}, Arrival: {arrival_city}, Date: {departure_date}")
        # Filter flights based on query parameters
        flights = Flight.objects.filter(
            departure_city=departure_city,
            arrival_city=arrival_city,
            departure_date=departure_date
        ).order_by('departure_time')
        
        print(f"Queryset flights: {flights.count()} flights founds")

        return flights
    
# Index view for the root URL
def index(request):
    return HttpResponse("Welcome to Northwind Airlines!")