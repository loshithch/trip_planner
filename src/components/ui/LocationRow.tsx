import { AppColors } from "@/constants/colors";
import type { Location } from "@/constants/mock-data";
import { FontFamily, FontSize } from "@/constants/typography";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface LocationRowProps {
  location: Location;
  onPress: (location: Location) => void;
}

function LocationIcon({ type }: { type: Location["type"] }) {
  const icon =
    type === "home" || type === "work"
      ? require("../../../assets/images/hm.png")
      : require("../../../assets/images/clck.png");

  return (
    <Image
      source={icon}
      style={{
        width: 20,
        height: 20,
      }}
      resizeMode="contain"
    />
  );
}

export function LocationRow({ location, onPress }: LocationRowProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(location)}
      activeOpacity={0.7}
    >
      <LocationIcon type={location.type} />
      <View style={styles.textContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {location.name}
        </Text>
        <Text style={styles.address} numberOfLines={1}>
          {location.address}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: AppColors.surface,
    gap: 14,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  iconText: {
    fontSize: 18,
    color: AppColors.textSecondary,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.semibold,
    color: AppColors.textPrimary,
    marginBottom: 2,
  },
  address: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.regular,
    color: AppColors.textSecondary,
  },
});
