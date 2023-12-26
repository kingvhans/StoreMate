import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SelectList } from "react-native-dropdown-select-list";
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";
import { useInventoryContext } from "../../context/InventoryContext";
import useSelectedItem from "../../hooks/useSelectedItem";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../../../config/firebase";

export default function SellTab() {
  const [customerName, setCustomerName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [numberOfItemsStock, setNumberOfItemsStock] = useState<number>(0);
  const [validationMessage, setValidationMessage] = useState<string>("");
  const [sellingPrice, setSellingPrice] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const userId = auth.currentUser?.uid;
  const inventoryContext = useInventoryContext();
  const { inventory } = inventoryContext;
  const purchaseCollectionRef = collection(db, "Purchase");
  const { expiryDate, updateSelectedItem, selected, numberOfItems } =
    useSelectedItem(inventory);
  const inventorySelectList = [...inventory.map((inventory) => inventory.name)];

  const addPurchaseInventory = async () => {
    if (
      customerName === " " ||
      phoneNumber === " " ||
      address === " " ||
      selected === " " ||
      sellingPrice === 0
    ) {
      setValidationMessage("Required field missing");
      return;
    }

    if (numberOfItemsStock <= 0) {
      setValidationMessage("Number of Items field invalid");
    }

    if ( numberOfItemsStock > numberOfItems[0] ){
      setValidationMessage("Number of Items currently in inventory is less than what you wrote");
      return;
   }

    setLoading(true);
    try {
      await addDoc(purchaseCollectionRef, {
        userId: userId,
        customerAddress: address,
        customerName,
        numberOfItems: numberOfItemsStock,
        customerNumber: phoneNumber,
        price: sellingPrice,
        productName: selected,
        purchaseDate: new Date(),
        status: "Sell",
      });
      Toast.show("Transaction completed successfully", {
        duration: Toast.durations.SHORT,
      });
    } catch (error) {
      console.log("Error completing transaction", error);
      Toast.show("Error completing transaction", {
        duration: Toast.durations.LONG,
      });
      setLoading(false);
    } finally {
      setLoading(false);
      setCustomerName("");
      setAddress("");
      setPhoneNumber("");
      setValidationMessage("");
      setSellingPrice(0);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />
      <View className="bg-secondary h-screen">
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
            placeholder="Selling Price"
            className="bg-white text-black rounded-full border-2 border-main p-1 text-center"
            onChangeText={(text: string) => {
              const parsedNumber = Number(text);
              if (isNaN(parsedNumber)) {
                return;
              }

              setSellingPrice(parsedNumber);
            }}
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
            value={expiryDate.toString()}
            editable={false}
            className="bg-white text-black rounded-full border-2 border-main p-1 text-center"
          />
          <View className="flex items-center justify-center mb-4">
            <TouchableOpacity
              className="bg-main mt-2 px-20 py-2 rounded-full"
              onPress={addPurchaseInventory}
            >
              <Text className="text-center text-white text-xl font-semibold ">
                Sell
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
