import  { useState } from "react";

interface InventoryItem {
  id: string;
  name: string;
  price: number;
  expiryDate: string;
  numberOfItems: number;
}


const useSelectedItem = (inventory: InventoryItem[]) => {
    const [selected, setSelected] = useState<string>('');
    const [expiryDate, setExpiryDate] = useState<string[]>([]);
    const [quantity, setQuantity] = useState<number[]>([]);
    const [numberOfItems, setNumberOfItems] = useState<number[]>([]);
  
    const updateSelectedItem = (selectedItemName: string) => {
      setSelected(selectedItemName);
  
      const filteredInventory = inventory.filter(
        (item) => item.name === selectedItemName
      );
      console.log("Filtered inventory is:" + filteredInventory);
      const price_quantity = filteredInventory.map((item) => item.price);
      const expiry_dated = filteredInventory.map((item) => item.expiryDate);
      const number_of_items = filteredInventory.map((item) => item.numberOfItems);
      setExpiryDate(expiry_dated);
      setQuantity(price_quantity);
      setNumberOfItems(number_of_items)
    };
  
    return { selected, expiryDate, quantity, updateSelectedItem, numberOfItems };
  };
  
  export default useSelectedItem;