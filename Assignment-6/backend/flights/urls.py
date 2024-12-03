from django.urls import path
from .views import FlightSearchView

app_name = 'flights'

urlpatterns = [
    path('', FlightSearchView.as_view(), name='flight-search'),

]
