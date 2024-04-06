import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, View } from "react-native";

export default function ChatRoom() {
    return (
        <LinearGradient colors={['#9CB7FF', '#DAD1FF']} end={{x:0.5, y:0.6}} style={{height:'100%'}}>
            <ScrollView></ScrollView>
        </LinearGradient>
    )
}