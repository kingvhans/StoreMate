/* 
This file holds the root navigation of everything and would include the auth switch
*/

import AuthStack from "./authStack";
import { useAuthentication } from "../hooks/useAuthentication";
import UserStack from "./userStack";
import { NavigationContainer } from "@react-navigation/native";


export default function RootNavigation(){

    const { user } = useAuthentication();
    return (
        <NavigationContainer>
            {user ? <UserStack/> : <AuthStack /> }
        </NavigationContainer>
    )
    //i'll call between authstack and the other stack
}