import "react-native-gesture-handler";
import RootNavigation from "./src/navigation";
import "./config/firebase";
import { useFonts } from "expo-font";
import { RootSiblingParent } from "react-native-root-siblings";
import { NativeWindStyleSheet } from "nativewind";

export default function App() {
  NativeWindStyleSheet.setOutput({
    default: "native",
  });

  let [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <RootSiblingParent>
      <RootNavigation />
    </RootSiblingParent>
  );
}
