import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons';

function PrevButton({ scrollFrom }) {
    return (
        <TouchableOpacity onPress={scrollFrom} style={ styles.button } activeOpacity={0.6}>
            <MaterialIcons name='keyboard-arrow-left' size={60} color='#fff'/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flex: 0,
        position: 'absolute',
        left: 0,
        top: 160,
        opacity: 0.7,
    }
})

export default PrevButton;