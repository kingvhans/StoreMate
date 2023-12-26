import React from "react";
import { View, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Table, Row, Rows } from "react-native-reanimated-table";
import { usePurchaseInventoryContext } from "../../context/PurchaseContext";

export default function HistoryTab() {
  const tableHead = ["Type", "Product", "Price"];

  const purchaseContext = usePurchaseInventoryContext();
  const { purchaseInventory } = purchaseContext;
  const tableData = purchaseInventory.map((item) => [
    item.status,
    item.productName,
    item.price.toString(),
  ]);

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
