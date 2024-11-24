from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Flight
from .serializers import FlightSerializer

class FlightSearchView(APIView):
    def get(self, request, *args, **kwargs):
        # Extract query parameters from the request
        departure_city = request.query_params.get('departure')
        arrival_city = request.query_params.get('arrival')
        departure_date = request.query_params.get('date')

        # Filter flights based on query parameters
        flights = Flight.objects.filter(
            departure_city=departure_city,
            arrival_city=arrival_city,
            departure_date=departure_date
        ).order_by('departure_time')

        serializer = FlightSerializer(flights, many=True)
        return Response({'flights': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        # Extract data from request body
        departure_city = request.data.get('departure')
        arrival_city = request.data.get('arrival')
        departure_date = request.data.get('date')

        # Filter flights based on the extracted data
        flights = Flight.objects.filter(
            departure_city=departure_city,
            arrival_city=arrival_city,
            departure_date=departure_date
        ).order_by('departure_time')

        serializer = FlightSerializer(flights, many=True)
        return Response({'flights': serializer.data}, status=status.HTTP_200_OK)
