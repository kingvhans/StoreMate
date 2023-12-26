
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";

const Stack = createStackNavigator();

export default function AuthStack(){
    return (
        
            <Stack.Navigator initialRouteName="LogIn" >
                <Stack.Screen name="LogIn" options={{headerShown: false} } component={Login}/>
                <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
            </Stack.Navigator>
        
    );
}