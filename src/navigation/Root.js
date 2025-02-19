import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/Auth/Splash/Splash';
import AuthRoutes from './AuthRoutes';
import DashboardRoutes from './DashbaordRoutes';

const Stack = createNativeStackNavigator();

export default function MainNavigator(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false,
        gestureEnabled: false,
      }}
      initialRouteName="splash">
       <Stack.Screen  name="splash" component={Splash} />
       <Stack.Screen name="auth" component={AuthRoutes} />
       <Stack.Screen name="dashboard" component={DashboardRoutes} />
    </Stack.Navigator>
  );
}




