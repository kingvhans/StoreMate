import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-gesture-handler";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

function Login({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validationMessage, setValidationMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function login() {
    if (email === " " || password === "") {
      setValidationMessage("required field missing");
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      //navigation.navigate('Main');
    } catch (error: any) {
      setValidationMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="bg-main">
      <View className=" bg-main h-2/6 ">
        <View className="p-7 my-auto mb-4">
          <Text
            className="text-white text-2xl"
            style={{ fontFamily: "Poppins-Regular" }}
          >
            Welcome Back
          </Text>
        </View>
      </View>
      <View className=" bg-secondary h-4/6 rounded-t-[30] ">
        <View className="flex flex-row items-center justify-center gap-32 p-3 ">
          <TouchableOpacity className="flex flex-col items-center p-2">
            <Text className="text-main text-lg font-bold">Login</Text>
            <View className=" w-full bg-main h-[2]"></View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text className="text-main text-lg font-bold">SignUp</Text>
          </TouchableOpacity>
        </View>

        <KeyboardAwareScrollView>
          <View className="flex flex-col justify-center p-4 gap-4 mb-2 ">
            <Text className="text-main text-lg ml-5 font-semibold">
              Email
            </Text>
            <TextInput
              className="bg-white rounded-full border-2 border-main p-1 text-center"
              keyboardType={"email-address"}
              onChangeText={(text) => setEmail(text)}
            />

            <Text className="text-main text-lg ml-5 font-semibold">
              Password
            </Text>
            <TextInput
              secureTextEntry={true}
              className="bg-white rounded-full border-2 border-main p-1 text-center"
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          <View className="flex flex-col justify-center items-center p-2 gap-3 mt-1">
            <Text className="mt-3 text-black text-sm">{validationMessage}</Text>
            {loading ? (
              <ActivityIndicator size={"large"} />
            ) : (
              <>
                <TouchableOpacity
                  onPress={login}
                  className="bg-main px-20 py-2 rounded-full"
                >
                  <Text className="text-center text-white text-xl font-semibold">
                    Login
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                  <Text
                    style={{ fontFamily: "Poppins-Regular" }}
                    className="text-main text-sm"
                  >
                    Don’t have an account?
                  </Text>
                  <Text
                    style={{ fontFamily: "Poppins-Regular" }}
                    className="text-main text-sm text-center"
                  >
                    Sign up here
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}

export default Login;
