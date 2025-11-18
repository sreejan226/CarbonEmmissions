import React from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import Constants from 'expo-constants';

// import react icons
import { FontAwesome5 } from '@expo/vector-icons';
import colors from '../config/colors';

function Screen({ children }) {
    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView>
                {children}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.primary,
        paddingTop: 15,
    },
    
});

export default Screen;