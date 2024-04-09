import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Phrase from '../screens/Phrase';
import Login from '../screens/Login';
import Music from '../screens/(main)/Music';
import Calender from '../screens/(main)/Calender';
import ChatRoom from '../screens/(main)/ChatRoom';
import FaceRecognition from '../screens/FaceRecognition';
import MusicInit from '../screens/(main)/MusicInit';
import NicknameModal from '../modal/NicknameModal';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Pages */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Phrase" component={Phrase} />
        <Stack.Screen name="FaceRecognition" component={FaceRecognition} />
        <Stack.Screen name="MainNav" component={MainTabNavigator} />
        {/* Modal */}
        <Stack.Screen name="NicknameModal" component={NicknameModal} options={{presentation:"transparentModal"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 58, paddingTop: 5, paddingBottom: 5 },
      }}
    >
      <Tab.Screen
        name="Calender"
        component={Calender}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({ focused }) => (
            <Octicons
              name="home"
              size={24}
              color={focused ? '#6666FF' : 'gray'}
            />
          ),
          tabBarActiveTintColor: '#6666FF',
          tabBarInactiveTintColor: 'gray',
        }}
      />
      <Tab.Screen
        name="MusicNav"
        component={MusicNavigator}
        options={{
          tabBarLabel: '음악 추천',
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="music"
              size={24}
              color={focused ? '#6666FF' : 'gray'}
            />
          ),
          tabBarActiveTintColor: '#6666FF',
        }}
      />
      <Tab.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{
          // unmountOnBlur:true,
          tabBarLabel: '채팅방',
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="comments-o"
              size={24}
              color={focused ? '#6666FF' : 'gray'}
            />
          ),
          tabBarActiveTintColor: '#6666FF',
        }}
      />
    </Tab.Navigator>
  );
}

function MusicNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MusicInit" component={MusicInit} />
      <Stack.Screen name="Music" component={Music} />
    </Stack.Navigator>
  );
}
