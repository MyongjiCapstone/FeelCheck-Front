import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Phrase from '../pages/Phrase';
import Login from '../pages/Login';
import Music from '../pages/(main)/Music';
import Calender from '../pages/(main)/Calender';
import ChatRoom from '../pages/(main)/ChatRoom';
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
    <Tab.Navigator screenOptions={{headerShown: false, tabBarStyle:{height:58, paddingTop:5, paddingBottom:5}}}>
      <Tab.Screen name="Calender" component={Calender} options={{tabBarLabel:"홈", tabBarIcon:({focused})=><Octicons name="home" size={24} color={focused ? "#6666FF":"gray"}/>, tabBarActiveTintColor:'#6666FF', tabBarInactiveTintColor:"gray"}}/>
      <Tab.Screen name="Music" component={Music} options={{tabBarLabel:"음악 추천", tabBarIcon:({focused})=><FontAwesome name="music" size={24} color={focused ? "#6666FF":"gray"}/>, tabBarActiveTintColor:'#6666FF'}}/>
      <Tab.Screen name="ChatRoom" component={ChatRoom} options={{tabBarLabel:"채팅방", tabBarIcon:({focused})=><FontAwesome name="comments-o" size={24} color={focused ? "#6666FF":"gray"}/>, tabBarActiveTintColor:'#6666FF'}}/>
    </Tab.Navigator>
  );
}