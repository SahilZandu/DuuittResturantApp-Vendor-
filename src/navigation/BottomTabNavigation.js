import React, {useState} from 'react';
import {View, Platform, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {SvgXml} from 'react-native-svg';
import {bottomTabIcons} from '../commons/AppImages';
import {colors} from '../theme/colors';
import Menu from '../screens/DashboardScreen/Menu/Menu';
import Payment from '../screens/DashboardScreen/Payment/Payment';
import Orders from '../screens/DashboardScreen/Orders/Orders';
import Offers from '../screens/DashboardScreen/Offers/Offers';
import Settings from '../screens/DashboardScreen/Settings/Settings';

const Tab = createBottomTabNavigator();

export function BottomNavigator() {
  const [update, setUpdate] = useState(true);

  const handleAnimation = () => {
    setUpdate(false);
    setTimeout(() => {
      setUpdate(true);
    }, 200);
  };

  return (
    <Tab.Navigator
      initialRouteName="tab3"
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({focused}) => {
          let iconName;
          switch (route.name) {
            case 'tab1':
              iconName = focused
                ? bottomTabIcons.focusMenuIcon
                : bottomTabIcons.menuIcon;
              break;
            case 'tab2':
              iconName = focused
                ? bottomTabIcons.focusPaymentIcon
                : bottomTabIcons.paymentIcon;
              break;
            case 'tab3':
              iconName = focused
                ? bottomTabIcons.focusOrderIcon
                : bottomTabIcons.orderIcon;
              break;
            case 'tab4':
              iconName = focused
                ? bottomTabIcons.focusOffersIcon
                : bottomTabIcons.offersIcon;
              break;
            case 'tab5':
              iconName = focused
                ? bottomTabIcons.focusSettingsIcon
                : bottomTabIcons.settingsIcon;
              break;
            default:
              iconName = focused
                ? bottomTabIcons.focusMenuIcon
                : bottomTabIcons.menuIcon;
          }
          return (
            <View style={styles.iconContainer}>
              <SvgXml width={23} height={23} xml={iconName} />
            </View>
          );
        },
        tabBarLabel: ({focused, color}) => {
          let label;
          switch (route.name) {
            case 'tab1':
              label = 'Menu';
              break;
            case 'tab2':
              label = 'Payment';
              break;
            case 'tab3':
              label = 'Orders';
              break;
            case 'tab4':
              label = 'Offers';
              break;
            case 'tab5':
              label = 'Settings';
              break;
            default:
              label = 'Home';
          }

          return (
            <View
              style={{
                marginTop: hp('0.5%'),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: focused ? colors.main : colors.colorAF,
                  fontSize: RFValue(11),
                  fontWeight: focused ? '600' : '500',
                  textTransform: 'uppercase',
                }}>
                {label}
              </Text>
            </View>
          );
        },

        tabBarActiveTintColor: colors.main,
        tabBarInactiveTintColor: colors.colorAF,
        tabBarShowLabel: true,
        keyboardHidesTabBar: true,
        headerShown: false,
        tabBarLabelPosition: 'below-icon',
        // tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarStyle: styles.tabBarStyle,
      })}>
      <Tab.Screen
        name="tab1"
        component={Menu}
        // options={{tabBarLabel: 'Home'}}
        listeners={{tabPress: handleAnimation}}
      />
      <Tab.Screen
        name="tab2"
        component={Payment}
        // options={{tabBarLabel: 'Promo'}}
        listeners={{tabPress: handleAnimation}}
      />
      <Tab.Screen
        name="tab3"
        component={Orders}
        // options={{tabBarLabel: 'Orders'}}
        listeners={{tabPress: handleAnimation}}
      />
      <Tab.Screen
        name="tab4"
        component={Offers}
        // options={{tabBarLabel: 'Profile'}}
        listeners={{tabPress: handleAnimation}}
      />
      <Tab.Screen
        name="tab5"
        component={Settings}
        // options={{tabBarLabel: 'Profile'}}
        listeners={{tabPress: handleAnimation}}
      />
    </Tab.Navigator>
  );
}

const styles = {
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginTop: hp('1%'),
  },
  //   tabBarLabelStyle:{
  //     fontSize: RFValue(11),
  //     fontFamily: fonts.bold,
  //     letterSpacing: 0.80,
  //     textTransform: 'capitalize',
  //     bottom: '17%',
  //   },
  tabBarStyle: {
    position: 'absolute',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingVertical: '2%',
    height: hp('7.5%'),
    backgroundColor: colors.bottomTabBackground, // Make the background transparent
    borderTopWidth: 0,
    paddingBottom: 0,
    shadowColor:
      Platform.OS === 'android' ? colors.black : 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 10,
  },
};
