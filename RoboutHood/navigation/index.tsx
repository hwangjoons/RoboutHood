/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator, useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import SearchScreen from '../screens/SearchScreen';
import HomeScreen from '../screens/HomeScreen';
import PortfolioScreen from '../screens/PortfolioScreen';
import LoadingScreen from '../screens/LoadingScreen';
import ResultScreen from '../screens/ResultScreen';

import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import GlobalColors from '../assets/styling/GlobalColors';

// import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="Loading" component={LoadingScreen} options={{ title: 'Loading' }} />
      <Stack.Screen name="Result" component={ResultScreen} options={{ title: 'Result' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

const BottomTabArr = [
  { route: 'Search', label: 'Search', type: Icon.Ionicons, activeIcon: 'ios-search-sharp', inActiveIcon: 'ios-search-circle-sharp', component: SearchScreen },
  { route: 'Home', label: 'Home', type: Icon.Ionicons, activeIcon: 'ios-school-outline', inActiveIcon: 'ios-school-sharp', component: HomeScreen },
  { route: 'Portfolio', label: 'Portfolio', type: IconFontAwesome.FontAwesome, activeIcon: 'folder', inActiveIcon: 'folder-open', component: PortfolioScreen }
];

const BottomTab = createBottomTabNavigator<RootTabParamList>();

const TabButton = (props) => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
    >
    <View style={styles.container}>
      <Icon type={item.type} name={item.activeIcon} color={focused ? Colors.primary : Colors.primaryLite}/>
    </View>
    </TouchableOpacity>
  )
}
function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  // const tabBarHeight = useBottomTabBarHeight();

  return (
    <BottomTab.Navigator
      // initialRouteName="TabOne"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          height: 60,
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 20,
        }
      }}
      // tabBarOptions={{
      //   showLabel: false,
      // }}
      // screenOptions={{
      //   tabBarActiveTintColor: Colors[colorScheme].tint,
      //   tabBarStyle: {
      //     // showLabel: false,
      //     position: 'absolute',
      //     bottom: 25,
      //     left: 20,
      //     right: 20,
      //     elevation: 0,
      //     backgroundColor: '#ffffff',
      //     borderRadius: 15,
      //     height: 70,
      //     // borderColor: 'black'
      //   }
      // }}
      >
        {BottomTabArr.map((item, index) => {
          return(
            <BottomTab.Screen name={item.route} component={item.component}
            options={{
              // tabBarShowLabel: item.label,
              tabBarIcon: ({color, focused}) => (
                <Icon name={focused ? item.activeIcon : item.inActiveIcon} color={color}
                />
              ),
              tabBarButton: (props) => <TabButton {...props} item={item} />
            }}
          />
          )
        })}
      {/* <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Search',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Home"

        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{
          title: 'Portfolio',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      /> */}
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
