import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { AppColors } from "@/constants/colors";
import { MOCK_ROUTE_INFO } from "@/constants/mock-data";
import { FontFamily, FontSize } from "@/constants/typography";
import { useTrip } from "@/context/TripContext";
import { router } from "expo-router";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TripReadyScreen() {
  const { pickup, dropoff, clearTrip } = useTrip();

  const handleStartRoute = () => {
    router.push("/route-view");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Your trip is ready</Text>
          <Text style={styles.headerSubtitle}>
            Step 2 of 2 · Review and start
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Route summary card */}
        <View style={styles.routeCard}>
          <Text style={styles.cardLabel}>Trip overview</Text>

          {/* Pickup */}
          <View style={styles.locationRow}>
            <View style={styles.dotColumn}>
              <View style={styles.pickupDot} />
              <View style={styles.vertLine} />
            </View>
            <View style={styles.locationInfo}>
              <Text style={styles.locLabel}>Pickup</Text>
              <Text style={styles.locName}>{pickup?.name ?? "—"}</Text>
              <Text style={styles.locAddress}>{pickup?.address ?? ""}</Text>
            </View>
          </View>

          <View style={styles.separator} />

          {/* Drop-off */}
          <View style={styles.locationRow}>
            <View style={styles.dotColumn}>
              <View style={styles.dropoffDot} />
            </View>
            <View style={styles.locationInfo}>
              <Text style={styles.locLabel}>Drop-off</Text>
              <Text style={styles.locName}>{dropoff?.name ?? "—"}</Text>
              <Text style={styles.locAddress}>{dropoff?.address ?? ""}</Text>
            </View>
          </View>
        </View>

        {/* Route stats */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{MOCK_ROUTE_INFO.duration}</Text>
            <Text style={styles.statLabel}>Est. time</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{MOCK_ROUTE_INFO.distance}</Text>
            <Text style={styles.statLabel}>Distance</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{MOCK_ROUTE_INFO.arrivalTime}</Text>
            <Text style={styles.statLabel}>Arrival</Text>
          </View>
        </View>

        {/* Info notice */}
        <View style={styles.noticeCard}>
          <Text style={styles.noticeIcon}>ℹ</Text>
          <Text style={styles.noticeText}>
            Route is calculated based on current traffic conditions. Times may
            vary.
          </Text>
        </View>

        {/* Edit locations link */}
        <TouchableOpacity
          style={styles.editLink}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Text style={styles.editLinkText}>✏ Edit locations</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <PrimaryButton
          label="View route"
          onPress={handleStartRoute}
          style={styles.routeButton}
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
    gap: 16,
  },
  routeCard: {
    backgroundColor: AppColors.surface,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardLabel: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.semibold,
    color: AppColors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: "row",
    gap: 14,
  },
  dotColumn: {
    alignItems: "center",
    width: 16,
    paddingTop: 16,
    gap: 4,
  },
  pickupDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: AppColors.pickupDot,
  },
  vertLine: {
    width: 1.5,
    height: 36,
    backgroundColor: AppColors.border,
    marginTop: 4,
  },
  dropoffDot: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: AppColors.dropoffDot,
  },
  locationInfo: {
    flex: 1,
    paddingBottom: 8,
  },
  locLabel: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.medium,
    color: AppColors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  locName: {
    fontSize: FontSize.md,
    fontFamily: FontFamily.semibold,
    color: AppColors.textPrimary,
    marginBottom: 2,
  },
  locAddress: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.regular,
    color: AppColors.textSecondary,
    lineHeight: 18,
  },
  separator: {
    height: 1,
    backgroundColor: AppColors.border,
    marginVertical: 12,
    marginLeft: 28,
  },
  statsCard: {
    flexDirection: "row",
    backgroundColor: AppColors.surface,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.bold,
    color: AppColors.textPrimary,
  },
  statLabel: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.regular,
    color: AppColors.textSecondary,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: AppColors.border,
  },
  noticeCard: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#FFF8F6",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#FDDDD4",
    alignItems: "flex-start",
  },
  noticeIcon: {
    fontSize: 16,
    color: AppColors.primary,
  },
  noticeText: {
    flex: 1,
    fontSize: FontSize.sm,
    fontFamily: FontFamily.regular,
    color: AppColors.textSecondary,
    lineHeight: 20,
  },
  editLink: {
    alignItems: "center",
    paddingVertical: 8,
  },
  editLinkText: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.semibold,
    color: AppColors.primary,
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
  routeButton: {
    width: "100%",
  },
});
