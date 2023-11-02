/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  createContext, useContext, useState, useEffect,
} from 'react';
import { API_BASE_URL } from '../constants';

const CkbContext = createContext();

export const useCkbData = () => useContext(CkbContext);

export function CkbDataProvider({ children }) {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const childCustomerPagesUrl = `${API_BASE_URL}/childcustompages/`;
  useEffect(() => {
    // Fetch data from the API and update the state
    const fetchData = async () => {
      try {
        const response = await fetch(childCustomerPagesUrl);
        if (response.ok) {
          const result = await response.json();
          setApiData(result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <CkbContext.Provider value={{ apiData, loading }}>
      {children}
    </CkbContext.Provider>
  );
}
