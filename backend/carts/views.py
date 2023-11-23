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


@csrf_exempt
def checkout(request):
    if request.method == 'POST':
        # Retrieve the most recent cart that is not checked out
        cart = Cart.objects.filter(checked_out=False).last()

        # If the cart exists and is not already checked out, mark it as checked out
        if cart:
            cart.checked_out = True
            cart.save()

            # Get the items associated with this cart
            items = Item.objects.filter(cart=cart)

            # Update the total stock of products
            for item in items:
                product = item.product
                product.max_available_stock -= item.quantity
                product.save()

            # Delete the cart and its associated items
            cart.delete()
            items.delete()

            return JsonResponse({'message': 'Checkout successful'})
        else:
            return JsonResponse({'error': 'No available cart to check out'})
    else:
        return JsonResponse({'error': 'Invalid request method'})
