import React from 'react';
import Layout from './Layout';
import { FaShoppingCart } from 'react-icons/fa';
import Button from './components/Button';
import { useCart } from './context/CartProvider';
import { calculatePriceTTC, calculateTotalTTC } from './utils/calculations';

const UserCart = () => {
  const { state } = useCart();

  return (
    <Layout>
      <section className="container mx-auto px-4 py-10 lg:px-12 lg:pt-16 lg:pb-20">
        <div className="flex justify-center mb-10 items-center space-x-3 text-primary-dark-green font-semibold text-2xl">
          <FaShoppingCart />
          <h2>Mon panier</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Quantité</th>
                <th className="py-2 px-4 border-b">Produit</th>
                <th className="py-2 px-4 border-b">Prix</th>
              </tr>
            </thead>
            <tbody>
              {state.cart.map((cartItem, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{cartItem?.quantity}</td>
                  <td className="py-2 px-4 border-b">{cartItem.product?.name}</td>
                  <td className="py-2 px-4 border-b">{calculatePriceTTC(cartItem.product.price_excluding_tax, cartItem.product.tva)}€</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="flex justify-end items-center my-4 space-x-3 text-primary-dark-green font-semibold text-2xl">
          <h2>Total:</h2>
          <h2>{calculateTotalTTC(state.cart)} €</h2>
        </div>

        <div className="text-center my-4">
          <Button>
            Commander
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default UserCart;
