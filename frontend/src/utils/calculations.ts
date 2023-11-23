// Function to calculate the total price including VAT (TTC)
export const calculatePriceTTC = (priceHT: number, tva: number) => {
    const priceTTC = priceHT * (1 + tva / 100);
        // We use toFixed() to round the price to 2 decimal places
        return Number(priceTTC.toFixed(2));
  };