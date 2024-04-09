import { Image, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import useMusic from "../../hook/usemusic"
import { useEffect, useState } from "react";
import { addEventListener } from '@react-native-community/netinfo';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import NetworkError from "../NetworkError";
import Loading from "../Loading";

export default function Music({navigation, route}) {
    const [ mode, setMode ] = useState("LOADING"); // LOADING, CONNECTING, NETWORK_ERROR, CONNECTED
    const { aiMusicRecommend, convertMusicToData } = useMusic();
    const [dataList, setDataList] = useState();

    const handleConnectionChange = (state) => {
        if (state.isConnected) {
            if (!dataList){
                aiMusicRecommend(route.params.musicGenre)
                    //AI 음악 추천 성공
                    .then(res => {
                        const songs = res.split('\n').map(song => ({ title: song }));
                        setDataList(songs);
                        setMode("CONNECTED");
                        return convertMusicToData(res);
                    })
                    //Youtube 크롤링 성공
                    .then(res => {
                        if (res) {setDataList(res)}
                    })
            }
        } else {
            setMode("NETWORK_ERROR");
        }
    };
    const handleTouchMusic = (url) => {
        Linking.openURL(url);
    };

    useEffect(()=>{
        if (mode === "LOADING"){
            const unsubscribe = addEventListener(handleConnectionChange);
            return () => {
                unsubscribe();
            };
        }
    },[mode]);

    return (
        <LinearGradient colors={['#9CB7FF', '#DAD1FF']} end={{ x: 0.5, y: 0.6 }} style={{height:'100%'}}>
            {mode==="NETWORK_ERROR" ? (
            <NetworkError setMode={setMode}/>
            ) : (
            <ScrollView contentContainerStyle={mode==="LOADING" ? {alignItems:'center', flex:1} : {alignItems:'center'}}>
                <Text style={{fontSize:32, fontWeight:'500', marginTop:hp('8%')}}>{route.params.emotion} 당신을 위한</Text>
                <Text style={{fontSize:32, fontWeight:'500', marginBottom:hp('4%')}}>플레이리스트</Text>
                {mode === "LOADING" ? (
                <Loading/>
                ) : (
                <View style={{width:'85%'}}>
                    {dataList?.map((data, index) => {
                        const [artist, title] = data.title.split(' - ');
                        return (
                            <TouchableOpacity activeOpacity={0.7} style={{ flexDirection: 'row', backgroundColor:'white', padding:hp('1.5%'), marginBottom:hp('1%')}}
                                onPress={data?.url ? () => handleTouchMusic(data.url) : undefined} key={index}>
                                <Image style={{ marginRight: hp('2%'), width:hp('13%'), height:hp('13%') }} source={data?.image ? { uri: data?.image } : require('../../assets/skeleton.png')} width={hp('13%')} height={hp('13%')}/>
                                <View style={{width:hp('23%')}}>
                                    <Text numberOfLines={3} style={title.length>15 ? {fontSize: 20} : { fontSize: 25 }}>{title}</Text>
                                    <Text style={{ fontSize: 15, fontWeight: "200" }}>{artist}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                )}
            </ScrollView>
            )}
        </LinearGradient>
    )
}