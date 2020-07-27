import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Main from "./pages/Main";
import Profile from "./pages/Profile";

const Route = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: "DevRadar"
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: "Perfil No Github"
            }
        }
    }, {
        defaultNavigationOptions: {
            headerTintColor: "#fff",
            headerStyle: {
                backgroundColor: "#7d40e7",

            }
        },
    }),
)

export default Route;