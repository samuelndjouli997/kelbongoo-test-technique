import { useEffect, useState } from 'react';
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
        console.error('Error getting products:', error);
      }
    };
    fetchData();
  }, []);

    return (
      <div className="lg:px-12 lg:py-16 shadow-md">
        <h2 className="text-primary-green text-3xl text-center font-semibold mb-8">Produits du moment 🥦</h2>
        <div className="mx-auto grid lg:grid-cols-4 lg:gap-y-3 lg:gap-x-1 mb-4">
            {
              products.map((product:Product) => (
                  <ProductComponent
                      key={product.id}
                      product={product}
                  />
              ))
            }
        </div>
      </div>
        
      );
}

export default Products