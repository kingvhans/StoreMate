import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SelectList } from "react-native-dropdown-select-list";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-root-toast";
import { useInventoryContext } from "../../context/InventoryContext";
import useSelectedItem from "../../hooks/useSelectedItem";
import { useState } from "react";
import { db, auth } from "../../../config/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function BuyTab() {
  const [customerName, setCustomerName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [validationMessage, setValidationMessage] = useState<string>("");
  const [numberOfItemsStock, setNumberOfItemsStock] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const userId = auth.currentUser?.uid;
  const inventoryContext = useInventoryContext();
  const { inventory } = inventoryContext;
  const { quantity, expiryDate, updateSelectedItem, selected, numberOfItems } =
    useSelectedItem(inventory);
  const purchaseCollectionRef = collection(db, "Purchase");
  const inventorySelectList = [...inventory.map((inventory) => inventory.name)];

  const addPurchaseInventory = async () => {
    if (
      customerName === " " ||
      phoneNumber === " " ||
      address === " " ||
      selected === " "
    ) {
      setValidationMessage("Required field missing");
      return;
    }

    if (numberOfItemsStock <= 0 ) {
      setValidationMessage("Number of Items field invalid");
      return;
    }

    if ( numberOfItemsStock > numberOfItems[0] ){
       setValidationMessage("Number of Items currently in inventory is less than what you wrote");
       return;
    }



    setLoading(true);
    try {
      await addDoc(purchaseCollectionRef, {
        userId: userId,
        customerName,
        customerAddress: address,
        customerNumber: phoneNumber,
        price: quantity[0],
        numberOfItems: numberOfItemsStock,
        productName: selected,
        purchaseDate: new Date(),
        status: "Buy",
      });
      Toast.show("Inventory item added successfully", {
        duration: Toast.durations.SHORT,
      });
    } catch (error) {
      console.log("Error adding item", error);
      Toast.show("Error adding item", {
        duration: Toast.durations.LONG,
      });
      setLoading(false);
    } finally {
      setLoading(false);
      setCustomerName("");
      setAddress("");
      setPhoneNumber("");
      setValidationMessage("");
      setNumberOfItemsStock(0);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View className="bg-secondary h-screen">
        <Spinner
          visible={loading}
          textContent={"Completing Transaction..."}
          textStyle={{ color: "#FFF" }}
        />
        <View className="flex items-center mt-3">
          <Text className="text-center  text-black text-sm">
            {validationMessage}
          </Text>
        </View>
        <View className="flex flex-col justify-center p-6 gap-6 mb-2">
          <View className=" flex items-center border-main border-2 mb-2" />
          <TextInput
            placeholder="Customer Name"
            className="bg-white rounded-full border-2 border-main p-1 text-center"
            onChangeText={(text) => setCustomerName(text)}
          />
          <TextInput
            placeholder="Phone Number"
            className="bg-white rounded-full border-2 border-main p-1 text-center"
            onChangeText={(text) => setPhoneNumber(text)}
          />
          <TextInput
            placeholder="Address"
            className="bg-white rounded-full border-2 border-main p-1 text-center"
            onChangeText={(text) => setAddress(text)}
          />
          <View className=" flex items-center border-main border-2 mb-4" />

          <View>
            <SelectList
              data={inventorySelectList}
              save="value"
              setSelected={updateSelectedItem}
            />
          </View>
          <View className="flex items-center justify-center">
            <Text style={{ fontFamily: "Poppins-Regular" }}>
              Select a product to view details
            </Text>
          </View>
          <TextInput
            placeholder="Price"
            keyboardType="numeric"
            className="bg-white rounded-full border-2 border-main text-black p-1 text-center"
            value={quantity.toString()}
            editable={false}
          />
          <TextInput
            placeholder="Number of items"
            keyboardType="numeric"
            className="bg-white rounded-full border-2 border-main text-black p-1 text-center"
            onChangeText={(text: string) => {
              const parsedNumber = Number(text);
              if (isNaN(parsedNumber)) {
                return;
              }

              setNumberOfItemsStock(parsedNumber);
            }}
          />
          <TextInput
            placeholder="Expiry Date"
            editable={false}
            value={expiryDate.toString()}
            className="bg-white rounded-full border-2 border-main text-black p-1 text-center"
          />

          <View className="flex items-center justify-center mb-4">
            <TouchableOpacity
              className="bg-main mt-2 px-20 py-2 rounded-full"
              onPress={addPurchaseInventory}
            >
              <Text className="text-center text-white text-xl font-semibold ">
                Buy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
