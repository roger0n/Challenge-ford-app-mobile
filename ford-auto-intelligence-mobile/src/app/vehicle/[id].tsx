import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from "react-native";

import {
  useLocalSearchParams
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

      const response =
        await api.get(`/vehicles/${id}`);

      setVehicle(response.data);

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
            value === 0 ||
            value === undefined ||
            value === null
            
            ? "N/A"
            
            : String(value)
            }
          </Text>

        </View>
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: "#0A0F1C",

    padding: 20
  },

  brand: {

  color: "#60A5FA",

  fontSize: 18,

  fontWeight: "600",

  marginTop: 40
},

model: {

  color: "#FFFFFF",

  fontSize: 28,

  fontWeight: "bold",

  marginBottom: 10
},

  title: {

    color: "#FFFFFF",

    fontSize: 24,

    fontWeight: "bold",

    marginBottom: 20,

    marginTop: 40
  },

  specCard: {

    backgroundColor: "#111827",

    padding: 16,

    borderRadius: 12,

    marginBottom: 12
  },

  specName: {

    color: "#9CA3AF",

    fontSize: 14,

    marginBottom: 6
  },

  specValue: {

    color: "#FFFFFF",

    fontSize: 16,

    fontWeight: "600"
  },

  loading: {

    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: "#0A0F1C"
  },

  loadingText: {

    color: "#FFFFFF",

    fontSize: 18
  }
});