/** This is the AI component in the overview section which user interact with */
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// import colors were using
import colors from '../config/colors';
// import custom buttons
import AppButton from './AppButton';

export default function AI() {
    const navigation = useNavigation();
    
    return (
        <View style={styles.nav}>
            {/** Watson Assistant button */}    
            <TouchableOpacity style={styles.aiIcon}>
                <Image style={styles.watson} source={require('../../assets/watsonWhite.png')} />
            </TouchableOpacity>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                <AppButton style={styles.navButton} title="My Carbon Footprint?" onPress={() => navigation.navigate('Footprint')} color='accent' textColor='white' />
                <AppButton style={styles.navButton} title="Carbon Emission?" onPress={() => navigation.navigate('Emission')} color='accent' textColor='white' />
                <AppButton style={styles.navButton} title="Goals" onPress={() => navigation.navigate('Goals')} color='accent' textColor='white' />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    aiIcon: {
        backgroundColor: colors.secondary,
        padding: 8,
        borderRadius: 30,
        marginLeft: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.white,
        marginRight: 15,
    },
    navButton: {
        marginHorizontal: 10,
        flex: 1,
        flexWrap: 'wrap',
        borderWidth: 0.4,
        borderColor: colors.white,
    },
    nav: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    watson: {
        height: 35,
        width: 35,
    }
});