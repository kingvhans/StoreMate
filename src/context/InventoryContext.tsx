/*
File explanation: 
This file contains the context for managing and sharing 
the inventory data between components in our application using the data 
*/
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "../../config/firebase";

interface InventoryItem {
  id: string;
  name: string;
  price: number;
  expiryDate: string;
  numberOfItems: number;
}

interface InventoryContextData {
  isLoading: boolean;
  inventory: InventoryItem[];
}

const InventoryContext = createContext<InventoryContextData | undefined>(
  undefined
);

export const useInventoryData = (): InventoryContextData => {
  const userId = auth.currentUser?.uid;
  const inventoryCollectionRef = collection(db, "Inventory");
  const [isLoading, setIsLoading] = useState(true);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);


  useEffect(() => {
    const queryDB = query(inventoryCollectionRef, where('userId', '==', userId));
    const unsubscribe = onSnapshot(queryDB, (snapshot) => {
      try {
        const inventoryArray = snapshot.docs.map((doc) => doc.data() as InventoryItem);
        setInventory(inventoryArray);
        console.log(inventoryArray);
        
      } catch (error) {
        console.error('Error occurred while processing snapshot:', error);
        // Handle the error appropriately (e.g., show an error message)
      } finally {
        setIsLoading(false);
      }
    });
    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [userId]);

  return { isLoading, inventory };
};

export const useInventoryContext = (): InventoryContextData => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error(
      "useInventoryContext must be used within an InventoryContextProvider"
    );
  }
  return context;
};

//interface for Props
interface Props {
  children?: ReactNode;
}

export const InventoryContextProvider = ({ children }: Props) => {
  const inventoryData = useInventoryData();

  return (
    <InventoryContext.Provider value={inventoryData}>
      {children}
    </InventoryContext.Provider>
  );
};
