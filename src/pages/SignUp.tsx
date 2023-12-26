import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

function SignUp({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [validationMessage, setValidationMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  let validateAndSet = (
    value: string,
    valueToCompare: string,
    setValue: string | any
  ) => {
    value !== valueToCompare
      ? setValidationMessage("Passwords Do not Match")
      : setValidationMessage("");
    setValue(value);
  };

  async function createAccount() {
    email === "" || password === ""
      ? setValidationMessage("required field missing")
      : "";

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setValidationMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="bg-main">
      <View className=" bg-main h-1/4 ">
        <View className="p-7 my-auto mb-4">
          <Text
            className="text-white text-3xl mb-2"
            style={{ fontFamily: "Poppins-Regular" }}
          >
            Create An
          </Text>
          <Text
            className="text-white text-3xl "
            style={{ fontFamily: "Poppins-Regular" }}
          >
            Account
          </Text>
        </View>
      </View>
      <View className=" bg-secondary h-3/4 rounded-t-[30] ">
        <View className="flex flex-row items-center justify-center gap-32 p-3 ">
          <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
            <Text className="text-main text-lg font-bold">Login</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-col items-center p-2">
            <Text className="text-main text-lg font-bold">SignUp</Text>
            <View className=" w-full bg-main h-[2]"></View>
          </TouchableOpacity>
        </View>

        <KeyboardAwareScrollView>
          <View className="flex flex-col justify-center p-4 gap-4 mb-2 ">
            <Text className="text-main text-lg ml-5 font-semibold">
              Enter Email
            </Text>
            <TextInput
              className="bg-white rounded-full border-2 border-main p-1 text-center"
              keyboardType={"email-address"}
              onChangeText={(text) => setEmail(text)}
            />

            <Text className="text-main text-lg ml-5 font-semibold">
              Create Password
            </Text>
            <TextInput
              secureTextEntry={true}
              className="bg-white rounded-full border-2 border-main p-1 text-center"
              onChangeText={(value) =>
                validateAndSet(value, confirmPassword, setPassword)
              }
            />

            <Text className="text-main text-lg ml-5 font-semibold">
              Confirm Password
            </Text>
            <TextInput
              secureTextEntry={true}
              className="bg-white rounded-full border-2 border-main p-1 text-center"
              onChangeText={(value) =>
                validateAndSet(value, password, setConfirmPassword)
              }
            />
          </View>
          <View className="flex flex-col justify-center items-center p-2 gap-3 mt-1">
            <Text className="text-black text-sm mt-2">{validationMessage}</Text>
            {loading ? (
              <ActivityIndicator size={"large"} />
            ) : (
              <TouchableOpacity
                onPress={createAccount}
                className="bg-main px-20 py-2 rounded-full"
              >
                <Text className="text-center text-white text-xl font-semibold">
                  Sign Up
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <Text className="text-main text-xs text-center">
            Terms and Conditions
          </Text>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}

export default SignUp;
