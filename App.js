import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Phrase from './pages/Phrase';
import { NavigationContainer } from '@react-navigation/native';
import Login from './pages/Login';
import Home from './pages/Home';

const Stack = createNativeStackNavigator();
export default function App() {
  const [text, setText] = useState();
  const Hello = async () => {
    // axios.post(url, body, config)
    console.log('hello start?');
    axios
      .post(
        'http://172.20.10.3:8080/http/post',
        {
          //이거 object째로 body
          id: 5,
          username: 'jjun',
          password: '1234',
          email: 'jjun@gmail.com',
        },
        {
          //여기부터 config
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        //성공 시
        console.log('Success:', response.data);
        setText(response.data);
      })
      .catch((error) => {
        //실패 시
        console.log('Error:', error);
      });
  };
  useEffect(() => {
    Hello();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Phrase" component={Phrase} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
