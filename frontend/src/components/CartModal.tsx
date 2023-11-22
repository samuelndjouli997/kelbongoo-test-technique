import React from 'react'
import { IoMdClose } from "react-icons/io";
import Button from './Button';
import { Link } from 'react-router-dom';

interface CartModalProps {
    onClose: () => void;
    cartModalOpen: boolean;
}

const CartModal = ({ onClose, cartModalOpen }: CartModalProps) => {
    
    return (
        <>
        {
            cartModalOpen && ( <div className="absolute top-14 right-4 flex items-center justify-center">
                                <div className="bg-white p-4 w-96 rounded-lg z-20">
                                    <div className="flex justify-end items-center mb-4">
                                        <button className="text-gray-500" onClick={onClose}>
                                            <IoMdClose />
                                        </button>
                                    </div>
                        
                                    <ul className="divide-y divide-gray-600">
                                            <li className="py-2">
                                            <div className="flex items-center space-x-4">
                                                <img
                                                src=""
                                                alt="test"
                                                className="w-14 h-auto object-cover rounded"
                                                />
                                                <div>
                                                <p className="text-sm text-black font-semibold">
                                                    Test
                                                </p>
                                                <p className="text-gray-500 text-xs">
                                                    Prix: 0€
                                                </p>
                                                <p className="text-gray-500 text-xs">
                                                    Quantité: 0
                                                </p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                        
                                    <div className="mt-4 flex justify-between items-center">
                                        <span className="text-sm font-semibold text-gray-500">Total:</span>
                                        <span className="text-lg font-bold"></span>
                                    </div>
                        
                                    <Button
                                        onClick={onClose}
                                    >
                                        <Link to="/cart">Voir le panier</Link>
                                    </Button>
                                </div>
                            </div> 
                        )

        }
        </>
      
    )
  };

export default CartModal