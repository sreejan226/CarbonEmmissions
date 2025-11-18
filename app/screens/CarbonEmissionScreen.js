/** Screen that explains carbon emission */
import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

// import screen component
import Screen from './Screen';
// import custom text
import AppText from '../components/AppText';
// import custom button
import AppButton from '../components/AppButton';
// import custom colors
import colors from '../config/colors';

export default function CarbonEmissionScreen() {
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.subContainer1}>
          <AppText style={styles.title1}>What is Carbon Emission?</AppText>
          <AppText style={styles.subTitle}>Carbon Dioxide emission / CO2 emission are those that come from burning fossil fuels and manufacturing of cement. They include carbon dioxide produced during consumption of solid, liquid, and gas fuels.</AppText>
          <AppText style={styles.subTitle}>The world was first made aware of the dangers of carbon emission around the 20th century after it was discovered by scientists that greenhouse effect is the cause of changing climate which was thus caused by burning of fossil fuels which produces a lot of Carbon Dioxide.</AppText>
          <AppText style={styles.link}>Source: The World Bank</AppText>
        </View>

        <View style={styles.subContainer2}>
          <AppText style={styles.title2}>Causes of Carbon Emission?</AppText>
          <AppText style={styles.subTitle}>Over the last century, burning of fossil fuels like coal and oil has increased the concentration of atmospheric carbon dioxide (CO2). This increase happens because the coal or oil burning process combines carbon with oxygen in the air to make CO2. To a lesser extent, clearing of land for agriculture, industry, and other human activities has increased concentrations of greenhouse gases.</AppText>
          <AppText style={[styles.subTitle, {fontWeight: 'bold'}]}>What are Greenhouse Gases?</AppText>
          <AppText style={styles.subTitle}>Greenhouse gases are gases likes Carbon Dioxide (CO2), Methane (CH4), Nitrous Oxide (H20) and Water vapour which trap heat in the atmosphere thus warning the earth hence climate change ~ NOT GOOD.</AppText>
          <AppText style={styles.link}>Source: climate.nasa.gov</AppText>
        </View>

        <View style={styles.subContainer1}>
          <AppText style={styles.title1}>Dangers of Carbon Emission?</AppText>
          <AppText style={styles.subTitle}>Greenhouse gases have far-ranging environmental and health effects. They cause:</AppText>
          <View style={{ padding: 10 }}>
            <FlatList
              data={[
                { key: 'climate change' },
                { key: 'respiratory diseases' },
                { key: 'air pollution' },
                { key: 'extreme weathers' },
                { key: 'food supply disruption' },
                { key: 'increased wildfire' },
                { key: 'rise in sea-levels' },
                { key: 'extinction of species' },
                { key: 'change in weather patterns' },
                { key: 'spread of diseases' },
              ]}
              renderItem={({item}) => 
                  <View style={{ marginBottom: 10 }}>
                    <AppText style={styles.subTitle}>{`\u29BF ${item.key}`}</AppText>
                  </View>
              }
            />
          </View>
          <AppText style={styles.subTitle}>Already documented changes due to climate change:</AppText>
          <View style={{ padding: 10 }}>
            <FlatList
              data={[
                { key: 'Melting of ice glaciers in the earths poles' },
                { key: 'Rise in sea-levels by 3.2 millimeters per year' },
                { key: 'Migration of some species like butterflies, foxes, etc further north' },
                { key: 'Extreme rainfalls and snow in some regions' },
                { key: 'Extreme drought in other regions thus wildfires and water and food shortage' },
                { key: 'Thriving in crop pests like locusts, butterflies and mosquitoes' },
              ]}
              renderItem={({item}) => 
                  <View style={{ marginBottom: 10 }}>
                    <AppText style={styles.subTitle}>{`\u29BF ${item.key}`}</AppText>
                  </View>
              }
            />
          </View>
          <AppText style={styles.subTitle}>Expected changes if climate change continues:</AppText>
          <View style={{ padding: 10 }}>
            <FlatList
              data={[
                { key: 'Rise in sea-levels' },
                { key: 'Strong hurricanes and storms' },
                { key: 'Less fresh water' },
                { key: 'Increase in spread of diseases' },
                { key: 'change in ecosystem' },
              ]}
              renderItem={({item}) => 
                  <View style={{ marginBottom: 10 }}>
                    <AppText style={styles.subTitle}>{`\u29BF ${item.key}`}</AppText>
                  </View>
              }
            />
          </View>
          <AppText style={styles.link}>Source: nationalgeographic.com</AppText>
        </View>

        <View style={styles.subContainer2}>
          <AppText style={styles.title2}>Solutions to Carbon Emission?</AppText>
          <View style={{ padding: 10 }}>
            <FlatList
              data={[
                { key: 'Work from home' },
                { key: 'Start a garden' },
                { key: 'Drive low-carbon vehicles' },
                { key: 'Travel less or short' },
                { key: 'Do not space travel' },
                { key: 'Do not fly private' },
                { key: 'Insulate your home' },
                { key: 'Use energy efficient appliances' },
                { key: 'Turn off lights when not in use' },
                { key: 'Use solar energy' },
                { key: 'Charge appliance only when necessary' },
                { key: 'Eat locally produced organic food' },
                { key: 'Cut back on beef and diary' },
                { key: 'Use less water' },
                { key: 'Recycle and Reuse' },
                { key: 'Offset your carbon-footprint' },
              ]}
              renderItem={({item}) => 
                  <View style={{ marginBottom: 10 }}>
                    <AppText style={styles.subTitle}>{`\u29BF ${item.key}`}</AppText>
                  </View>
              }
            />
          </View>
        </View>

        <View style={styles.subContainer1}>
          <AppText style={styles.title1}>Highest recorded Emission?</AppText>
          <AppText style={styles.subTitle}>Global energy-related carbon dioxide emissions rose by 6% in 2021 to 36.3 billion tonnes, their highest ever level, as the world economy rebounded strongly from the Covid-19 crisis and relied heavily on coal to power that growth</AppText>
          <AppText style={styles.link}>Source: iea.org</AppText>
        </View>

        <AppText style={styles.gases}>Other Harmful Gases</AppText>
        <View style={styles.gasContainer}>
          <TouchableOpacity style={styles.gasTextContainer}>
            <AppText style={styles.gasText}>Methane</AppText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gasTextContainer}>
            <AppText style={styles.gasText}>Nitrous Oxide</AppText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gasTextContainer}>
            <AppText style={styles.gasText}>Fluorinated gases</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  gases: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 14,
    paddingBottom: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: colors.white,
    marginBottom: 8,
  },
  gasContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 30,
    justifyContent: 'space-evenly',
  },
  gasText: {
    fontSize: 13,
    color: colors.white,
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'center',
    marginHorizontal: 2,
  },
  gasTextContainer: {
    backgroundColor: colors.accent,
    borderColor: colors.white,
    borderWidth: 1.5,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  link: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.secondary,
    marginVertical: 4,
    textAlign: 'right',
  },
  subContainer1: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: colors.accent,
    marginBottom: 10,
  },
  subContainer2: {
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 12,
    color: colors.white,
  },
  title1: {
    fontSize: 14,
    padding: 5,
    backgroundColor: colors.primary,
    borderRadius: 20,
    color: colors.white,
    fontWeight: 'bold',
    width: 230,
    textAlign: 'center',
    marginBottom: 10,
  },
  title2: {
    fontSize: 14,
    padding: 5,
    backgroundColor: colors.accent,
    borderRadius: 20,
    color: colors.white,
    fontWeight: 'bold',
    width: 230,
    textAlign: 'center',
    marginBottom: 10,
  }
})