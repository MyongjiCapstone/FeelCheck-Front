import axios from "axios";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function useMusic() {
    const convertMusicToData = () => {
        const result = axios.post(`${API_URL}/api/music`,{songList:"조이 - 안녕\n버스커버스커 - 막걸리나"},{headers: {'Content-Type': 'application/json'}})
        .then((res) => {
            console.log('FrontEnd : Success convert Music to Data');
            return res.data.data;
        })
        .catch((error) => {
            console.log('FrontEnd : Failed convert Music to Data, Reason :', error);
        });
        return result;
    }
    return {convertMusicToData}
}