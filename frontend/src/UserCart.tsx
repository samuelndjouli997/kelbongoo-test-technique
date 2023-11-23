import Layout from './Layout';
import { FaShoppingCart } from 'react-icons/fa';
import Button from './components/Button';
import { useCart, actionTypes } from './context/CartProvider';
import { calculatePriceTTC, calculateTotalTTC } from './utils/calculations';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CartItem, ProductItem } from './types/types';

const UserCart = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { state, dispatch }:any = useCart();
    const navigate = useNavigate();

    const handleCheckout = async () => {
        try {
            // Dispatch l'action CHECKOUT
            dispatch({ type: actionTypes.CHECKOUT });
    
            // Here we post the products to the cart in the backend
            await updateStockTotal(state.checked_out_products);

            // We redirect the user to the home page
            navigate('/');

            // We clear the cart
            dispatch({ type: actionTypes.CLEAR_CART });
            
            console.log('Commande passée avec succès!');
        } catch (error) {
            console.error('Erreur lors de la mise à jour du stock:', error);
        }
    };

    const updateStockTotal = async (products: ProductItem[]) => {
        try {
            await axios.post('http://127.0.0.1:8000/cart/checkout/', {
                products: products.map(item => ({
                    product_id: item.product.id,
                    quantity: item.quantity,
                })),
            });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du stock:', error);
        }
    };


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
                <th className="py-2 px-4 border-b text-left">Quantité</th>
                <th className="py-2 px-4 border-b text-left">Produit</th>
                <th className="py-2 px-4 border-b text-left">Prix</th>
              </tr>
            </thead>
            <tbody>
              {state.cart.map((cartItem: CartItem, index: number) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{cartItem?.quantity}</td>
                  <td className="py-2 px-4 border-b">{cartItem.product?.name}</td>
                  <td className="py-2 px-4 border-b">{calculatePriceTTC(cartItem.product.price_excluding_tax, cartItem.product.tva, cartItem.quantity)}€</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="flex justify-end items-center my-4 space-x-3 text-primary-dark-green font-semibold text-2xl">
          <p>Total:</p>
          <p>{calculateTotalTTC(state.cart)} €</p>
        </div>

        <div className="text-center my-4">
          <Button onClick={handleCheckout}>
            Commander
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default UserCart;
