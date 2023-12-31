import { ChangeEvent, useState } from 'react'
import { useCart, actionTypes } from "../context/CartProvider";
import { Product } from '../types/types';
import Button from './Button';
import axios from 'axios';
import { calculatePriceTTC } from '../utils/calculations';
import { toast } from 'react-hot-toast';


interface ProductCompoentProps {
    product: Product
}


const ProductComponent = ({product}:ProductCompoentProps) => {
    const [quantity, setQuantity] = useState(1);
    const isOutOfStock = product.max_available_stock === 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { dispatch }:any = useCart();

    const handleQuantityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setQuantity(parseInt(e.target.value, 10));
    };

    const handleAddToCart = async () => {
        try {
          const priceTTC = calculatePriceTTC(product.price_excluding_tax, product.tva, quantity);

          dispatch({
            type: actionTypes.ADD_TO_CART,
            payload: {
              id: product.id, 
              product: {
                ...product,
                priceTTC,
              },
              quantity,
            },
          });
    
          // Here we post the product to the cart in the backend
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
            toast.success('Produit ajouté au panier avec succès!');
          } else {
            toast.error('Erreur lors de l\'ajout du produit au panier!');
          }
        } catch (error) {
          toast.error(`Erreur lors de l'ajout du produit au panier!', ${error}`);
        }
    };    
      

  return (
        <div className={"bg-white p-4 max-w-sm"}>
            {/* Product Image */}
            <img
            src={product.image}
            alt="test"
            className={`max-w-[230px] h-auto object-cover mb-4 rounded-lg ${isOutOfStock ? 'grayscale' : ''}`}
            />

            {/* Product Name */}
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>

            {/* Product Price */}
            <p className="text-gray-700 mb-2">{calculatePriceTTC(product.price_excluding_tax, product.tva, quantity).toFixed(2)} €</p>

            {/* Select Quantity */}
            <div className="flex items-center mb-4">
                <label htmlFor="quantity" className="mr-2">Quantité:</label>
                <select
                    id="quantity"
                    name="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="border rounded-md p-2"
                    disabled={isOutOfStock}
                >
                    {[...Array(product.max_available_stock).keys()].map((index) => (
                        <option key={index + 1} value={index + 1}>
                        {index + 1}
                        </option>
                    ))}
                </select>
            </div>
            {
                isOutOfStock ? (
                    <p className="text-red-500 text-[16px] mt-6">Le produit est en rupture de stock. ❌</p>
                ) : <Button onClick={handleAddToCart}>
                        Ajouter au panier
                    </Button>
            }

            
        </div>
  )
}

export default ProductComponent