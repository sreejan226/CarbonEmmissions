/**
 * Carbon Emissions Tracker Screen
 * Calculates daily carbon emissions using standardized global formulas
 */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SelectList } from 'react-native-dropdown-select-list';
import { FontAwesome5 } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';

// Import custom components
import Screen from './Screen';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import colors from '../config/colors';

// Transport mode options
const transportModes = [
  { key: 'car', value: 'Car' },
  { key: 'bus', value: 'Bus' },
  { key: 'train', value: 'Train' },
  { key: 'flight', value: 'Flight' },
  { key: 'bike', value: 'Bike' },
  { key: 'walking', value: 'Walking' },
];

// Emission factors (kg CO2 per unit)
const EMISSION_FACTORS = {
  car: 0.21, // kg CO2/km
  bus: 0.101,
  train: 0.041,
  flight: 0.255,
  bike: 0, // No emissions
  walking: 0, // No emissions
  electricity: 0.82, // kg CO2 per kWh (India avg grid factor)
  lpg: 2.983, // kg CO2 per kg LPG
  waste: 0.5, // kg CO2 per kg waste
};

// Indian average: 4.5 tons/year = 12.33 kg/day
const INDIAN_AVERAGE_DAILY = 12.33; // kg CO2 per day

const STORAGE_KEY = 'carbon_emissions_data';

