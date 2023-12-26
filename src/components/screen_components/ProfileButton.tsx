import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomIonIcon from "../icons/IonIcon";


export const ProfileButton = () => {
  return (
    <TouchableOpacity className="mr-3">
      <CustomIonIcon name="person-circle-outline" size={42} color="#ffff" />
    </TouchableOpacity>
  );
};
