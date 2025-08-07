import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ForgotPass from '../screens/Auth/ForgotPass/ForgotPass';
import Login from '../screens/Auth/Login/Login';
import MyWebComponent from '../screens/Auth/MyWebComponent/MyWebComponent';
import SetPass from '../screens/Auth/SetPass/SetPass';
import VerifyOtp from '../screens/Auth/VerifyOtp.js/VerifyOtp';
import Register from '../screens/Auth/Register/Register';
import CustomerSupport from '../screens/DashboardScreen/CustomerSupport/CustomerSupport';

const Stack = createNativeStackNavigator();

export default function AuthRoutes(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false,
        gestureEnabled: false,
      }}
      initialRouteName="login">
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="forgotPass" component={ForgotPass} />
      <Stack.Screen name="setPass" component={SetPass} />
      <Stack.Screen name="verifyOtp" component={VerifyOtp} />
      <Stack.Screen name="myWebComponent" component={MyWebComponent} />
      <Stack.Screen name="customerSupport" component={CustomerSupport} />
      
    </Stack.Navigator>
  );
}