export default function CarbonEmissionsTracker() {
  // State for inputs
  const [distance, setDistance] = useState('');
  const [transportMode, setTransportMode] = useState('car');
  const [electricity, setElectricity] = useState('');
  const [lpgUsage, setLpgUsage] = useState('');
  const [waste, setWaste] = useState('');

  // State for results
  const [totalEmissions, setTotalEmissions] = useState(null);
  const [savedData, setSavedData] = useState(null);
  const [creditsEarned, setCreditsEarned] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [emissionsReduced, setEmissionsReduced] = useState(0);
  const [isBelowAverage, setIsBelowAverage] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    loadSavedData();
  }, []);

  // Load saved data from AsyncStorage
  const loadSavedData = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        // If it's an array, get the last entry; if it's a single object, use it directly
        const lastEntry = Array.isArray(parsed) ? parsed[parsed.length - 1] : parsed;
        if (lastEntry) {
          setSavedData(lastEntry);
          // If there's saved data, populate the form and show results
          if (lastEntry.totalEmissions) {
            setTotalEmissions(lastEntry.totalEmissions);
            // Load credits and points if available
            if (lastEntry.creditsEarned !== undefined) {
              setCreditsEarned(lastEntry.creditsEarned);
            }
            if (lastEntry.pointsEarned !== undefined) {
              setPointsEarned(lastEntry.pointsEarned);
            }
            if (lastEntry.emissionsReduced !== undefined) {
              setEmissionsReduced(lastEntry.emissionsReduced);
            }
            if (lastEntry.isBelowAverage !== undefined) {
              setIsBelowAverage(lastEntry.isBelowAverage);
            }
            // Optionally populate form fields
            if (lastEntry.distance) setDistance(lastEntry.distance.toString());
            if (lastEntry.transportMode) setTransportMode(lastEntry.transportMode);
            if (lastEntry.electricity) setElectricity(lastEntry.electricity.toString());
            if (lastEntry.lpgUsage) setLpgUsage(lastEntry.lpgUsage.toString());
            if (lastEntry.waste) setWaste(lastEntry.waste.toString());
          }
        }
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };

  // Calculate emissions
  const calculateEmissions = () => {
    // Parse inputs
    const distanceKm = parseFloat(distance) || 0;
    const electricityKwh = parseFloat(electricity) || 0;
    const lpgKg = parseFloat(lpgUsage) || 0;
    const wasteKg = parseFloat(waste) || 0;

    // Calculate transport emissions
    const transportEmissions = distanceKm * (EMISSION_FACTORS[transportMode] || 0);

    // Calculate electricity emissions
    const electricityEmissions = electricityKwh * EMISSION_FACTORS.electricity;

    // Calculate LPG emissions (convert monthly to daily: monthly_kg / 30)
    const lpgEmissions = (lpgKg / 30) * EMISSION_FACTORS.lpg;

    // Calculate waste emissions
    const wasteEmissions = wasteKg * EMISSION_FACTORS.waste;

    // Total daily emissions in kg CO2
    const total = transportEmissions + electricityEmissions + lpgEmissions + wasteEmissions;

    setTotalEmissions(total);

    // Calculate credits and points if emissions are below Indian average
    let creditsEarnedValue = 0;
    let pointsEarnedValue = 0;
    let emissionsReducedValue = 0;
    let belowAverage = false;
    
    if (total < INDIAN_AVERAGE_DAILY) {
      // User emitted less than average - they get credits!
      belowAverage = true;
      emissionsReducedValue = INDIAN_AVERAGE_DAILY - total; // kg CO2 saved
      creditsEarnedValue = emissionsReducedValue / 1000; // Convert kg to tons (1 CCU = 1 ton CO2)
      pointsEarnedValue = creditsEarnedValue * 100; // 100 points per CCU
    }

    // Update state
    setEmissionsReduced(emissionsReducedValue);
    setCreditsEarned(creditsEarnedValue);
    setPointsEarned(pointsEarnedValue);
    setIsBelowAverage(belowAverage);

    // Save to AsyncStorage with credits and points
    const dataToSave = {
      distance: distanceKm,
      transportMode,
      electricity: electricityKwh,
      lpgUsage: lpgKg,
      waste: wasteKg,
      totalEmissions: total,
      emissionsReduced: emissionsReducedValue,
      creditsEarned: creditsEarnedValue,
      pointsEarned: pointsEarnedValue,
      isBelowAverage: belowAverage,
      calculatedAt: new Date().toISOString(),
    };

    saveData(dataToSave);
  };

  // Save data to AsyncStorage
  const saveData = async (data) => {
    try {
      // Get existing data
      const existing = await AsyncStorage.getItem(STORAGE_KEY);
      let allData = [];
      if (existing) {
        allData = JSON.parse(existing);
      }

      // Add new entry
      allData.push(data);

      // Keep only last 30 entries
      if (allData.length > 30) {
        allData = allData.slice(-30);
      }

      // Save back
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
      setSavedData(data);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  // Calculate progress percentage
  const progressPercentage = totalEmissions
    ? Math.min((totalEmissions / INDIAN_AVERAGE_DAILY) * 100, 100)
    : 0;

  // Circular progress bar component
  const CircularProgress = ({ size = 150, strokeWidth = 10, progress = 0 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const progressDecimal = progress / 100;
    const strokeDashoffset = circumference - (progressDecimal * circumference);

    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
          {/* Background circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.accent}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.secondary}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </Svg>
        <View style={styles.progressTextContainer}>
          <AppText style={styles.progressPercentage}>{progressPercentage.toFixed(1)}%</AppText>
          <AppText style={styles.progressLabel}>of Indian avg</AppText>
        </View>
      </View>
    );
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer}>
          <AppText style={styles.title}>Carbon Emissions Tracker</AppText>
          <AppText style={styles.subtitle}>Calculate your daily carbon emissions</AppText>
        </View>

        {/* Input Section */}
        <View style={styles.inputSection}>
          {/* Distance Input */}
          <View style={styles.inputBlock}>
            <View style={styles.inputHeader}>
              <FontAwesome5 name="route" size={16} color={colors.white} />
              <AppText style={styles.inputLabel}>Distance Travelled (km)</AppText>
            </View>
            <TextInput
              style={styles.input}
              value={distance}
              onChangeText={setDistance}
              keyboardType="numeric"
              placeholder="Enter distance in km"
              placeholderTextColor={colors.white}
            />
          </View>

          {/* Transport Mode Dropdown */}
          <View style={styles.inputBlock}>
            <View style={styles.inputHeader}>
              <FontAwesome5 name="car" size={16} color={colors.white} />
              <AppText style={styles.inputLabel}>Mode of Transport</AppText>
            </View>
            <SelectList
              setSelected={(val) => setTransportMode(val)}
              data={transportModes}
              placeholder="Select transport mode"
              save="key"
              defaultOption={{ key: 'car', value: 'Car' }}
              arrowicon={<FontAwesome5 name="caret-down" size={16} color={colors.white} />}
              boxStyles={{
                backgroundColor: 'transparent',
                borderColor: colors.white,
                borderWidth: 1,
                borderRadius: 8,
                height: 45,
                marginTop: 6,
              }}
              inputStyles={{ color: colors.white, fontWeight: 'bold' }}
              dropdownStyles={{
                backgroundColor: colors.accent,
                borderColor: colors.white,
              }}
              dropdownTextStyles={{ color: colors.white }}
            />
          </View>

          {/* Electricity Input */}
          <View style={styles.inputBlock}>
            <View style={styles.inputHeader}>
              <FontAwesome5 name="bolt" size={16} color={colors.white} />
              <AppText style={styles.inputLabel}>Electricity Consumption (kWh/day)</AppText>
            </View>
            <TextInput
              style={styles.input}
              value={electricity}
              onChangeText={setElectricity}
              keyboardType="numeric"
              placeholder="Enter kWh per day"
              placeholderTextColor={colors.white}
            />
          </View>

          {/* LPG Input */}
          <View style={styles.inputBlock}>
            <View style={styles.inputHeader}>
              <FontAwesome5 name="burn" size={16} color={colors.white} />
              <AppText style={styles.inputLabel}>LPG Usage (kg/month)</AppText>
            </View>
            <TextInput
              style={styles.input}
              value={lpgUsage}
              onChangeText={setLpgUsage}
              keyboardType="numeric"
              placeholder="Enter kg per month"
              placeholderTextColor={colors.white}
            />
          </View>

          {/* Waste Input */}
          <View style={styles.inputBlock}>
            <View style={styles.inputHeader}>
              <FontAwesome5 name="trash" size={16} color={colors.white} />
              <AppText style={styles.inputLabel}>Waste Generated (kg/day)</AppText>
            </View>
            <TextInput
              style={styles.input}
              value={waste}
              onChangeText={setWaste}
              keyboardType="numeric"
              placeholder="Enter kg per day"
              placeholderTextColor={colors.white}
            />
          </View>

          {/* Calculate Button */}
          <AppButton
            title="Calculate Emissions"
            onPress={calculateEmissions}
            color="secondary"
            icon="calculator"
            iconColor={colors.white}
            style={styles.calculateButton}
          />
        </View>

        {/* Results Section */}
        {totalEmissions !== null && (
          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <FontAwesome5 name="leaf" size={20} color={colors.secondary} />
              <AppText style={styles.resultTitle}>Total CO₂ Emissions</AppText>
            </View>
            <AppText style={styles.resultValue}>
              {totalEmissions.toFixed(2)} kg CO₂/day
            </AppText>
            <AppText style={styles.resultSubtext}>
              Indian average: {INDIAN_AVERAGE_DAILY.toFixed(2)} kg CO₂/day
            </AppText>

            {/* Credits and Points Earned Section */}
            {isBelowAverage && (
              <View style={styles.creditsEarnedSection}>
                <View style={styles.creditsBadge}>
                  <FontAwesome5 name="trophy" size={18} color={colors.secondary} />
                  <AppText style={styles.creditsTitle}>Credits Earned!</AppText>
                </View>
                <View style={styles.creditsInfo}>
                  <View style={styles.creditsRow}>
                    <AppText style={styles.creditsLabel}>Emissions Reduced:</AppText>
                    <AppText style={styles.creditsValue}>
                      {emissionsReduced.toFixed(2)} kg CO₂
                    </AppText>
                  </View>
                  <View style={styles.creditsRow}>
                    <AppText style={styles.creditsLabel}>Carbon Credits (CCU):</AppText>
                    <AppText style={styles.creditsValue}>
                      {creditsEarned.toFixed(4)} CCU
                    </AppText>
                  </View>
                  <View style={styles.creditsRow}>
                    <AppText style={styles.creditsLabel}>Redeemable Points:</AppText>
                    <AppText style={styles.creditsValue}>
                      {pointsEarned.toFixed(0)} pts
                    </AppText>
                  </View>
                </View>
              </View>
            )}

            {/* Circular Progress Bar */}
            <View style={styles.progressContainer}>
              <CircularProgress
                size={150}
                strokeWidth={12}
                progress={progressPercentage}
              />
            </View>

            <View style={styles.emissionBreakdown}>
              <AppText style={styles.breakdownTitle}>Breakdown:</AppText>
              <View style={styles.breakdownItem}>
                <AppText style={styles.breakdownLabel}>Transport:</AppText>
                <AppText style={styles.breakdownValue}>
                  {(
                    (parseFloat(distance) || 0) *
                    (EMISSION_FACTORS[transportMode] || 0)
                  ).toFixed(2)}{' '}
                  kg
                </AppText>
              </View>
              <View style={styles.breakdownItem}>
                <AppText style={styles.breakdownLabel}>Electricity:</AppText>
                <AppText style={styles.breakdownValue}>
                  {((parseFloat(electricity) || 0) * EMISSION_FACTORS.electricity).toFixed(2)} kg
                </AppText>
              </View>
              <View style={styles.breakdownItem}>
                <AppText style={styles.breakdownLabel}>LPG:</AppText>
                <AppText style={styles.breakdownValue}>
                  {(
                    ((parseFloat(lpgUsage) || 0) / 30) *
                    EMISSION_FACTORS.lpg
                  ).toFixed(2)}{' '}
                  kg
                </AppText>
              </View>
              <View style={styles.breakdownItem}>
                <AppText style={styles.breakdownLabel}>Waste:</AppText>
                <AppText style={styles.breakdownValue}>
                  {((parseFloat(waste) || 0) * EMISSION_FACTORS.waste).toFixed(2)} kg
                </AppText>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.white,
    textAlign: 'center',
  },
  inputSection: {
    backgroundColor: colors.accent,
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },
  inputBlock: {
    marginBottom: 15,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  inputLabel: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 8,
    padding: 12,
    color: colors.white,
    fontSize: 14,
    backgroundColor: 'transparent',
  },
  calculateButton: {
    width: '100%',
    marginTop: 10,
  },
  resultCard: {
    backgroundColor: colors.accent,
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
    marginLeft: 10,
  },
  resultValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  resultSubtext: {
    fontSize: 12,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.8,
  },
  progressContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  progressTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  progressLabel: {
    fontSize: 12,
    color: colors.white,
    marginTop: 4,
  },
  emissionBreakdown: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: colors.white,
    opacity: 0.5,
  },
  breakdownTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 10,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  breakdownLabel: {
    fontSize: 13,
    color: colors.white,
  },
  breakdownValue: {
    fontSize: 13,
    color: colors.secondary,
    fontWeight: 'bold',
  },
  creditsEarnedSection: {
    marginTop: 20,
    marginBottom: 20,
    padding: 15,
    backgroundColor: colors.primary,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  creditsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  creditsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.secondary,
    marginLeft: 8,
  },
  creditsInfo: {
    marginTop: 8,
  },
  creditsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  creditsLabel: {
    fontSize: 13,
    color: colors.white,
    opacity: 0.9,
  },
  creditsValue: {
    fontSize: 13,
    color: colors.secondary,
    fontWeight: 'bold',
  },
});

