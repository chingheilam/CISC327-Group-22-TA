from django.db import models

# Create your models here.
class Registration(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    gender = models.CharField(max_length=10)
    phone_number = models.CharField(max_length=15)
    birth = models.DateField()
    address = models.CharField(max_length=255)
    unit = models.CharField(max_length=50, blank=True, null=True)
    city = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    postal_code = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.email}: {self.first_name} {self.last_name}"

    class Meta:
        db_table = 'users_account'