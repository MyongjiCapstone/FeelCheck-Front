import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
export default function App() {
  const getEmotion = async() => {
    try {
      const data = new FormData();
      data.append('image', {
        name: 'images.jpg',
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdUVuCofaItV6dEUvswR327129QFC8PxAV45Ef5VuDcQ&s',
        type: 'image/jpg'
      });
      axios.post("https://api-inference.huggingface.co/models/dima806/face_emotions_image_detection", data, {
        headers: {
          "Content-Type": 'multipart/form-data', Authorization : 'Bearer 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'
        }
      }).then(res => {
        const result = res.data;
        return result;
      }).catch(err=>{
        console.log(err, '여기');
      })
    } catch (error) {
       console.error(error);
    }
  }
  useEffect(() => {
    getEmotion()
      .then((response) => {
        console.log(response);
        // console.log(JSON.stringify(response));
      });
  }, [])

  return (
    <View style={styles.container}>
      <Image source={require('./assets/smile.jpg')}/>
      <Text>반가워</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
