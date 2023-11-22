# cart/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from .models import Cart
from products.models import Product
from items.models import Item


@csrf_exempt
def update_cart(request):
    if request.method == 'POST':
        product_id = request.POST.get('product_id')
        quantity = request.POST.get('quantity')

        # Retrieve or create a cart (you might need to implement logic based on your requirements)
        cart, created = Cart.objects.get_or_create(checked_out=False)

        # Retrieve the product
        product = get_object_or_404(Product, pk=product_id)

        # Create or update the item in the cart
        item, created = Item.objects.update_or_create(
            cart=cart,
            product=product,
            defaults={'quantity': quantity}
        )

        # Update the total or perform any other necessary logic

        return JsonResponse({'message': 'Cart updated successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'})
