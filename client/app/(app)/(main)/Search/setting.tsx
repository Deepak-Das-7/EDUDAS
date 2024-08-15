import React from 'react'
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { AuthContext } from '@/Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env';
import { StyleSheet, Text, View } from 'react-native'


const setting = () => {
    return (
        <View>
            <Text>setting</Text>
            <Text>{BASE_URL}</Text>
            <Text>setting</Text>
            <Text>setting</Text>
            <Text>setting</Text>
        </View>
    )
}

export default setting

const styles = StyleSheet.create({})