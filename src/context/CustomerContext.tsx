import React, { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../config/firebase";

interface Customer {
  id: string;
  name: string;
  address: string;
  phone_number: string;
}

interface CustomerContextData {
    isLoading: boolean;
    customers: Customer[];
  }

const CustomerContext = createContext<CustomerContextData | undefined>(undefined);

const useCustomerData = () : CustomerContextData => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    const customerCollectionRef = collection(db, 'customer');
    const queryDB = query(customerCollectionRef, where('userId', '==', userId));
    const getCustomers = async () => {
        try {
          const customerData = await getDocs(queryDB);
          const customersArray = customerData.docs.map(
            (doc) => doc.data() as Customer
          );
          setCustomers(customersArray);
          console.log(customers);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };

      getCustomers();
  }, []);


  return { isLoading, customers };
};

export const useCustomerContext = (): CustomerContextData => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomerContext must be used within a CustomerContextProvider');
  }
  return context;
};

//interface for Props
interface Props {
    children?: ReactNode
}

export const CustomerContextProvider = ({children}: Props) => {
    const customerData = useCustomerData();
  
    return (
      <CustomerContext.Provider value={customerData}>
        {children}
      </CustomerContext.Provider>
    );
  };

