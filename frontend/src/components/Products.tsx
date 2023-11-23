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