import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pro-api.coinmarketcap.com/v1',
  headers: {
    'X-CMC_PRO_API_KEY': '8dcd8356-b372-4c92-8727-ebd3c8ae26e5',
    'Access-Control-Allow-Origin': '*',
  },
});

export default api;
