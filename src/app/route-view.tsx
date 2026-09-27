import { MockMap } from "@/components/ui/MockMap";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { AppColors } from "@/constants/colors";
import { MOCK_ROUTE_INFO, MOCK_TURN_BY_TURN } from "@/constants/mock-data";
import { FontFamily, FontSize } from "@/constants/typography";
import { useTrip } from "@/context/TripContext";
import { router } from "expo-router";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TravelMode = "Drive" | "Ride" | "Walk";

export default function RouteViewScreen() {
  const { pickup, dropoff, clearTrip } = useTrip();
  const [mode, setMode] = useState<TravelMode>("Drive");

  const handleStartNavigation = () => {
    alert("Navigation started! Have a safe trip. 🧭");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Map (top portion) */}
      <View style={styles.mapContainer}>
        <MockMap />

        {/* Back button overlay */}
        <SafeAreaView style={styles.mapOverlay} edges={["top"]}>
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButton}
            activeOpacity={0.85}
          >
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>
          {/* Layers button */}
          <TouchableOpacity style={styles.layersButton} activeOpacity={0.85}>
            <Text style={styles.layersIcon}>⧉</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      {/* Bottom sheet */}
      <View style={styles.sheet}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.sheetContent}
        >
          {/* Route summary */}
          <View style={styles.routeSummary}>
            <View>
              <Text style={styles.fastestRoute}>Fastest route</Text>
              <Text style={styles.duration}>{MOCK_ROUTE_INFO.duration}</Text>
            </View>
            <View style={styles.routeMeta}>
              <Text style={styles.distance}>{MOCK_ROUTE_INFO.distance}</Text>
              <Text style={styles.metaDot}> · </Text>
              <Text style={styles.arrivalTime}>
                arrive {MOCK_ROUTE_INFO.arrivalTime}
              </Text>
            </View>
          </View>

          {/* Travel mode tabs */}
          <View style={styles.modeTabs}>
            {(["Drive", "Ride", "Walk"] as TravelMode[]).map((m) => (
              <TouchableOpacity
                key={m}
                style={[styles.modeTab, mode === m && styles.modeTabActive]}
                onPress={() => setMode(m)}
                activeOpacity={0.75}
              >
                <Text
                  style={[
                    styles.modeTabLabel,
                    mode === m && styles.modeTabLabelActive,
                  ]}
                >
                  {m}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.divider} />

          {/* Route stop summary */}
          <View style={styles.stops}>
            <View style={styles.stopRow}>
              <View style={styles.pickupDot} />
              <Text style={styles.stopText} numberOfLines={1}>
                {pickup?.name ?? "Home"} ·{" "}
                {pickup?.address?.split("·")[0]?.trim() ??
                  "Villa 12, Street 840"}
              </Text>
            </View>
            <View style={[styles.stopRow, { marginTop: 10 }]}>
              <View style={styles.dropoffDot} />
              <Text style={styles.stopText} numberOfLines={1}>
                {dropoff?.name ?? "Marina Office Tower"} ·{" "}
                {dropoff?.address?.split("·")[0]?.trim() ??
                  "Level 14, Al Fardan Rd"}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Turn by turn */}
          <Text style={styles.turnByTurnHeader}>Turn by turn</Text>
          <View style={styles.turnList}>
            {MOCK_TURN_BY_TURN.filter((t) => t.distance).map((turn) => (
              <View key={turn.id} style={styles.turnRow}>
                <View style={styles.turnIconContainer}>
                  <Text style={styles.turnIcon}>↰</Text>
                </View>
                <View style={styles.turnInfo}>
                  <Text style={styles.turnInstruction}>{turn.instruction}</Text>
                  <Text style={styles.turnHint}>{turn.hint}</Text>
                </View>
                <Text style={styles.turnDistance}>{turn.distance}</Text>
              </View>
            ))}
          </View>

          {/* Bottom padding for the fixed button */}
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Start navigation button */}
        <View style={styles.navButtonContainer}>
          <PrimaryButton
            label="⊳  Start navigation"
            onPress={handleStartNavigation}
            style={styles.navButton}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  mapContainer: {
    height: "42%",
    position: "relative",
  },
  mapOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  backArrow: {
    fontSize: 24,
    color: AppColors.textPrimary,
    lineHeight: 28,
  },
  layersButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  layersIcon: {
    fontSize: 18,
    color: AppColors.textPrimary,
  },
  sheet: {
    flex: 1,
    backgroundColor: AppColors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
    overflow: "hidden",
  },
  sheetContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  routeSummary: {
    gap: 4,
    marginBottom: 16,
  },
  fastestRoute: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.regular,
    color: AppColors.textSecondary,
  },
  duration: {
    fontSize: FontSize.xxxl,
    fontFamily: FontFamily.bold,
    color: AppColors.textPrimary,
    letterSpacing: -0.5,
  },
  routeMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  distance: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.regular,
    color: AppColors.textSecondary,
  },
  metaDot: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.regular,
    color: AppColors.textSecondary,
  },
  arrivalTime: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.regular,
    color: AppColors.textSecondary,
  },
  modeTabs: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  modeTab: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: AppColors.border,
    backgroundColor: AppColors.surface,
  },
  modeTabActive: {
    borderColor: AppColors.primary,
    backgroundColor: "#FFF8F6",
  },
  modeTabLabel: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.medium,
    color: AppColors.textSecondary,
  },
  modeTabLabelActive: {
    color: AppColors.primary,
    fontFamily: FontFamily.semibold,
  },
  divider: {
    height: 1,
    backgroundColor: AppColors.border,
    marginVertical: 14,
  },
  stops: {
    gap: 4,
  },
  stopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  pickupDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: AppColors.pickupDot,
    flexShrink: 0,
  },
  dropoffDot: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: AppColors.dropoffDot,
    flexShrink: 0,
  },
  stopText: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.medium,
    color: AppColors.textPrimary,
    flex: 1,
  },
  turnByTurnHeader: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.semibold,
    color: AppColors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  turnList: {
    gap: 16,
  },
  turnRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  turnIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: AppColors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  turnIcon: {
    fontSize: 16,
    color: AppColors.textPrimary,
  },
  turnInfo: {
    flex: 1,
  },
  turnInstruction: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.semibold,
    color: AppColors.textPrimary,
    marginBottom: 2,
  },
  turnHint: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.regular,
    color: AppColors.textSecondary,
  },
  turnDistance: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.medium,
    color: AppColors.textSecondary,
    alignSelf: "center",
  },
  navButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 36 : 20,
    paddingTop: 12,
    backgroundColor: AppColors.surface,
    borderTopWidth: 1,
    borderTopColor: AppColors.border,
  },
  navButton: {
    width: "100%",
  },
});
