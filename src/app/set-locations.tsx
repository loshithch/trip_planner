import { LocationRow } from "@/components/ui/LocationRow";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { AppColors } from "@/constants/colors";
import type { Location } from "@/constants/mock-data";
import { SUGGESTED_LOCATIONS } from "@/constants/mock-data";
import { FontFamily, FontSize } from "@/constants/typography";
import { useTrip } from "@/context/TripContext";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SelectionMode = "pickup" | "dropoff";

export default function SetLocationsScreen() {
  const { pickup, dropoff, setPickup, setDropoff, swapLocations } = useTrip();
  const [mode, setMode] = useState<SelectionMode>("pickup");
  const [searchText, setSearchText] = useState("");

  const filteredLocations = SUGGESTED_LOCATIONS.filter((loc) =>
    searchText.trim()
      ? loc.name.toLowerCase().includes(searchText.toLowerCase()) ||
        loc.address.toLowerCase().includes(searchText.toLowerCase())
      : true,
  );

  const hasNoResults = searchText.trim() && filteredLocations.length === 0;

  const handleSelectLocation = (location: Location) => {
    if (mode === "pickup") {
      setPickup(location);
      setMode("dropoff");
    } else {
      setDropoff(location);
    }
    setSearchText("");
  };

  const handleClearPickup = () => setPickup(null);
  const handleClearDropoff = () => setDropoff(null);

  const canProceed = pickup !== null && dropoff !== null;

  const handleNext = () => {
    if (canProceed) {
      router.push("/trip-ready");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Where are you going?</Text>
          <Text style={styles.headerSubtitle}>
            Step 1 of 2 · Set pickup and drop-off
          </Text>
        </View>
      </View>

      {/* Location selector card */}
      <View style={styles.locationCard}>
        {/* Pickup row */}
        <TouchableOpacity
          style={[styles.locationRow, mode === "pickup" && styles.activeRow]}
          onPress={() => setMode("pickup")}
          activeOpacity={0.85}
        >
          <View style={styles.dotColumn}>
            <View style={styles.pickupDot} />
            <View style={styles.verticalLine} />
          </View>
          <View style={styles.locationTextBlock}>
            <Text
              style={[
                styles.rowLabel,
                mode === "pickup" && styles.activeLabelPickup,
              ]}
            >
              Pickup
            </Text>
            {mode === "pickup" && pickup === null ? (
              <TextInput
                style={styles.locationInput}
                placeholder="Choose a starting point"
                placeholderTextColor={AppColors.textPlaceholder}
                value={searchText}
                onChangeText={setSearchText}
                autoFocus
              />
            ) : (
              <Text
                style={[
                  styles.locationValue,
                  !pickup && styles.locationPlaceholder,
                ]}
                numberOfLines={1}
              >
                {pickup ? pickup.name : "Choose a starting point"}
              </Text>
            )}
          </View>
          <View style={styles.rowActions}>
            {pickup && (
              <TouchableOpacity
                onPress={handleClearPickup}
                style={styles.clearBtn}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={styles.clearIcon}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>

        {/* Swap button */}
        <TouchableOpacity
          style={styles.swapButton}
          onPress={swapLocations}
          activeOpacity={0.7}
        >
          <Text style={styles.swapIcon}>⇅</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Drop-off row */}
        <TouchableOpacity
          style={[styles.locationRow, mode === "dropoff" && styles.activeRow]}
          onPress={() => setMode("dropoff")}
          activeOpacity={0.85}
        >
          <View style={styles.dotColumn}>
            <View style={styles.dropoffDot} />
          </View>
          <View style={styles.locationTextBlock}>
            <Text
              style={[
                styles.rowLabel,
                mode === "dropoff" && styles.activeLabelDropoff,
              ]}
            >
              Drop-off
            </Text>
            {mode === "dropoff" && dropoff === null ? (
              <TextInput
                style={styles.locationInput}
                placeholder="Choose a destination"
                placeholderTextColor={AppColors.textPlaceholder}
                value={searchText}
                onChangeText={setSearchText}
                autoFocus={mode === "dropoff"}
              />
            ) : (
              <Text
                style={[
                  styles.locationValue,
                  !dropoff && styles.locationPlaceholder,
                ]}
                numberOfLines={1}
              >
                {dropoff ? dropoff.name : "Choose a destination"}
              </Text>
            )}
          </View>
          <View style={styles.rowActions}>
            {dropoff && (
              <TouchableOpacity
                onPress={handleClearDropoff}
                style={styles.clearBtn}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={styles.clearIcon}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Action buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
          <Image
            source={require("../../assets/images/curnt.png")}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
          <Text style={styles.actionLabel}>Use current</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
          <Image
            source={require("../../assets/images/picmap.png")}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
          <Text style={styles.actionLabel}>Pick on map</Text>
        </TouchableOpacity>
      </View>

      {/* Suggestions list */}
      <View style={styles.suggestionsHeader}>
        <Text style={styles.suggestionsTitle}>
          {mode === "pickup" ? "Set as pickup" : "Set as drop-off"}
        </Text>
      </View>

      <ScrollView
        style={styles.list}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {hasNoResults ? (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>
              No saved places match that. Keep typing to use it as a custom
              address.
            </Text>
          </View>
        ) : (
          filteredLocations.map((loc) => (
            <LocationRow
              key={loc.id}
              location={loc}
              onPress={handleSelectLocation}
            />
          ))
        )}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Bottom action */}
      <View style={styles.footer}>
        <PrimaryButton
          label="Next"
          onPress={handleNext}
          disabled={!canProceed}
          style={styles.nextButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    gap: 8,
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  backArrow: {
    fontSize: 28,
    color: AppColors.textPrimary,
    lineHeight: 32,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: FontSize.xxl,
    fontFamily: FontFamily.bold,
    color: AppColors.textPrimary,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.regular,
    color: AppColors.textSecondary,
    marginTop: 4,
  },
  locationCard: {
    marginHorizontal: 16,
    backgroundColor: AppColors.surface,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    position: "relative",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 6,
    gap: 12,
    borderRadius: 8,
    paddingHorizontal: 4,
  },
  activeRow: {
    backgroundColor: "transparent",
  },
  dotColumn: {
    alignItems: "center",
    paddingTop: 18,
    width: 16,
    gap: 2,
  },
  pickupDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: AppColors.pickupDot,
  },
  verticalLine: {
    width: 1.5,
    height: 20,
    backgroundColor: AppColors.border,
    marginTop: 4,
  },
  dropoffDot: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: AppColors.dropoffDot,
  },
  locationTextBlock: {
    flex: 1,
    paddingTop: 2,
  },
  rowLabel: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.medium,
    color: AppColors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  activeLabelPickup: {
    color: AppColors.primary,
  },
  activeLabelDropoff: {
    color: AppColors.primary,
  },
  locationValue: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.medium,
    color: AppColors.textPrimary,
    paddingVertical: 6,
  },
  locationPlaceholder: {
    color: AppColors.textPlaceholder,
    fontFamily: FontFamily.regular,
  },
  locationInput: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.regular,
    color: AppColors.textPrimary,
    paddingVertical: 6,
    paddingHorizontal: 0,
  },
  rowActions: {
    paddingTop: 14,
    alignItems: "center",
  },
  clearBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: AppColors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  clearIcon: {
    fontSize: 10,
    color: AppColors.textSecondary,
    fontFamily: FontFamily.bold,
  },
  swapButton: {
    position: "absolute",
    right: 16,
    top: "50%",
    marginTop: -18,
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: AppColors.background,
    borderWidth: 1,
    borderColor: AppColors.border,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  swapIcon: {
    fontSize: 16,
    color: AppColors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: AppColors.border,
    marginVertical: 4,
    marginLeft: 28,
  },
  actionButtons: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 12,
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: AppColors.surface,
    borderRadius: 12,
    paddingVertical: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  actionIcon: {
    fontSize: 16,
  },
  actionLabel: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.medium,
    color: AppColors.textPrimary,
  },
  suggestionsHeader: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
  },
  suggestionsTitle: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.medium,
    color: AppColors.textSecondary,
  },
  list: {
    flex: 1,
  },
  noResults: {
    marginHorizontal: 16,
    backgroundColor: AppColors.surface,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  noResultsText: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.regular,
    color: AppColors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: AppColors.background,
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: Platform.OS === "ios" ? 32 : 24,
    borderTopWidth: 1,
    borderTopColor: AppColors.border,
  },
  nextButton: {
    width: "100%",
  },
});
