import React, { useState, useCallback } from 'react';
import { View, Button, Dimensions } from 'react-native';
import YouTubeIframe from 'react-native-youtube-iframe';

const Videos = () => {
    const [playing, setPlaying] = useState(false);

    const screenWidth = Dimensions.get('window').width;
    const playerWidth = screenWidth * 0.9;
    const playerHeight = playerWidth * 9 / 16;

    const onStateChange = useCallback((state) => {
        if (state === 'ended') {
            setPlaying(false);
            alert('Video has finished playing!');
        }
    }, []);


    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <YouTubeIframe
                height={playerHeight}
                width={playerWidth}
                play={playing}
                videoId={'jz2MvL_RlAI'}
                volume={50}
                mute={false}
                onChangeState={onStateChange}
                initialPlayerParams={{
                    loop: false,
                    controls: true,
                }}
            />
        </View>
    );
};

export default Videos;
