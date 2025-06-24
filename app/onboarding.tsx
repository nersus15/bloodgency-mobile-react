import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Slide {
  key: string;
  title: string;
  desc: string;
  image?: ImageSourcePropType;
}

const slides: Slide[] = [
  {
    key: "1",
    title: "Selamat Datang",
    desc: "Aplikasi donor darah dengan misi kemanusiaan.",
    image: require("@/assets/images/bro1.png"),
  },
  {
    key: "2",
    title: "Temukan Pendonor",
    desc: "Cari dan temukan pendonor darah dengan mudah.",
    image: require("@/assets/images/bro1.png"),
  },
  {
    key: "3",
    title: "Bantu Sesama",
    desc: "Jadilah pahlawan dengan satu tetes darahmu.",
  },
];

const { width } = Dimensions.get("window");

export default function Onboarding(): JSX.Element {
  const router = useRouter();
  const flatListRef = useRef<FlatList<Slide>>(null);
  const [index, setIndex] = useState<number>(0);

  const next = () => {
    if (index < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: index + 1 });
    } else {
      router.replace("/login");
    }
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / width);
    setIndex(idx);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        onMomentumScrollEnd={handleScroll}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
          </View>
        )}
      />

      <View style={styles.dots}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { backgroundColor: i === index ? "#e74c3c" : "#ccc" },
            ]}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={next}>
        <Text style={{ color: "white" }}>
          {index === slides.length - 1 ? "Mulai" : "Lanjut"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    width,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  desc: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginTop: 10,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: "#e74c3c",
    padding: 14,
    marginHorizontal: 40,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 40,
  },
});
