// Function to calculate the total price including VAT (TTC)
export const calculatePriceTTC = (priceHT: number, tva: number) => {
    const priceTTC = priceHT * (1 + tva / 100);
        // We use toFixed() to round the price to 2 decimal places
        return Number(priceTTC.toFixed(2));
  };

// Function to calculate the total TTC for an array of cart items
export const calculateTotalTTC = (cartItems) => {
    const total = cartItems.reduce((accumulator, cartItem) => {
      // Calculate the item's TTC price based on quantity
      const itemPriceTTC = calculatePriceTTC(cartItem.product.price_excluding_tax, cartItem.product.tva);
      const itemTotal = itemPriceTTC * cartItem.quantity;
  
      // Add the item's total to the overall total
      return accumulator + itemTotal;
    }, 0);
  
    // Round the total to 2 decimal places using toFixed
    return Number(total.toFixed(2));
  };