
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '5b938ee390c6e5ca9c4bcf86';

const useCurrencyConversion = (amount, fromCurrency, toCurrency) => {
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      const fetchConversionRate = async () => {
        try {
          const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`);
          setConvertedAmount(response.data.conversion_result);
        } catch (error) {
          console.error('Error fetching conversion rate:', error);
          setConvertedAmount(null);
        }
      };

      fetchConversionRate();
    } else {
      setConvertedAmount(null);
    }
  }, [amount, fromCurrency, toCurrency]);

  return convertedAmount;
};

export default useCurrencyConversion;