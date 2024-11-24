import datetime
import random
from django.core.management.base import BaseCommand
from django.db import transaction
from flights.models import Flight

class Command(BaseCommand):
    help = 'Add sample flight records to the database'

    def handle(self, *args, **kwargs):
        # Use a transaction to ensure data integrity
        with transaction.atomic():

            # Define departure and arrival cities with approximate durations in hours
            flight_durations = {
                ("Toronto (YYZ)", "Vancouver (YVR)"): 5,
                ("Toronto (YYZ)", "London (LHR)"): 7,
                ("Toronto (YYZ)", "Paris (CDG)"): 7.5,
                ("Toronto (YYZ)", "Tokyo (HND)"): 12,
                ("New York (JFK)", "Vancouver (YVR)"): 6,
                ("New York (JFK)", "London (LHR)"): 7,
                ("New York (JFK)", "Paris (CDG)"): 7.5,
                ("New York (JFK)", "Tokyo (HND)"): 14,
                ("Los Angeles (LAX)", "Vancouver (YVR)"): 3,
                ("Los Angeles (LAX)", "London (LHR)"): 10,
                ("Los Angeles (LAX)", "Paris (CDG)"): 11,
                ("Los Angeles (LAX)", "Tokyo (HND)"): 11,
                ("Chicago (ORD)", "Vancouver (YVR)"): 4.5,
                ("Chicago (ORD)", "London (LHR)"): 7.5,
                ("Chicago (ORD)", "Paris (CDG)"): 8,
                ("Chicago (ORD)", "Tokyo (HND)"): 13,
            }

            aircrafts = ["AirBus A330", "Boeing 777", "AirBus A320", "Boeing 787"]

            # Date range to generate sample data for (July 2024 to August 2024)
            start_date = datetime.date(2024, 7, 1)
            end_date = datetime.date(2024, 8, 31)

            # Loop through each day in the date range
            for single_date in range((end_date - start_date).days + 1):
                current_date = start_date + datetime.timedelta(days=single_date)
                
                # Iterate over each city pair to generate flights for each combination
                for (departure_city, arrival_city) in flight_durations.keys():
                    for _ in range(5):  # Generate multiple flights per day for each combination
                        # Flight duration in hours (approximate)
                        duration_hours = flight_durations[(departure_city, arrival_city)]

                        # Generate departure time (between 6 AM and 10 PM)
                        departure_hour = random.randint(6, 22)
                        departure_minute = random.randint(0, 59)
                        departure_time = datetime.time(departure_hour, departure_minute)

                        # Calculate arrival time
                        duration_delta = datetime.timedelta(hours=duration_hours)
                        departure_datetime = datetime.datetime.combine(current_date, departure_time)
                        arrival_datetime = departure_datetime + duration_delta
                        arrival_time = arrival_datetime.time()

                        # Format duration as a string
                        duration_str = f"{duration_hours}h {random.randint(0, 59)}min"

                        aircraft = random.choice(aircrafts)
                        price_economy = random.randint(300, 1000)
                        price_premium = price_economy + random.randint(200, 500)
                        price_first = price_premium + random.randint(1000, 2000)

                        # Create flight entry in the database
                        Flight.objects.create(
                            flight_number=f'NAN{random.randint(1000, 9999)}',
                            departure_city=departure_city,
                            arrival_city=arrival_city,
                            departure_date=current_date,
                            departure_time=departure_time,
                            arrival_time=arrival_time,
                            duration=duration_str,
                            aircraft=aircraft,
                            price_economy=price_economy,
                            price_premium=price_premium,
                            price_first=price_first
                        )

                        # Logging the creation of each flight
                        self.stdout.write(f"Created flight from {departure_city} to {arrival_city} on {current_date} at {departure_time}")

        self.stdout.write(self.style.SUCCESS('Sample flight records added successfully for multiple days.'))
