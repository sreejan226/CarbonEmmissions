import 'react-native-gesture-handler';
import React, { Component } from 'react-native';
import { StyleSheet, Dimensions, Text, View, TouchableHighlight} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import axios from 'axios';
import Voice from 'react-native-voice';
import Tts from 'react-native-tts';
const _backendEndpoint = 'https://co2app.herokuapp.com';


// import colors were using
import colors from './app/config/colors';
// import custom drawer
import { DrawerContent } from './app/components/DrawerContent';
// imports the global screen (default screen)
import GlobalScreen from './app/screens/GlobalScreen';
// import the region screen
import RegionScreen from './app/screens/RegionScreen';
// import my carbon footprint screen
import CarbonFootprintScreen from './app/screens/CarbonFootprintScreen';
// import the carbon emission screen
import CarbonEmissionScreen from './app/screens/CarbonEmissionScreen';
// import the goals screen
import GoalScreen from './app/screens/GoalScreen';
// import about screen
import AboutScreen from './app/screens/AboutScreen';
// import contact screen
import ContactScreen from './app/screens/ContactScreen';
// import settings screen
import SettingsScreen from './app/screens/SettingsScreen';
// import carbon emissions tracker screen
import CarbonEmissionsTracker from './app/screens/CarbonEmissionsTracker';
// import carbon credits page screen
import CarbonCreditsPage from './app/screens/CarbonCreditsPage';


// create navigation bar
const Drawer = createDrawerNavigator();


export default function App() {
  return (
    <NavigationContainer>
      {/** Side drawer that allows users to navigate to other pages */}
      <Drawer.Navigator 
        initialRouteName="Home" 
        drawerContent={props => <DrawerContent {...props}/>} 
        screenOptions={{ 
          headerStyle: { backgroundColor: colors.accent, elevation: 0, shadowOpacity: 0},
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: 'bold', },
          headerShadowVisible: 'none',

        }}>
        {/** Side drawer lists */}
        <Drawer.Screen name="Home" component={GlobalScreen} options={{ title: 'Overview' }} />
        <Drawer.Screen name="Region" component={RegionScreen} options={{ title: 'Overview' }} />
        <Drawer.Screen name="Footprint" component={CarbonFootprintScreen} options={{ title: 'My Carbon Footprint' }} />
        <Drawer.Screen name="Emission" component={CarbonEmissionScreen} options={{ title: 'Carbon Emission' }} />
        <Drawer.Screen name="Tracker" component={CarbonEmissionsTracker} options={{ title: 'Emissions Tracker' }} />
        <Drawer.Screen name="Credits" component={CarbonCreditsPage} options={{ title: 'Carbon Credits' }} />
        <Drawer.Screen name="Goals" component={GoalScreen} />
        <Drawer.Screen name="About" component={AboutScreen} />
        <Drawer.Screen name="Contact" component={ContactScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        
      </Drawer.Navigator>
    </NavigationContainer>
    
  );
}

// code for testing out the Watson AI

// class App extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             text: '',
//             status: '',
//             userPayload: '',
//             userSession: '',
//         };

//         Voice.onSpeechStart = this.onSpeechStartHandler;
//         Voice.onSpeechEnd = this.onSpeechEndHandler;
//         Voice.onSpeechResults = this.onSpeechResultsHandler;
//         //Tts.setDefaultLanguage('en-UK');
//     }

//     useEffect() {
//         this.getSession();
//     }

//     /**
//      * Get Watson session
//      */
//     getSession = async () => {
//         const response = await axios.get(`${_backendEndpoint}/api/session`, this.state.userPayload);
//         this.init(response.data);
//     };

//     /**
//      * Greeting when assistant is ready
//      */
//     init = async session => {
//         try {
//             const initialPayload = {
//                 input: {
//                     message_type: 'text',
//                     text: ''
//                 }
//             }
//             const response = await axios.post(`${_backendEndpoint}/api/message`, { ...initialPayload, ...session });
//             Tts.speak(response.data.output.generic[0].text);

//             // deve responder aqui
//             this.setState({ userSession: session });
//             this.setState({ text: response.data.output.generic[0].text });
//             this.setState({ userPayload: response.data });
//         } catch (err) {
//             console.log('Failed to retrieve data from Watson API', err);
//         }
//     };

//     // Handle voice capture event
//     onSpeechResultsHandler = result => {
//         this.setState({ text: result.value[0] });
//         this.sendMessage(result.value[0]);
//     };

//     // Listening to start
//     onSpeechStartHandler = () => {
//         this.setState({ status: 'Listening...' });
//     };

//     // Listening to end
//     onSpeechEndHandler = () => {
//         this.setState({ status: 'Voice Processed' });
//     };

//     // Listening to press button to speak
//     onStartButtonPress = e => {
//         Voice.start('en-UK');
//     };

//     // Listening to release button to speak
//     onStopButtonPress = async e => {
//         Voice.stop();
//         Tts.stop();
//     };

//     /**
//      * send message to Watson
//      */
//     sendMessage = async payload => {
//         try {
//             let { userSession } = this.state;
//             let inputPayload = {
//                 input: {
//                     message_type: 'text',
//                     text: payload
//                 }
//             }

//             let responseData = { ...inputPayload, ...userSession };
//             let response = await axios.post(`${_backendEndpoint}/api/message`, responseData);
//             this.setState({ text: response.data.output.generic[0].text });
//             Tts.speak(response.data.output.generic[0].text);
//         } catch (err) {
//             console.log('Failed to send data to Watson API', err);
//         }
//     };

//     render() {
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.welcome}>Welcome to Beer Advisor!</Text>

//                 <TouchableHighlight
//                     style={{
//                         borderColor: 'black',
//                         borderWidth: 1,
//                         width: 100,
//                         height: 50,
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                     }}
//                     underlayColor={'gray'}
//                     onPressIn={e => this.onStartButtonPress(e)}
//                     onPressOut={e => this.onStopButtonPress(e)}>
//                     <Text>Talk</Text>
//                 </TouchableHighlight>

//                 <Text style={{ fontSize: 20, color: 'red' }}>{this.state.text}</Text>
//                 <Text style={{ fontSize: 20, color: 'blue' }}>{this.state.status}</Text>
//             </View>
//         );
//     }
// }
// export default App;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//         padding: 20,
//     },
//     welcome: {
//         fontSize: 20,
//         textAlign: 'center',
//         margin: 10,
//     },
// });
