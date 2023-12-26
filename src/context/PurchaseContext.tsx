import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../config/firebase";

interface PurchaseInventoryItem {
  id: string;
  customerName: string;
  customerNumber: string;
  customerAddress: string;
  price: number;
  productName: string;
  purchaseDate: Date;
  status: string;
  numberOfItems: number;
}

interface PurchaseInventoryItemData {
  isLoading: boolean;
  purchaseInventory: PurchaseInventoryItem[];
}

const PurchaseInventoryContext = createContext<
  PurchaseInventoryItemData | undefined
>(undefined);

export const usePurchaseInventoryData = (): PurchaseInventoryItemData => {
  const userId = auth.currentUser?.uid;
  const purchaseInventoryRef = collection(db, "Purchase");
  const [isLoading, setIsLoading] = useState(true);
  const [purchaseInventory, setPurchaseInventory] = useState<
    PurchaseInventoryItem[]
  >([]);

  useEffect(() => {
    const queryDB = query(purchaseInventoryRef, where("userId", "==", userId));
    const unsubscribe = onSnapshot(queryDB, (snapshot) => {
      try {
        const inventoryArray = snapshot.docs.map(
          (doc) => doc.data() as PurchaseInventoryItem
        );
        setPurchaseInventory(inventoryArray);
        console.log(inventoryArray);
      } catch (error) {
        console.error("Error occurred while processing snapshot:", error);
        // Handle the error appropriately (e.g., show an error message)
      } finally {
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, [userId]);

  return { isLoading, purchaseInventory };
};

export const usePurchaseInventoryContext = (): PurchaseInventoryItemData => {
  const context = useContext(PurchaseInventoryContext);
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

export const PurchaseInventoryContextProvider = ({ children }: Props) => {
  const inventoryData = usePurchaseInventoryData();

  return (
    <PurchaseInventoryContext.Provider value={inventoryData}>
      {children}
    </PurchaseInventoryContext.Provider>
  );
};
