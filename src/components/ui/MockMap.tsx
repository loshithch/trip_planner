import { AppColors } from "@/constants/colors";
import { FontFamily, FontSize } from "@/constants/typography";
import { StyleSheet, Text, View } from "react-native";

/**
 * MockMap — a static visual representation of a map with a route drawn on it.
 * Used as a placeholder since real map SDKs require native builds.
 */
export function MockMap() {
  return (
    <View style={styles.container}>
      {/* Map background */}
      <View style={styles.mapBg}>
        {/* Water/sea area */}
        <View style={styles.waterArea} />

        {/* Land area with roads */}
        <View style={styles.landArea}>
          {/* Grid of road lines */}
          <View style={[styles.road, styles.roadH, { top: "20%" }]} />
          <View style={[styles.road, styles.roadH, { top: "40%" }]} />
          <View style={[styles.road, styles.roadH, { top: "60%" }]} />
          <View style={[styles.road, styles.roadH, { top: "80%" }]} />
          <View style={[styles.road, styles.roadV, { left: "20%" }]} />
          <View style={[styles.road, styles.roadV, { left: "40%" }]} />
          <View style={[styles.road, styles.roadV, { left: "60%" }]} />
          <View style={[styles.road, styles.roadV, { left: "80%" }]} />

          {/* Route line */}
          <View style={styles.routeContainer}>
            <View style={styles.routeLine} />
          </View>

          {/* Origin marker */}
          <View style={styles.originMarker}>
            <View style={styles.originInner}>
              <Text style={styles.markerText}>↗</Text>
            </View>
          </View>

          {/* Destination pin */}
          <View style={styles.destinationMarker}>
            <Text style={styles.pinEmoji}>📍</Text>
          </View>
        </View>

        {/* Alert badge */}
        <View style={styles.alertBadge}>
          <Text style={styles.alertIcon}>⚠</Text>
          <Text style={styles.alertText}>Heavy traffic near the marina</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
  mapBg: {
    flex: 1,
    backgroundColor: "#D4E6D4",
    position: "relative",
  },
  waterArea: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "50%",
    height: "60%",
    backgroundColor: "#A8C8E8",
    borderBottomLeftRadius: 80,
  },
  landArea: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "#E8E4D8",
    overflow: "hidden",
  },
  road: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    opacity: 0.7,
  },
  roadH: {
    left: 0,
    right: 0,
    height: 2,
  },
  roadV: {
    top: 0,
    bottom: 0,
    width: 2,
  },
  routeContainer: {
    position: "absolute",
    top: "25%",
    left: "15%",
    right: "25%",
    height: 3,
  },
  routeLine: {
    flex: 1,
    backgroundColor: AppColors.primary,
    borderRadius: 2,
    opacity: 0.9,
  },
  originMarker: {
    position: "absolute",
    bottom: "20%",
    left: "12%",
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: AppColors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  originInner: {
    alignItems: "center",
    justifyContent: "center",
  },
  markerText: {
    color: AppColors.white,
    fontSize: 16,
    fontFamily: FontFamily.bold,
  },
  pinEmoji: {
    fontSize: 28,
  },
  alertBadge: {
    position: "absolute",
    bottom: 28,
    left: 16,
    right: 16,
    backgroundColor: "rgba(26, 26, 46, 0.88)",
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  alertIcon: {
    fontSize: 14,
    color: AppColors.white,
  },
  alertText: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.medium,
    color: AppColors.white,
  },
  destinationMarker: {
    position: "absolute",
    top: "15%",
    right: "25%",
  },
});
