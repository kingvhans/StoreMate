import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AllTab from "../components/screen_components/AllTab";
import NearExpiryTab from "../components/screen_components/NearExpiryTab";
import AddProductTab from "../components/screen_components/AddProductTab";

const Tab = createMaterialTopTabNavigator();

export default function Inventory() {
  return (
      <Tab.Navigator initialRouteName="AddProductTab" screenOptions={{
         tabBarLabelStyle: {
          color: "#ffffff",
          fontFamily: 'Poppins-Regular',
         },
         tabBarStyle: {
          backgroundColor: "#48086E"
         }
      }}>
          <Tab.Screen name="AddProductTab" component={AddProductTab} options={{tabBarLabel: "Add"}}/>
          <Tab.Screen name="AllTab" component={AllTab} options={{tabBarLabel: "All"}}  />
          <Tab.Screen name="NearExpiryTab" component={NearExpiryTab} options={{tabBarLabel: "Near Expiry"}}/>
          
      </Tab.Navigator>
  );
}
