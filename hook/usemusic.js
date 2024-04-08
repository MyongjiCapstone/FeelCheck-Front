import axios from "axios";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function useMusic() {
    const aiMusicRecommend = (musicGenre) => {
        const result = axios.get(`${API_URL}/openapi/musicRecommend?musicGenre=${musicGenre}`)
        .then((res) => {
            console.log('FrontEnd : Success Recommended Music From AI');
            return res.data.data;
        })
        .catch((error) => {
            console.log('FrontEnd : Failed Recommended Music From AI, Reason :', error);
        });
        return result;
    }

    const convertMusicToData = (songList) => {
        const result = axios.post(`${API_URL}/api/music`,{songList:songList},{headers: {'Content-Type': 'application/json'}})
        .then((res) => {
            console.log('FrontEnd : Success convert Music to Data');
            return res.data.data;
        })
        .catch((error) => {
            console.log('FrontEnd : Failed convert Music to Data, Reason :', error);
        });
        return result;
    }
    return {aiMusicRecommend, convertMusicToData}
}