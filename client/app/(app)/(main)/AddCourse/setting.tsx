import { showToast } from '@/Components/General/Toast';
import React, { useState } from 'react';
import { Button, View } from 'react-native';
import Toast from 'react-native-root-toast';

const MyPage = () => {
    const handleAction = () => {
        let toast = Toast.show('Request failed to send.', { duration: Toast.durations.LONG });
        setTimeout(function hideToast() { Toast.hide(toast); }, 1000);
    };

    return (
        <View>
            <Button title="Perform Action" onPress={handleAction} />
        </View>
    );
};

export default MyPage;
