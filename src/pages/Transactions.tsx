import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SellTab from "../components/screen_components/SellTab";
import BuyTab from "../components/screen_components/BuyTab";
import HistoryTab from "../components/screen_components/HistoryTab";

const Tab = createMaterialTopTabNavigator();

export default function Transactions() {
  return (
    <Tab.Navigator initialRouteName="BuyTab" screenOptions={{
      tabBarLabelStyle: {
       color: "#ffffff",
       fontFamily: "Poppins-Regular",
      },
      tabBarStyle: {
       backgroundColor: "#48086E"
      }
   }}>
       <Tab.Screen name="BuyTab" component={BuyTab} options={{tabBarLabel: "Buy"}}  />
       <Tab.Screen name="SellTab" component={SellTab} options={{tabBarLabel: "Sell"}}/>
       <Tab.Screen name="HistoryTab" component={HistoryTab} options={{tabBarLabel: "History"}}/>
   </Tab.Navigator>

  )
}
