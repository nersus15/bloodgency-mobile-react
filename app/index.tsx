import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("onboarding"); // ganti screen tanpa bisa kembali
    }, 5000); // 5 detik

    return () => clearTimeout(timer); // bersihkan timer jika unmount
  });

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/splash-screen.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <Image
          source={require("@/assets/icons/logo-blood.png")}
          style={styles.logo}
        />
        <Text style={styles.text}>Dare To Donate</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center", // untuk posisi vertikal
    alignItems: "center", // untuk posisi horizontal
  },
  logo: {
    width: 114,
    height: 171,
    marginBottom: 20,
  },
  text: {
    fontFamily: "poppins",
    color: "white",
    fontSize: 33,
    fontWeight: "semibold",
    textShadowColor: "#000",
  },
});
