import { useInventoryContext } from "../context/InventoryContext";
import { usePurchaseInventoryContext } from "../context/PurchaseContext";
//import useSelectedItem from "../hooks/useSelectedItem";

function calcProfitData() {
    const { inventory } = useInventoryContext();
    const { purchaseInventory } = usePurchaseInventoryContext();
    
}