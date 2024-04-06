import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Phrase from '../pages/Phrase';
import Login from '../pages/Login';
import Music from '../pages/Music';
import Calender from '../pages/Calender';
import ChatRoom from '../pages/ChatRoom';
import FaceRecognition from '../pages/FaceRecognition';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Phrase" component={Phrase} />
        <Stack.Screen name="FaceRecognition" component={FaceRecognition} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Calender" component={Calender} />
      <Tab.Screen name="Music" component={Music} />
      <Tab.Screen name="ChatRoom" component={ChatRoom} />
    </Tab.Navigator>
  );
}
