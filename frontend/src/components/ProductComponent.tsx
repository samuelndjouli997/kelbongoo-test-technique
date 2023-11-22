import React, { useState } from 'react'
import { Product } from '../types/types';
import Button from './Button';


interface ProductCompoentProps {
    product: Product
}


const ProductComponent = ({product}:ProductCompoentProps) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value, 10));
    };



    

  return (
        <div className="bg-white p-4 max-w-sm">
            {/* Product Image */}
            <img src={product.image} alt="test" className="max-w-[230px] h-auto object-cover mb-4 rounded-lg" />

            {/* Product Name */}
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>

            {/* Product Price */}
            <p className="text-gray-700 mb-2">{product.price_excluding_tax}</p>

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
            <Button
                >
                Ajouter au panier
            </Button>
        </div>
  )
}

export default ProductComponent