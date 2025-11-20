import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch, Portal } from 'react-native-paper';

// import react icons
import { FontAwesome5 } from '@expo/vector-icons';
// import colors were using
import colors from '../config/colors';

export function DrawerContent(props) {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const toggleTheme = () => { setIsDarkTheme(!isDarkTheme); }
  const [active, setActive] = React.useState('');

  return (
    <View style={styles.drawerBody}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>

          <View style={styles.drawerTitle}>
            <Image style={styles.Logo} source={require('../../assets/logo.png')} />
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
                style={styles.text}
                icon={({color, size}) => ( <FontAwesome5  name="home" size={20} color="#fff"/> )}
                active={active === 'Home'}
                label={ () => ( <Text style={styles.labelText}>Overview</Text>) }
                onPress={() => {props.navigation.navigate('Home')}}
            />
            <DrawerItem
                style={styles.text}
                icon={({color, size}) => ( <FontAwesome5  name="shoe-prints" size={20} color="#fff"/> )}
                label={ () => ( <Text style={styles.labelText}>My Carbon footprint</Text>) }
                active={active === 'Details'}
                onPress={() => {props.navigation.navigate('Footprint')}}
            />
            <DrawerItem
                style={styles.text}
                icon={({color, size}) => ( <FontAwesome5  name="smog" size={20} color="#fff"/> )}
                label={ () => ( <Text style={styles.labelText}>Carbon Emission</Text>) }
                onPress={() => {props.navigation.navigate('Emission')}}
            />
            <DrawerItem
                style={styles.text}
                icon={({color, size}) => ( <FontAwesome5  name="calculator" size={20} color="#fff"/> )}
                label={ () => ( <Text style={styles.labelText}>Emissions Tracker</Text>) }
                onPress={() => {props.navigation.navigate('Tracker')}}
            />
            <DrawerItem
                style={styles.text}
                icon={({color, size}) => ( <FontAwesome5  name="coins" size={20} color="#fff"/> )}
                label={ () => ( <Text style={styles.labelText}>Carbon Credits</Text>) }
                onPress={() => {props.navigation.navigate('Credits')}}
            />
            <DrawerItem
                style={styles.text}
                icon={({color, size}) => ( <FontAwesome5  name="globe-africa" size={20} color="#fff"/> )}
                label={ () => ( <Text style={styles.labelText}>UN Goal</Text>) }
                onPress={() => {props.navigation.navigate('Goals')}}
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection} >
            <DrawerItem
                style={styles.text}
                icon={({color, size}) => ( <FontAwesome5  name="info-circle" size={20} color="#fff"/> )}
                label={ () => ( <Text style={styles.labelText}>About</Text>) }
                onPress={() => {props.navigation.navigate('About')}}
            />
            <DrawerItem
                style={styles.text}
                icon={({color, size}) => ( <FontAwesome5  name="reply" size={20} color="#fff"/> )}
                label={ () => ( <Text style={styles.labelText}>Contact</Text>) }
                onPress={() => {props.navigation.navigate('Contact')}}
            />
            <DrawerItem
                style={styles.text}
                icon={({color, size}) => ( <FontAwesome5  name="cog" size={20} color="#fff"/> )}
                label={ () => ( <Text style={styles.labelText}>Settings</Text>) }
                onPress={() => {props.navigation.navigate('Settings')}}
            />
          </Drawer.Section>
          
          <Drawer.Section title={<Text style={styles.preferenceTitle}>Preference</Text>} showDivider='' >
            <TouchableRipple onPress={() => {toggleTheme()}} >
              <View style={styles.preference}>
                <Text style={styles.labelText}>Dark Theme</Text>
                <View pointerEvents="none">
                    <Switch value={isDarkTheme} color={colors.secondary}/>
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>

        </View>
      </DrawerContentScrollView>
  
      <Drawer.Section showDivider='' style={styles.bottomDrawerSection}>
        <DrawerItem 
        icon={() => ( <Image style={styles.watson} source={require('../../assets/watson.png')} /> )}
        label={ () => ( <Text style={styles.labelFooter}>Powered by Watson Assistant</Text>) } />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
    Logo: {
      width: 50,
      height: 50,
    },
    watson: {
      width: 40,
      height: 40,
    },
    labelText: {
      color: colors.white,
      fontWeight: 'bold',
      fontSize: 13,
    },
    labelFooter: {
      color: colors.white,
      fontSize: 12,
      opacity: 0.5,
    },
    drawerBody : {
      flex: 1,
      backgroundColor: colors.accent,
    },
     drawerContent: {
      flex: 1,
    },
    drawerTitle: {
      paddingLeft: 20,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 16,
      color: colors.white,
    },
    preferenceTitle: {
      color: colors.secondary,
      opacity: 0.1,
    },
});