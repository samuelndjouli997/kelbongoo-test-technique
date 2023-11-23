import { CartItem } from "../types/types";

// Function to calculate the total price (TTC) including the tax 
export const calculatePriceTTC = (priceHT: number, tva: number, quantity: number) => {
    const priceTTC = priceHT * (1 + tva / 100);
  
    // Here we multiply by quantity
    const totalTTC = priceTTC * quantity;
  
    // Here we round the total to 2 decimal places using toFixed
    return Number(totalTTC.toFixed(2));
  };

// Function to calculate the total TTC for an cart
export const calculateTotalTTC = (cartItems: CartItem[]):number => {
    const total = cartItems.reduce((accumulator, cartItem) => {
        // Here we use the calculatePriceTTC function 
        const itemPriceTTC = calculatePriceTTC(cartItem.product.price_excluding_tax, cartItem.product.tva, cartItem.quantity);
        
        // We add the item's total to the overall total
        return accumulator + itemPriceTTC;
    }, 0);

    // Here we round the total to 2 decimal places using toFixed
    return Number(total.toFixed(2));
};
  