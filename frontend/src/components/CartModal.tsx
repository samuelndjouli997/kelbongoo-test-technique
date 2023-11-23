import { IoMdClose } from 'react-icons/io';
import Button from './Button';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartProvider';
import { calculatePriceTTC, calculateTotalTTC } from '../utils/calculations';
import { CartItem } from '../types/types';

interface CartModalProps {
  onClose: () => void;
  cartModalOpen: boolean;
}

const CartModal = ({ onClose, cartModalOpen }: CartModalProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { state }:any = useCart();

  return (
    <>
      {cartModalOpen && (
        <div className="absolute top-14 right-4 flex items-center justify-center">
          <div className="bg-white p-4 w-96 rounded-lg z-20 shadow-md">
            <div className="flex justify-end items-center mb-4">
              <button className="text-gray-500" onClick={onClose}>
                <IoMdClose />
              </button>
            </div>

            {state.cart.length === 0 ? (
              <p className="text-center text-gray-500 text-[16px] mb-6">Le panier est vide 😢.</p>
            ) : (
              <>
                <ul className="divide-y divide-gray-300">
                  {state.cart.map((cartItem: CartItem, index: number) => (
                    <li key={index} className="py-2">
                      <div className="flex items-center space-x-4">
                        <img
                          src={cartItem.product?.image}
                          alt={cartItem.product?.name}
                          className="w-14 h-auto object-cover rounded"
                        />
                        <div>
                          <p className="text-sm text-black font-semibold">
                            {cartItem.product?.name}
                          </p>
                          <p className="text-gray-500 text-xs">
                            Prix: {calculatePriceTTC(cartItem.product.price_excluding_tax, cartItem.product.tva, cartItem.quantity).toFixed(2)}€
                          </p>
                          <p className="text-gray-500 text-xs">
                            Quantité: {cartItem?.quantity}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="my-4 flex justify-between items-center text-gray-500 text-[16px]">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold">{calculateTotalTTC(state.cart)} €</span>
                </div>

                <Button onClick={onClose}>
                  <Link to="/cart">Voir le panier</Link>
                </Button>
                </>
            )}
            </div>
        </div>
        )}
    </>
    );
}

export default CartModal;
