import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, View, TouchableOpacity, Image } from "react-native";
import Toast from "react-native-root-toast";
import { TextInput } from "react-native-gesture-handler";
import { db, auth } from "../../../config/firebase";
import Spinner from "react-native-loading-spinner-overlay";
import { collection, addDoc } from "firebase/firestore";
import { validateExpiryDatePattern } from "../../misc/validatePattern";

export default function AddProductTab() {
  const userId = auth.currentUser?.uid;
  const [productName, setproductName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [numberOfItems, setNumberOfItems] = useState<number>(0);
  const [validateExpiryDate, setValidateExpiryDate] = useState<string>("")
  const inventoryCollectionRef = collection(db, "Inventory");



  const addToInventory = async () => {
    
    if (!validateExpiryDatePattern(expiryDate)){
        setValidateExpiryDate("Expiry Date should be in yyyy-mm format");
        return;
    }

    if ( price <= 0 || numberOfItems <= 0){
      setValidateExpiryDate("Values cannot be 0 or less than zero")
      return;
    }

    if ( productName === " "){
      setValidateExpiryDate("Required field missing")
      return;
    }
    
    setLoading(true);
    try {
      await addDoc(inventoryCollectionRef, {
        expiryDate: expiryDate,
        name: productName,
        price: price,
        numberOfItems: numberOfItems,
        userId: userId,
      });
      setproductName("");
      setExpiryDate("");
      setPrice(0);
      setNumberOfItems(0);
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
    }
  };

  return (
    <KeyboardAwareScrollView>
      <Spinner
        visible={loading}
        textContent={"Adding item to inventory..."}
        textStyle={{ color: "#FFF" }}
      />
      <View className="flex h-screen bg-secondary">
        <View className="flex items-center">
          <Image
            source={require("../../../assets/Barcode-Reader.png")}
            style={{ width: 200, height: 200 }}
          />
        </View>
        <View className="flex flex-col  justify-center p-5 gap-5 mb-2">
          <Text className="text-lg text-center text-main">
            Add Product to Inventory
          </Text>
          <View className=" flex items-center border-main border-2 mb-2" />
          <TextInput
            placeholder="Product Name"
            className="bg-white rounded-full border-2 border-main p-1 text-center"
            onChangeText={(val) => setproductName(val)}
          />
          <TextInput
            keyboardType="numeric"
            placeholder="Price"
            className="bg-white rounded-full border-2 border-main p-1 text-center"
            onChangeText={(text: string) => {
              const parsedNumber = Number(text);
              if (isNaN(parsedNumber)) {
                return;
              }

              setPrice(parsedNumber);
            }}
          />
          <TextInput
            keyboardType="number-pad"
            placeholder="Number of Items being bought"
            className="bg-white rounded-full border-2 border-main p-1 text-center"
            onChangeText={(text: string) => {
              const parsedNumber = Number(text);
              if (isNaN(parsedNumber)) {
                return;
              }

              setNumberOfItems(parsedNumber);
            }}
          />
          <TextInput
            keyboardType="number-pad"
            placeholder="Expiry Date in format yyyy-mm"
            className="bg-white rounded-full border-2 border-main p-1 text-center"
            onChangeText={(val) => setExpiryDate(val)}
          />
          <Text className="mt-1 text-center text-black text-sm">{validateExpiryDate}</Text>
          
          <TouchableOpacity onPress={addToInventory}>
            <Text
              style={{ fontFamily: "Poppins-Regular" }}
              className="text-center text-main text-sm"
            >
              + Add Product
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
