import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewOrder from '../screens/DashboardScreen/Orders/NewOrder';
import OrderDetails from '../screens/DashboardScreen/Orders/OrderDetails/OrderDetails';
import {BottomNavigator} from './BottomTabNavigation';
import AddCategory from '../screens/DashboardScreen/Menu/AddCategory.js/AddCategory';
import AddItems from '../screens/DashboardScreen/Menu/AddItems/AddItems';
import AddProduct from '../screens/DashboardScreen/Menu/AddProduct/AddProduct';
import Feedback from '../screens/DashboardScreen/Feedback/Feedback';
import Help from '../screens/DashboardScreen/Help/Help';
import OrderHistory from '../screens/DashboardScreen/OrderHistory/OrderHistory';
import UpdatePassword from '../screens/DashboardScreen/UpdatePassword/UpdatePassword';
import ManageProfile from '../screens/DashboardScreen/ManageProfile/ManageProfile';
import CustomerSupport from '../screens/DashboardScreen/CustomerSupport/CustomerSupport';
import Notification from '../screens/DashboardScreen/NotificationSettings/Notification';
import TeamMembers from '../screens/DashboardScreen/TeamManagement/TeamMembers/TeamMembers';
import AddEditTeamMembers from '../screens/DashboardScreen/TeamManagement/AddEditTeamMembers/AddEditTeamMember';
import KycDocuments from '../screens/DashboardScreen/KYCScreen/KycDocuments/KycDocuments';
import BankDetails from '../screens/DashboardScreen/KYCScreen/BankDetails/BankDetails';
import FssaiDetails from '../screens/DashboardScreen/KYCScreen/FssaiDetails/FssaiDetails';
import GstDetails from '../screens/DashboardScreen/KYCScreen/GstDetails/GstDetails';
import PanCardDetails from '../screens/DashboardScreen/KYCScreen/PanCardDetails/PanCard';
import RequestHistory from '../screens/DashboardScreen/RequestHistory/RequestHistory';
import Profile from '../screens/DashboardScreen/Profile/Profile';
import RestaurantTime from '../screens/DashboardScreen/TimeManageMent/RestaurantTime';
import Reports from '../screens/DashboardScreen/Reports/Reports';
import AddMemuRequest from '../screens/DashboardScreen/AddMenuRequest/AddMenuRequest';
import AddVariantPrice from '../screens/DashboardScreen/Menu/AddVariantPrice/AddVariantPrice';
import OrderHistoryDetails from '../screens/DashboardScreen/OrderHistoryDetails/OrderHistoryDetails';
import About from '../screens/DashboardScreen/About/About';
import MyWebComponent from '../screens/Auth/MyWebComponent/MyWebComponent';
import RateFare from '../screens/DashboardScreen/RateFare/RateFare';

const Stack = createNativeStackNavigator();

export default function DashboardRoutes(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false,
        gestureEnabled: false,
      }}
      initialRouteName="home">
      <Stack.Screen name="home" component={BottomNavigator} />
      <Stack.Screen name="newOrder" component={NewOrder} />
      <Stack.Screen name="orderDetails" component={OrderDetails} />
      <Stack.Screen name="addCategory" component={AddCategory} />
      <Stack.Screen name="addItems" component={AddItems} />
      <Stack.Screen name="addProduct" component={AddProduct} />
      <Stack.Screen name="addVariantPrice" component={AddVariantPrice} />
      <Stack.Screen name="feedback" component={Feedback} />
      <Stack.Screen name="help" component={Help} />
      <Stack.Screen name="orderHistory" component={OrderHistory} />
      <Stack.Screen name="orderHistoryDetails" component={OrderHistoryDetails} />
      <Stack.Screen name="updatePassword" component={UpdatePassword} />
      <Stack.Screen name="manageProfile" component={ManageProfile} />
      <Stack.Screen name="customerSupport" component={CustomerSupport} />
      <Stack.Screen name="notification" component={Notification} />
      <Stack.Screen name="teamMembers" component={TeamMembers} />
      <Stack.Screen name="addEditTeamMembers" component={AddEditTeamMembers} />
      <Stack.Screen name="kycDocuments" component={KycDocuments} />
      <Stack.Screen name="bankDetails" component={BankDetails} />
      <Stack.Screen name="fssaiDetails" component={FssaiDetails} />
      <Stack.Screen name="gstDetails" component={GstDetails} />
      <Stack.Screen name="panCardDetails" component={PanCardDetails} />
      <Stack.Screen name="requestHistory" component={RequestHistory} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="restaurantTime" component={RestaurantTime} />
      <Stack.Screen name="reports" component={Reports} />
      <Stack.Screen name="addMemuRequest" component={AddMemuRequest} />
      <Stack.Screen name="about" component={About} />
      <Stack.Screen name="myWebComponent" component={MyWebComponent} />
      <Stack.Screen name="rateFare" component={RateFare} />
        
      
    </Stack.Navigator>
  );
}
