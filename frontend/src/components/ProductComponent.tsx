import React, { ChangeEvent, useState } from 'react'
import { useCart, actionTypes } from "../context/CartProvider";
import { Product } from '../types/types';
import Button from './Button';
import axios from 'axios';
import { calculatePriceTTC } from '../utils/calculations';


interface ProductCompoentProps {
    product: Product
}


const ProductComponent = ({product}:ProductCompoentProps) => {
    const [quantity, setQuantity] = useState(1);
    const { dispatch } = useCart();

    const handleQuantityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setQuantity(parseInt(e.target.value, 10));
    };

    const handleAddToCart = async () => {
        try {
          const priceTTC = calculatePriceTTC(product.price_excluding_tax, product.tva);

          dispatch({
            type: actionTypes.ADD_TO_CART,
            payload: {
              product: {
                ...product,
                priceTTC,
              },
              quantity,
            },
          });
    
          // Effectuez une requête HTTP pour mettre à jour le panier côté serveur
          const response = await axios.post(
            'http://127.0.0.1:8000/cart/update_cart/',
            `product_id=${product.id}&quantity=${quantity}`,
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': 'your-csrf-token',
              },
            }
          );
    
          if (response.status === 200) {
            console.log('Produit ajouté au panier avec succès côté serveur!');
          } else {
            console.error("Erreur lors de l'ajout du produit au panier. Code HTTP:", response.status);
          }
        } catch (error) {
          console.error('Erreur lors de la requête:', error);
        }
    };    
      

  return (
        <div className="bg-white p-4 max-w-sm">
            {/* Product Image */}
            <img src={product.image} alt="test" className="max-w-[230px] h-auto object-cover mb-4 rounded-lg" />

            {/* Product Name */}
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>

            {/* Product Price */}
            <p className="text-gray-700 mb-2">{calculatePriceTTC(product.price_excluding_tax, product.tva).toFixed(2)} €</p>

            {/* Select Quantity */}
            <div className="flex items-center mb-4">
                <label htmlFor="quantity" className="mr-2">Quantité:</label>
                <select
                    id="quantity"
                    name="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="border rounded-md p-2"
                >
                    {[...Array(product.max_available_stock).keys()].map((index) => (
                        <option key={index + 1} value={index + 1}>
                        {index + 1}
                        </option>
                    ))}
                </select>
            </div>

            {/* You can add an "Add to Cart" button or any other actions */}
            <Button onClick={handleAddToCart}>
                Ajouter au panier
            </Button>
        </div>
  )
}

export default ProductComponent