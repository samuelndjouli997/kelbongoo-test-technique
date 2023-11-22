import React, { useEffect, useState } from 'react';
import { getProducts } from '../utils/getProducts';
import ProductComponent from './ProductComponent';
import { Product } from '../types/types';

const Products = () => {
    const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        // Gérer les erreurs de manière appropriée, par exemple, afficher un message à l'utilisateur
        console.error('Error getting products:', error);
      }
    };
    fetchData();
  }, []);

    // console.log(products);

    // here we create an async function to post the items to the cart
        

    return (
        <div className="mx-auto grid lg:grid-cols-4 lg:gap-y-3 lg:gap-x-1 shadow-md mb-4 lg:px-12 lg:py-20">
            {
                products.map((product:Product) => (
                    <ProductComponent
                        key={product.id}
                        product={product}
                    />
                ))
            }
        </div>
      );
}

export default Products