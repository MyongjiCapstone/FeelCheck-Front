import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function MusicInit({navigation}) {
    const emotion = 'JOY';
    const emotionText = {
        HAPPY : '행복한',
        JOY : '즐거운',
        ANGRY : '짜증나는',
        RAGE : '분노한',
        SAD : '슬픈',
        GRIEVE : '서글픈',
        SURPRISED : '놀란',
        BLANK : '무표정인'        
    }
    const musicInit = {
        HAPPY : ['행복한', '밝은'],
        JOY : ['신나는', '통통튀는'],
        ANGRY : ['박력있는', '잔잔한'],
        RAGE : ['공격적인', '잔잔한'],
        SAD : ['슬픈', '기운이솟는'],
        GRIEVE : ['우울한', '기운이솟는'],
        SURPRISED : ['진정되는', '밝은'],
        BLANK : ['가벼운', '신나는']
    }
    return (
        <LinearGradient colors={['#9CB7FF', '#DAD1FF']} end={{ x: 0.5, y: 0.6 }} style={{ height: '100%' }}>
            <View style={{alignItems:'center'}}>
                <Text style={{ fontSize: 32, fontWeight: '500', marginTop: hp('8%') }}>{emotionText[emotion]} 당신을 위한</Text>
                <Text style={{ fontSize: 32, fontWeight: '500', marginBottom: hp('4%') }}>플레이리스트</Text>
                <View style={{backgroundColor:'white', width:'85%', padding:hp('4%'), marginBottom:hp('10%'),
                alignItems:'center', justifyContent:'center', borderRadius:25, elevation:15}}>
                    <Text style={{fontSize:25, textAlign:'center'}}>오늘 분위기에 맞는 음악을 들으시겠어요?</Text>
                    <Text style={{fontSize:25, textAlign:'center'}}>원하시면 다른 음악을 추천해드릴게요!</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Music', {emotion: emotionText[emotion], musicGenre:musicInit[emotion][0]})}
                    style={{backgroundColor:'white', height:hp('18%'), width:hp('18%'), marginRight:hp('1.5%'),
                    borderRadius:100, justifyContent:'center', alignItems:'center', elevation:5}}>
                        <Text style={{fontSize:18}}>{musicInit[emotion][0]} 노래</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('Music', {emotion: emotionText[emotion], musicGenre:musicInit[emotion][1]})}
                    style={{backgroundColor:'white', height:hp('18%'), width:hp('18%'), marginLeft:hp('1.5%'), 
                    borderRadius:100, justifyContent:'center', alignItems:'center', elevation:5}}>
                        <Text style={{fontSize:18}}>{musicInit[emotion][1]} 노래</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    )
}