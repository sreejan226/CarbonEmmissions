import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons';

function NextButton({ scrollTo }) {
    return (
        <TouchableOpacity onPress={scrollTo} activeOpacity={0.6} style={ styles.button }>
            <MaterialIcons name='keyboard-arrow-right' size={60} color='#fff'/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flex: 0,
        position: 'absolute',
        right: 0,
        top: 160,
        opacity: 0.7,
    }
});

export default NextButton;