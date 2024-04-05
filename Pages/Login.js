import { Text, TouchableOpacity, View } from "react-native";

export default function Login({navigation}){
        return(
                <View>
                        <Text>안녕하세요 로그인 페이지입니다.</Text>
                        <TouchableOpacity onPress={()=>navigation.navigate("Phrase")}>
                                <Text>여길 누르면 Phrase로 이동</Text>
                        </TouchableOpacity>
                </View>
        )
}