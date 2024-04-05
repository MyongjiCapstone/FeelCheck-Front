import React from 'react';
import { View, Text } from 'react-native';
import RNFS from 'react-native-fs';
const image = require('../assets/smile.jpg');

export default function Home() {
    async function query(filename) {
        try {
            const filepath = `${RNFS.DocumentDirectoryPath}/${filename}`;
            const file = await RNFS.readFile(filepath, 'base64');
            const data = new FormData();
            data.append('file', {
                name: filename,
                type: 'image/jpg',
                uri: `data:image/jpg;base64,${file}`,
            });

            const response = await fetch(
                "https://api-inference.huggingface.co/models/dima806/face_emotions_image_detection",
                {
                    headers: { Authorization: "Bearer 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" },
                    method: "POST",
                    body: data,
                }
            );
            const result = await response.json();
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    query("smile.jpg").then((response) => {
        console.log(JSON.stringify(response));
    });

    return (
        <View>
            <Text>Home Screen</Text>
        </View>
    );
}
