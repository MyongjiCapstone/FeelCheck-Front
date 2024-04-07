import { Ionicons } from '@expo/vector-icons';
import { fetch } from '@react-native-community/netinfo';
import { Text, TouchableOpacity, View } from "react-native"

export default function NetworkError({setMode}) {
    const handleNetworkRetry = () => {
        fetch().then(state => {
            if (state.isConnected) {
                setMode("LOADING");
            } else {
                setMode("NETWORK_ERROR");
            }
        })
    }
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize:18, marginBottom:'5%'}}>네트워크 오류가 발생했습니다.</Text>
            <TouchableOpacity onPress={handleNetworkRetry}>
                <Ionicons name="refresh-sharp" size={40} color="black" />
            </TouchableOpacity>
        </View>
    )
}