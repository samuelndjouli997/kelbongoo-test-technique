import axios from 'axios';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL || 'http://127.0.0.1:8000/api';

export const getProducts = async () => {
  try {
    const response = await axios.get(`${apiUrl}/products/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
