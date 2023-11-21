from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=255)
    price_excluding_tax = models.DecimalField(max_digits=8, decimal_places=2)
    TVA_CHOICES = [
        (5.5, '5.5%'),
        (20, '20%'),
    ]
    tva = models.FloatField(choices=TVA_CHOICES)
    ordered_stock = models.PositiveIntegerField()
    max_available_stock = models.PositiveIntegerField()
    image = models.ImageField(upload_to='products/', null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'
