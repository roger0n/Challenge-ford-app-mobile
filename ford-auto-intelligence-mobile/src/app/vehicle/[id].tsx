import {
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../../styles/[id].styles";

import {
  useLocalSearchParams,
  router
} from "expo-router";

import {
  useEffect,
  useState
} from "react";

import api from "../../services/api";

export default function VehicleDetails() {

  const { id } =
    useLocalSearchParams();

  const [vehicle, setVehicle] =
    useState<any>(null);

  async function loadVehicle() {

  try {

    const saved =
      await AsyncStorage.getItem(
        "vehicles"
      );

    if (saved) {

      const vehicles =
        JSON.parse(saved);

      const localVehicle =
        vehicles.find(
          (vehicle: any) =>
            vehicle.id.toString() ===
            id?.toString()
        );

      if (localVehicle) {

        setVehicle(
          localVehicle
        );

        return;
      }
    }

    const response =
      await api.get(
        `/vehicles/${id}`
      );

    setVehicle(
      response.data
    );

  } catch (error) {

    console.log(error);
  }
}

  useEffect(() => {

    loadVehicle();

  }, []);

  if (!vehicle) {

    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>
          Carregando...
        </Text>
      </View>
    );
  }

  return (

    <ScrollView
      style={styles.container}
    >

      <TouchableOpacity
  style={styles.backButton}
  onPress={() => router.push("/")}
>

  <Text style={styles.backText}>
    ← Voltar
  </Text>

</TouchableOpacity>

      <Text style={styles.brand}>
        {vehicle.brand}
        </Text>
        <Text style={styles.model}>
          {vehicle.model}
        </Text>
        <Text style={styles.title}>
          {vehicle.version}
        </Text>

      {Object.entries(
        vehicle.specifications
      ).map(([key, value]) => (

        <View
          key={key}
          style={styles.specCard}
        >

          <Text style={styles.specName}>
            {key}
          </Text>

          <Text style={styles.specValue}>
            {
            value === undefined ||
            value === null ||
            value === "" ||
            value === "X"
            
            ? "N/A"
            
            : String(value)
            }
          </Text>

        </View>
      ))}

    </ScrollView>
  );
}

