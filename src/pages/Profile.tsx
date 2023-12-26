import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Toast from "react-native-root-toast";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth/react-native";
import CustomIonIcon from "../components/icons/IonIcon";

export default function Profile() {
  const logOut = () => {
    try {
      signOut(auth);
      Toast.show("Successfully logged out", {
        duration: Toast.durations.LONG,
      });
    } catch (err) {
      console.log(err);
      Toast.show("Error signing out", {
        duration: Toast.durations.LONG,
      });
    }
  };

  return (
    <View className="flex items-center justify-center mb-4 gap-2 h-screen bg-secondary">
      <Text>Hey there</Text>
      <Text>{auth.currentUser?.email}</Text>
      <CustomIonIcon name="person-circle-outline" size={64} color="#552619" />
      <TouchableOpacity
        className="bg-main mt-2 px-20 py-2 rounded-full"
        onPress={logOut}
      >
        <Text className="text-center text-white text-xl font-semibold">
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
