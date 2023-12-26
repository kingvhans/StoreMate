import React from "react";
import { View, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Table, Row, Rows } from "react-native-reanimated-table";
import { useInventoryContext } from "../../context/InventoryContext";

export default function AllTab() {
  const tableHead = ["Product", "Price"];

  const inventoryContext = useInventoryContext();
  const { inventory } = inventoryContext;
  const tableData = inventory.map((item) => [item.name, item.price.toString()]);

  return (
    <KeyboardAwareScrollView>
      <View className="flex h-screen p-4 pt-8 bg-secondary">
        <Table borderStyle={styles.table}>
          <Row data={tableHead} textStyle={styles.text} style={styles.head} />
          <Rows data={tableData} textStyle={styles.text} />
        </Table>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  head: {
    height: 40,
    backgroundColor: "#f1f8ff",
    fontFamily: "Poppins-Regular",
  },
  text: { margin: 6, fontFamily: "Poppins-Regular" },
  table: { borderWidth: 1, borderColor: "#000" },
});
