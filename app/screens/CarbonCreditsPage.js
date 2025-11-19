/**
 * Carbon Credits Page
 * Converts user's carbon emissions into carbon credits according to Indian Government standards
 */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';

// Import custom components
import Screen from './Screen';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import colors from '../config/colors';

const STORAGE_KEY = 'carbon_emissions_data';
const INDIAN_AVERAGE_YEARLY = 4.5; // tons CO2 per year
const CCU_PER_TON = 1; // 1 Carbon Credit Unit = 1 ton CO2
const POINTS_PER_CCU = 100; // Redeemable points per CCU

// Government carbon credit providers
const GOVT_PROVIDERS = [
  {
    id: 1,
    name: 'India Carbon Market (ICM)',
    description: 'Govt Regulated Market',
    icon: 'building',
  },
  {
    id: 2,
    name: 'Bureau of Energy Efficiency (BEE)',
    description: 'Energy Efficiency Programs',
    icon: 'bolt',
  },
  {
    id: 3,
    name: 'Ministry of Power – Carbon Trading Portal',
    description: 'Official Carbon Trading',
    icon: 'landmark',
  },
  {
    id: 4,
    name: 'CDM / VCS / Gold Standard',
    description: 'International Export Programs',
    icon: 'globe',
  },
];

export default function CarbonCreditsPage() {
  const [emissionsData, setEmissionsData] = useState([]);
  const [lifetimeEmissions, setLifetimeEmissions] = useState(0);
  const [emissionsReduced, setEmissionsReduced] = useState(0);
  const [carbonCredits, setCarbonCredits] = useState(0);
  const [redeemablePoints, setRedeemablePoints] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadEmissionsData();
  }, []);

  // Load emissions data from AsyncStorage
  const loadEmissionsData = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        setEmissionsData(Array.isArray(parsed) ? parsed : [parsed]);

        // Calculate lifetime emissions (sum of all daily emissions)
        const total = Array.isArray(parsed)
          ? parsed.reduce((sum, entry) => sum + (entry.totalEmissions || 0), 0)
          : parsed.totalEmissions || 0;

        setLifetimeEmissions(total);

        // Calculate emissions reduced (compared to Indian average)
        // Assuming we're comparing daily average
        const indianAvgDaily = (INDIAN_AVERAGE_YEARLY * 1000) / 365; // Convert tons to kg and divide by days
        const entries = Array.isArray(parsed) ? parsed.length : 1;
        const expectedEmissions = indianAvgDaily * entries;
        const reduced = Math.max(0, expectedEmissions - total);
        setEmissionsReduced(reduced);

        // Convert to carbon credits (1 CCU = 1 ton CO2 = 1000 kg)
        const credits = reduced / 1000; // Convert kg to tons
        setCarbonCredits(credits);

        // Calculate redeemable points
        const points = credits * POINTS_PER_CCU;
        setRedeemablePoints(points);
      }
    } catch (error) {
      console.error('Error loading emissions data:', error);
    }
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer}>
          <FontAwesome5 name="coins" size={28} color={colors.secondary} />
          <AppText style={styles.title}>Carbon Credits</AppText>
          <AppText style={styles.subtitle}>
            Convert your emissions into carbon credits
          </AppText>
        </View>

        {/* Lifetime Emissions Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <FontAwesome5 name="history" size={20} color={colors.secondary} />
            <AppText style={styles.cardTitle}>Lifetime Emissions</AppText>
          </View>
          <AppText style={styles.cardValue}>
            {(lifetimeEmissions / 1000).toFixed(2)} tons CO₂
          </AppText>
          <AppText style={styles.cardSubtext}>
            {lifetimeEmissions.toFixed(2)} kg CO₂ total
          </AppText>
        </View>

        {/* Emissions Reduced Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <FontAwesome5 name="leaf" size={20} color={colors.secondary} />
            <AppText style={styles.cardTitle}>Emissions Reduced</AppText>
          </View>
          <AppText style={styles.cardValue}>
            {(emissionsReduced / 1000).toFixed(2)} tons CO₂
          </AppText>
          <AppText style={styles.cardSubtext}>
            Compared to Indian average ({INDIAN_AVERAGE_YEARLY} tons/year)
          </AppText>
        </View>

        {/* Carbon Credits Card */}
        <View style={[styles.card, styles.highlightCard]}>
          <View style={styles.cardHeader}>
            <FontAwesome5 name="certificate" size={20} color={colors.secondary} />
            <AppText style={styles.cardTitle}>Carbon Credits Earned</AppText>
          </View>
          <AppText style={styles.cardValueLarge}>
            {carbonCredits.toFixed(3)} CCU
          </AppText>
          <AppText style={styles.cardSubtext}>
            1 CCU = 1 ton CO₂ avoided
          </AppText>
        </View>

        {/* Redeemable Points Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <FontAwesome5 name="gift" size={20} color={colors.secondary} />
            <AppText style={styles.cardTitle}>Redeemable Points</AppText>
          </View>
          <AppText style={styles.cardValueLarge}>
            {redeemablePoints.toFixed(0)} pts
          </AppText>
          <AppText style={styles.cardSubtext}>
            {POINTS_PER_CCU} points per CCU
          </AppText>
        </View>

        {/* Government Providers Button */}
        <AppButton
          title="Connect to Govt Carbon Credit Providers"
          onPress={() => setModalVisible(true)}
          color="secondary"
          icon="link"
          iconColor={colors.white}
          style={styles.ctaButton}
        />

        {/* Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoHeader}>
            <FontAwesome5 name="info-circle" size={16} color={colors.secondary} />
            <AppText style={styles.infoTitle}>About Carbon Credits</AppText>
          </View>
          <AppText style={styles.infoText}>
            Carbon Credit Units (CCU) are issued based on emissions reduced compared to
            national averages. These credits can be traded on government-regulated markets
            like the India Carbon Market (ICM) and the Carbon Credit Trading Scheme 2023.
          </AppText>
        </View>
      </ScrollView>

      {/* Modal for Government Providers */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <AppText style={styles.modalTitle}>Government Carbon Credit Providers</AppText>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <FontAwesome5 name="times" size={20} color={colors.white} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.providerList}>
              {GOVT_PROVIDERS.map((provider) => (
                <View key={provider.id} style={styles.providerCard}>
                  <View style={styles.providerIconContainer}>
                    <FontAwesome5
                      name={provider.icon}
                      size={24}
                      color={colors.secondary}
                    />
                  </View>
                  <View style={styles.providerInfo}>
                    <AppText style={styles.providerName}>{provider.name}</AppText>
                    <AppText style={styles.providerDescription}>
                      {provider.description}
                    </AppText>
                  </View>
                  <FontAwesome5
                    name="chevron-right"
                    size={16}
                    color={colors.white}
                    style={styles.chevron}
                  />
                </View>
              ))}
            </ScrollView>

            <View style={styles.modalFooter}>
              <AppButton
                title="Close"
                onPress={() => setModalVisible(false)}
                color="accent"
                icon="times"
                iconColor={colors.white}
                style={styles.modalCloseButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
    marginTop: 10,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.8,
  },
  card: {
    backgroundColor: colors.accent,
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.white,
    opacity: 0.3,
  },
  highlightCard: {
    borderWidth: 2,
    borderColor: colors.secondary,
    opacity: 1,
    backgroundColor: colors.accent,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: 10,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 5,
  },
  cardValueLarge: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 5,
  },
  cardSubtext: {
    fontSize: 12,
    color: colors.white,
    opacity: 0.7,
  },
  ctaButton: {
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
  },
  infoSection: {
    backgroundColor: colors.accent,
    borderRadius: 20,
    padding: 15,
    marginTop: 10,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.secondary,
    marginLeft: 8,
  },
  infoText: {
    fontSize: 13,
    color: colors.white,
    lineHeight: 20,
    opacity: 0.9,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.accent,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    maxHeight: Dimensions.get('window').height * 0.8,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    opacity: 0.3,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.secondary,
    flex: 1,
  },
  closeButton: {
    padding: 5,
  },
  providerList: {
    padding: 20,
  },
  providerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.white,
    opacity: 0.3,
  },
  providerIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 4,
  },
  providerDescription: {
    fontSize: 12,
    color: colors.white,
    opacity: 0.7,
  },
  chevron: {
    marginLeft: 10,
  },
  modalFooter: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  modalCloseButton: {
    width: '100%',
  },
});

