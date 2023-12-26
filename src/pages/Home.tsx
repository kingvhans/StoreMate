import React from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { Grid, BarChart, XAxis, YAxis } from "react-native-svg-charts";
import { Text } from "react-native";
//import * as scale from "d3-scale";

import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useInventoryContext } from "../context/InventoryContext";
import { usePurchaseInventoryContext } from "../context/PurchaseContext";

export default function HomeScreen() {
  const { inventory, isLoading } = useInventoryContext();
  const { purchaseInventory } = usePurchaseInventoryContext();

  //algorithm to calculate and evaluate the profits
  /** The first thing is to retrieve the total cost price of a single item
   * 
   */

  const total_cost_price = inventory.map((item) => [
    item.price * item.numberOfItems,
  ]);
  const total_selling_price = purchaseInventory.map((item) => [
    item.price * item.numberOfItems,
  ]);

  const item_name = inventory.map((item) => item.name);
  const flattened_TCP = total_cost_price.flat();

  const barData = flattened_TCP.map((value, index) => ({
    value,
    label: item_name[index],
  }));

  console.log(barData);
  return (
    <KeyboardAwareScrollView>
      <Spinner
        visible={isLoading}
        textContent={"Checking Inventory..."}
        textStyle={{ color: "#FFF" }}
      />
      <Text className=" text-center text-main text-lg mt-2">
          Item against Cost Price of Stock
        </Text>
      <View style={{  flexDirection: "row" , alignSelf: "flex-start", height: 300,   paddingVertical: 16, padding: 10 }}>
        <YAxis
          data={flattened_TCP}
          contentInset={{ top: 20, bottom: 20 }}
          svg={{
            fill: "grey",
            fontSize: 6.5,
          }}
          numberOfTicks={10}
          formatLabel={(value) => `${value}`}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <BarChart
            style={{ flex: 1 }}
            data={barData}
            yAccessor={({ item }) => item.value}
            svg={{ fill: "rgb(134, 65, 244)" }}
            contentInset={{ top: 20, bottom: 20 }}
            spacingInner={0.2}
            spacingOuter={0.2}
            animate={true}
            animationDuration={500}
          >
            <Grid />
          </BarChart>
          <XAxis
            style={{ marginHorizontal: 10, height: 30 }}
            data={barData}
            formatLabel={(value, index) => item_name[index]}
            contentInset={{ left: 20, right: 20 }}
            svg={{ fontSize: 6.5, fill: "black" }}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
