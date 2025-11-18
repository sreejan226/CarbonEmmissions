/** Designing the buttons */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// import colors
import colors from '../config/colors';
// import react icons
import { FontAwesome5 } from '@expo/vector-icons';

function AppButton({title, onPress, color= "white", textColor="primary", icon, iconColor="#282c34", style}) {
    return (
        // give feedback whenever we press a button
        <TouchableOpacity style={[styles.button, {backgroundColor: colors[color]}, style]} onPress={onPress}>
            <FontAwesome5  name={icon} size={18} color={iconColor}/>
            <Text style={[styles.text, {color: colors[textColor]}]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        backgroundColor: colors.white,
        padding: 10,
        width: '40%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    text: {
        color: colors.primary,
        fontSize: 13,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginHorizontal: 12,
    }
})

export default AppButton;