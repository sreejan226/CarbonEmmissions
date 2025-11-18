/** screen that allows user to calculate their carbon emission */
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { LineChart } from 'react-native-chart-kit';

// import the custom screen component
import Screen from './Screen';
// import custom text
import AppText from '../components/AppText';
// import custom colors
import colors from '../config/colors';
// import react icons
import { FontAwesome5 } from '@expo/vector-icons';
// import custom Button
import AppButton from '../components/AppButton';
import {
  stateOptions,
  stateEmissionByYear,
  calculatorFactors,
  years,
} from '../config/indiaData';

const dietOptions = [
  { key: 'veg', label: 'Vegetarian' },
  { key: 'mix', label: 'Balanced' },
  { key: 'meat', label: 'Meat-heavy' },
];

export default function CarbonFootprintScreen() {
  const [selectedState, setSelectedState] = useState('Delhi');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [airKm, setAirKm] = useState('500');
  const [roadKm, setRoadKm] = useState('150');
  const [metroKm, setMetroKm] = useState('60');
  const [homeKwh, setHomeKwh] = useState('180');
  const [lpgCount, setLpgCount] = useState('1');
  const [diet, setDiet] = useState('mix');
  const [footprint, setFootprint] = useState(null);

  const trend = stateEmissionByYear[selectedState] || [];
  const chartData = useMemo(() => {
    const labels = trend.length ? trend.map((point) => point.year) : ['2022'];
    const values = trend.length ? trend.map((point) => point.value) : [0];
    return {
      labels,
      datasets: [
        {
          data: values,
          strokeWidth: 2,
        },
      ],
    };
  }, [trend]);

  const selectedYearValue = trend.find((point) => point.year === selectedYear)?.value;

  const calculateFootprint = () => {
    const air = parseFloat(airKm) || 0;
    const road = parseFloat(roadKm) || 0;
    const metro = parseFloat(metroKm) || 0;
    const home = parseFloat(homeKwh) || 0;
    const lpg = parseFloat(lpgCount) || 0;

    const travelEmission =
      air * calculatorFactors.airKm +
      road * calculatorFactors.roadKm +
      metro * calculatorFactors.metroKm;

    const householdEmission =
      home * calculatorFactors.homeElectricity +
      lpg * calculatorFactors.lpgCylinder;

    const lifestyleBaseline =
      calculatorFactors.baseLifestyle[selectedState] || 1.0;

    const dietMultiplier =
      calculatorFactors.dietMultiplier[diet] ||
      calculatorFactors.dietMultiplier.mix;

    const total =
      (travelEmission + householdEmission) * dietMultiplier + lifestyleBaseline;

    setFootprint(total.toFixed(2));
  };

  return (
    <Screen>
      <View style={styles.titleContainer}>
        <AppText style={styles.title}>Calculate Your Carbon Footprint</AppText>
      </View>

      <View style={styles.subTitleContainer}>
        <AppText style={styles.subTitle}>
          This calculator is tuned for Tripura, Assam, Delhi and West Bengal with 2022-2025 data baked in.
        </AppText>
      </View>

      <SelectList
        setSelected={(val) => setSelectedState(val)}
        data={stateOptions}
        placeholder='Select your state'
        save='value'
        arrowicon={<FontAwesome5 name='caret-down' size={20} color={colors.primary} />}
        boxStyles={{ backgroundColor: colors.white, borderColor: 0, height: 45, justifyContent: 'center', marginHorizontal: 20 }}
        inputStyles={{ color: colors.primary, fontWeight: 'bold', marginHorizontal: 20 }}
        dropdownStyles={{ backgroundColor: colors.accent, borderColor: 0, marginTop: 2 }}
        dropdownTextStyles={{ color: colors.white }}
        searchPlaceholderStyles={{ color: colors.primary }}
        searchPlaceholder='Search your state'
        defaultOption={{ key: 'delhi', value: 'Delhi' }}
      />

      <SelectList
        setSelected={(val) => setSelectedYear(val)}
        data={years}
        placeholder='Year (2022 - 2025)'
        save='value'
        arrowicon={<FontAwesome5 name='caret-down' size={20} color={colors.primary} />}
        boxStyles={{ backgroundColor: colors.white, borderColor: 0, height: 45, justifyContent: 'center', marginHorizontal: 20, marginTop: 10 }}
        inputStyles={{ color: colors.primary, fontWeight: 'bold', marginHorizontal: 20 }}
        dropdownStyles={{ backgroundColor: colors.accent, borderColor: 0, marginTop: 2 }}
        dropdownTextStyles={{ color: colors.white }}
        searchPlaceholderStyles={{ color: colors.primary }}
        searchPlaceholder='Select a year'
        defaultOption={{ key: '2025', value: '2025' }}
      />

      <View style={styles.hint}>
        <FontAwesome5 name='info-circle' size={15} color={colors.white} />
        <AppText style={styles.hintText}>
          All numbers are hard-coded to reflect Indian grid mix and lifestyle factors for Tripura, Assam, Delhi and West Bengal.
        </AppText>
      </View>

      <View style={styles.calculator}>
        <View style={styles.inputBlock}>
          <View style={styles.calHeader}>
            <FontAwesome5 name='plane' size={15} color={colors.white} />
            <AppText style={styles.calHeaderText}>Air Travel (km / month)</AppText>
          </View>
          <TextInput
            style={styles.input}
            value={airKm}
            onChangeText={setAirKm}
            keyboardType='numeric'
            placeholder='e.g. 500'
            placeholderTextColor={colors.white}
          />
        </View>

        <View style={styles.inputBlock}>
          <View style={styles.calHeader}>
            <FontAwesome5 name='car' size={15} color={colors.white} />
            <AppText style={styles.calHeaderText}>Road Travel (km / month)</AppText>
          </View>
          <TextInput
            style={styles.input}
            value={roadKm}
            onChangeText={setRoadKm}
            keyboardType='numeric'
            placeholder='e.g. 150'
            placeholderTextColor={colors.white}
          />
        </View>

        <View style={styles.inputBlock}>
          <View style={styles.calHeader}>
            <FontAwesome5 name='train' size={15} color={colors.white} />
            <AppText style={styles.calHeaderText}>Metro/Rail (km / month)</AppText>
          </View>
          <TextInput
            style={styles.input}
            value={metroKm}
            onChangeText={setMetroKm}
            keyboardType='numeric'
            placeholder='e.g. 60'
            placeholderTextColor={colors.white}
          />
        </View>

        <View style={styles.inputBlock}>
          <View style={styles.calHeader}>
            <FontAwesome5 name='home' size={15} color={colors.white} />
            <AppText style={styles.calHeaderText}>Electricity (kWh / month)</AppText>
          </View>
          <TextInput
            style={styles.input}
            value={homeKwh}
            onChangeText={setHomeKwh}
            keyboardType='numeric'
            placeholder='e.g. 180'
            placeholderTextColor={colors.white}
          />
        </View>

        <View style={styles.inputBlock}>
          <View style={styles.calHeader}>
            <FontAwesome5 name='burn' size={15} color={colors.white} />
            <AppText style={styles.calHeaderText}>LPG Cylinders (per month)</AppText>
          </View>
          <TextInput
            style={styles.input}
            value={lpgCount}
            onChangeText={setLpgCount}
            keyboardType='numeric'
            placeholder='e.g. 1'
            placeholderTextColor={colors.white}
          />
        </View>

        <View style={styles.dietRow}>
          {dietOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[styles.dietChip, diet === option.key && styles.dietChipSelected]}
              onPress={() => setDiet(option.key)}
            >
              <Text style={styles.dietChipText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <AppButton
          title='Calculate Footprint'
          onPress={calculateFootprint}
          color='secondary'
        />

        {footprint && (
          <View style={styles.result}>
            <AppText style={styles.resultTitle}>Your personal emission</AppText>
            <AppText style={styles.resultValue}>{footprint} t CO₂e / month</AppText>
            <AppText style={styles.resultContext}>
              Includes lifestyle baseline for {selectedState} and diet multiplier ({diet}).
            </AppText>
          </View>
        )}
      </View>

      <View style={styles.chart}>
        <Text style={styles.chartTitle}>State emission trend (2022 - 2025)</Text>
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width}
          height={220}
          yAxisLabel=' '
          yAxisSuffix=' Mt'
          chartConfig={{
            backgroundColor: colors.accent,
            backgroundGradientFrom: colors.primary,
            backgroundGradientTo: colors.accent,
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        {selectedYearValue && (
          <AppText style={styles.chartCaption}>
            {selectedState} emitted {selectedYearValue} Mt CO₂e in {selectedYear}.
          </AppText>
        )}
      </View>

      <AppText style={styles.carbonTitle}>Average Emission Per Person (yearly)</AppText>
      <View style={styles.carbon}>
        <View style={{ alignItems: 'center' }}>
          <AppText style={[styles.carbonMeasure, { backgroundColor: colors.secondary }]}>Low</AppText>
          <AppText style={styles.carbonCount}>0.6 - 1.3 t</AppText>
        </View>

        <View>
          <AppText style={[styles.carbonMeasure, { backgroundColor: 'orange' }]}>Medium</AppText>
          <AppText style={styles.carbonCount}>1.4 - 2.4 t</AppText>
        </View>

        <View>
          <AppText style={[styles.carbonMeasure, { backgroundColor: 'red' }]}>High</AppText>
          <AppText style={styles.carbonCount}>{'> 2.5 t'}</AppText>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  calculator: {
    backgroundColor: colors.accent,
    borderRadius: 20,
    padding: 10,
  },
  inputBlock: {
    marginBottom: 12,
  },
  calHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    padding: 5,
    borderRadius: 5,
  },
  calHeaderText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 8,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 8,
    padding: 8,
    color: colors.white,
    marginTop: 6,
  },
  dietRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  dietChip: {
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginHorizontal: 4,
  },
  dietChipSelected: {
    backgroundColor: colors.secondary,
  },
  dietChipText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
  chart: {
    marginVertical: 10,
  },
  chartTitle: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  chartCaption: {
    color: colors.white,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 4,
  },
  carbon: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  carbonCount: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  carbonMeasure: {
    padding: 5,
    color: colors.white,
    borderRadius: 6,
    fontWeight: 'bold',
    width: 90,
    textAlign: 'center',
    marginBottom: 10,
  },
  carbonTitle: {
    fontSize: 14,
    color: colors.secondary,
    marginBottom: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  hint: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  hintText: {
    color: colors.white,
    fontSize: 9,
    marginLeft: 8,
    width: 300,
  },
  subTitle: {
    color: colors.white,
    fontSize: 12,
    textAlign: 'center',
    width: 340,
    marginBottom: 10,
  },
  subTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    borderBottomColor: colors.white,
    borderBottomWidth: 0.2,
    width: 300,
    paddingBottom: 8,
  },
  result: {
    marginTop: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 12,
  },
  resultTitle: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  resultValue: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 4,
  },
  resultContext: {
    color: colors.white,
    fontSize: 10,
    marginTop: 4,
  },
});