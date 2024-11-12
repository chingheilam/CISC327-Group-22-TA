from django.db import models

class User(models.Model):
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    address = models.TextField()
    province = models.CharField(max_length=20)
    postalCode = models.CharField(max_length=10)
    dob = models.TextField()
    gender = models.CharField(max_length=10)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

class Card(models.Model):
    CARD_TYPE_CHOICES = [('credit', 'Credit'), ('debit', 'Debit')]
    cardholder_name = models.CharField(max_length=50)
    card_number = models.CharField(max_length=16)
    expiry_date = models.CharField(max_length=5)
    cvv = models.CharField(max_length=3)
    card_type = models.CharField(max_length=6, choices=CARD_TYPE_CHOICES)

    
