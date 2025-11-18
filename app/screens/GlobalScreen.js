import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Text, SafeAreaView, Image } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import colors were using
import colors from '../config/colors';
import {
  stateOptions,
  sectorOptions,
  activityOptions,
  companyOptions,
  productOptions,
  years,
  stateEmissionByYear,
} from '../config/indiaData';
// import react icons
import { FontAwesome5 } from '@expo/vector-icons';
import AppText from '../components/AppText';
// import custom buttons
import AppButton from '../components/AppButton';
// import slide
import Slider from '../components/Slider';
// import the screen
import Screen from './Screen';
// import the AI component
import AI from '../components/AI';

function GlobalScreen({ navigation }) {
  const [selectedState, setSelectedState] = useState("Delhi");
  const [selectedYear, setSelectedYear] = useState('2025');

  const selectedTrend = stateEmissionByYear[selectedState] || [];
  const yearEntry = selectedTrend.find((d) => d.year === selectedYear);
  const headline = yearEntry ? `${yearEntry.value} Mt CO₂e` : '—';

    return (
      <Screen>
        <AI />
        <View style={styles.buttonView}>
          <AppButton title="Global" onPress={() => navigation.navigate('Home')} color='secondary' textColor='white' icon="globe-africa" iconColor="#fff" />
          <AppButton title="My Region" onPress={() => navigation.navigate('Region')} icon="map-marker-alt" />
        </View>
        
        <Slider />

        <View style={styles.select}>
          <SelectList 
            setSelected={(val) => setSelectedState(val)} 
            data={stateOptions}
            save="value"
            placeholder='Indian States'
            arrowicon={<FontAwesome5 name="caret-down" size={20} color={'white'} />}
            closeicon={<FontAwesome5 name="times" size={20} color={'white'} />}
            boxStyles={{backgroundColor: colors.accent, borderColor: colors.primary, borderStartWidth: 3, borderStartColor: colors.secondary, color: colors.white }}
            inputStyles={{color: colors.white, fontWeight: 'bold'}}
            dropdownStyles={{backgroundColor: colors.accent, borderColor: 0,}}
            dropdownTextStyles={{color: colors.white, }}
            searchPlaceholderStyles={{color: colors.white}}
          />
        </View>

        <View style={styles.select}>
          <SelectList 
            setSelected={(val) => setSelectedYear(val)} 
            data={years}
            save="value"
            placeholder='Year (2022 - 2025)'
            arrowicon={<FontAwesome5 name="caret-down" size={20} color={'white'} />}
            closeicon={<FontAwesome5 name="times" size={20} color={'white'} />}
            boxStyles={{backgroundColor: colors.accent, borderColor: colors.primary, borderStartWidth: 3, borderStartColor: colors.secondary, color: colors.white }}
            inputStyles={{color: colors.white, fontWeight: 'bold'}}
            dropdownStyles={{backgroundColor: colors.accent, borderColor: 0,}}
            dropdownTextStyles={{color: colors.white, }}
            searchPlaceholderStyles={{color: colors.white}}
            defaultOption={{ key: '2025', value: '2025' }}
          />
        </View>

        <View style={styles.snapshot}>
          <AppText style={styles.snapshotTitle}>{selectedState} emissions in {selectedYear}</AppText>
          <AppText style={styles.snapshotValue}>{headline}</AppText>
          <AppText style={styles.snapshotCaption}>Includes energy, industry and on-road transport sources.</AppText>
        </View>

        <View style={styles.select}>
          <SelectList 
            setSelected={() => {}} 
            data={sectorOptions}
            save="value"
            placeholder='Activities'
            arrowicon={<FontAwesome5 name="caret-down" size={20} color={'white'} />}
            closeicon={<FontAwesome5 name="times" size={20} color={'white'} />}
            boxStyles={{backgroundColor: colors.accent, borderColor: colors.primary, borderStartWidth: 3, borderStartColor: colors.secondary, color: colors.white }}
            inputStyles={{color: colors.white, fontWeight: 'bold'}}
            dropdownStyles={{backgroundColor: colors.accent, borderColor: 0,}}
            dropdownTextStyles={{color: colors.white, }}
            searchPlaceholderStyles={{color: colors.white}}
          />
        </View>

        <View style={styles.select}>
          <SelectList 
            setSelected={() => {}} 
            data={companyOptions}
            save="value"
            placeholder='Companies'
            arrowicon={<FontAwesome5 name="caret-down" size={20} color={'white'} />}
            closeicon={<FontAwesome5 name="times" size={20} color={'white'} />}
            boxStyles={{backgroundColor: colors.accent, borderColor: colors.primary, borderStartWidth: 3, borderStartColor: colors.secondary, color: colors.white }}
            inputStyles={{color: colors.white, fontWeight: 'bold'}}
            dropdownStyles={{backgroundColor: colors.accent, borderColor: 0,}}
            dropdownTextStyles={{color: colors.white, }}
            searchPlaceholderStyles={{color: colors.white}}
          />
        </View>

        <View style={styles.select}>
          <SelectList 
            setSelected={() => {}} 
            data={productOptions}
            save="value"
            placeholder='Products'
            arrowicon={<FontAwesome5 name="caret-down" size={20} color={'white'} />}
            closeicon={<FontAwesome5 name="times" size={20} color={'white'} />}
            boxStyles={{backgroundColor: colors.accent, borderColor: colors.primary, borderStartWidth: 3, borderStartColor: colors.secondary, color: colors.white }}
            inputStyles={{color: colors.white, fontWeight: 'bold'}}
            dropdownStyles={{backgroundColor: colors.accent, borderColor: 0,}}
            dropdownTextStyles={{color: colors.white, }}
            searchPlaceholderStyles={{color: colors.white}}
          />
        </View>

      </Screen>
    );
}

const styles = StyleSheet.create({
  select: {
    marginBottom: 20,
  },
  buttonView: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 10,
  },
  snapshot: {
    backgroundColor: colors.accent,
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
  },
  snapshotTitle: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 6,
  },
  snapshotValue: {
    color: colors.white,
    fontSize: 28,
    fontWeight: 'bold',
  },
  snapshotCaption: {
    color: colors.white,
    fontSize: 11,
    marginTop: 4,
  },
})

export default GlobalScreen;