import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RouteComponent } from "./src/routes/RouteComponent";
import { StartupScreen } from "./src/screens/StartupScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Initial"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Initial" component={StartupScreen} />
        <Stack.Screen name="Routes" component={RouteComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
