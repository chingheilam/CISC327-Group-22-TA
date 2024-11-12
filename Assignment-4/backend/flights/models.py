from django.db import models

class Flight(models.Model):
    flight_number = models.CharField(max_length=10)
    departure_city = models.CharField(max_length=100)
    arrival_city = models.CharField(max_length=100)
    departure_date = models.DateField()
    departure_time = models.TimeField()
    arrival_time = models.TimeField()
    duration = models.CharField(max_length=100)
    aircraft = models.CharField(max_length=100)
    price_economy = models.DecimalField(max_digits=8, decimal_places=2)
    price_premium = models.DecimalField(max_digits=8, decimal_places=2)
    price_first = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return f"{self.flight_number} - {self.departure_city} to {self.arrival_city}"
    
    class Meta:
        db_table = 'flights_flight'
