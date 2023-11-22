from django.db import models

# Create your models here.


class Cart(models.Model):
    checked_out = models.BooleanField(default=False)

    def __str__(self):
        return f"Cart {self.id}"
