# cart/urls.py
from django.urls import path
from .views import update_cart

urlpatterns = [
    path('update_cart/', update_cart, name='update_cart'),
]
