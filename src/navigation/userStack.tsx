import React from "react";
import HomeScreen from "../pages/Home";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Inventory from "../pages/Inventory";
import Transactions from "../pages/Transactions";
import CustomAntIcon from "../components/icons/AntIcon";
import CustomFontAwesomeIcon from "../components/icons/FontAwesome";
import CustomIonIcon from "../components/icons/IonIcon";
import { InventoryContextProvider } from "../context/InventoryContext";
import { PurchaseInventoryContextProvider } from "../context/PurchaseContext";
import { ProfileButton } from "../components/screen_components/ProfileButton";
import Profile from "../pages/Profile";

const Drawer = createDrawerNavigator();


export default function UserStack() {


  return (
    <PurchaseInventoryContextProvider>
      <InventoryContextProvider>
        <Drawer.Navigator
          initialRouteName="Home"     
          screenOptions={{
            headerRight() {
              return (
                <ProfileButton />
              );
            },
          }}
        >
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <CustomIonIcon
                  name="md-home"
                  size={size}
                  color={(color = "#48086E")}
                />
              ),
              headerTintColor: "#ffffff",
              headerStyle: { backgroundColor: "#48086E" },
              drawerLabelStyle: { color: "#48086E" },
            }}
          />
          <Drawer.Screen
            name="Inventory"
            component={Inventory}
            options={{
              drawerIcon: ({ color, size }) => (
                <CustomAntIcon
                  name="bars"
                  size={size}
                  color={(color = "#48086E")}
                />
              ),
              headerTintColor: "#ffffff",
              headerStyle: { backgroundColor: "#48086E" },
              drawerLabelStyle: { color: "#48086E" },
            }}
          />
          <Drawer.Screen
            name="Transactions"
            component={Transactions}
            options={{
              drawerIcon: ({ color, size }) => (
                <CustomFontAwesomeIcon
                  name="file-invoice-dollar"
                  size={size}
                  color={(color = "#48086E")}
                />
              ),
              headerTintColor: "#ffffff",
              headerStyle: { backgroundColor: "#48086E" },
              drawerLabelStyle: { color: "#48086E" },
            }}
          />
          <Drawer.Screen
            name="Profile"
            component={Profile}
            options={{
              drawerIcon: ({ color, size }) => (
                <CustomIonIcon
                  name="person-circle-outline"
                  size={size}
                  color={(color = "#48086E")}
                />
              ),
              headerTintColor: "#ffffff",
              headerStyle: { backgroundColor: "#48086E" },
              drawerLabelStyle: { color: "#48086E" },
            }}
          />
        </Drawer.Navigator>
      </InventoryContextProvider>
    </PurchaseInventoryContextProvider>
  );
}
