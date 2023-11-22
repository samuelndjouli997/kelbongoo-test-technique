from django.db import models
from carts.models import Cart
from products.models import Product

# Create your models here.


class Item(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"Item {self.id} in Cart {self.cart.id}"
