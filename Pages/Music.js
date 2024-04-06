import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import useMusic from "../hook/usemusic"
import { useEffect, useState } from "react";
import { addEventListener, useNetInfo } from '@react-native-community/netinfo';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function Music() {
    const netInfo = useNetInfo();
    const { convertMusicToData } = useMusic();
    const [dataList, setDataList] = useState();
    useEffect(() => {
        convertMusicToData().then(res=>setDataList(res));
        
        const networkCheck = addEventListener(state => {
            console.log(state.isConnected);
        })
        return ()=>{
            networkCheck();
        }
    }, []);
    const handleTouchMusic = (url) => {
        Linking.openURL(url);
    }
    return (
        <View>
            {dataList?.map((data, index)=>{
                const [artist, title] = data.title.split(' - ');
                return (
                <TouchableOpacity style={{flexDirection:'row'}}
                onPress={()=>handleTouchMusic(data.url)} key={index}>
                    <Image style={{marginRight:hp('2%')}} source={{uri:data.image}} width={hp('13%')} height={hp('13%')}/>
                    <View>
                        <Text style={{fontSize:25}}>{title}</Text>
                        <Text style={{fontSize:15, fontWeight:"200"}}>{artist}</Text>
                    </View>
                </TouchableOpacity>
            )})}
            <Text></Text>
        </View>
    )
}