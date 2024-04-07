import { Text, TouchableOpacity, View } from "react-native";

export default function Home({navigation}){
        return(
                <View style={{marginTop:100}}>
                        <Text>안녕하세요 홈페이지입니다.</Text>
                        <TouchableOpacity onPress={()=>navigation.navigate("Phrase")}>
                                <Text>여길 누르면 Phrase로 이동</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
                                <Text>여길 누르면 로그인페이지로 이동</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>navigation.navigate("Music")}>
                                <Text>여길 누르면 뮤직페이지로 이동</Text>
                        </TouchableOpacity>
                </View>
        )
}