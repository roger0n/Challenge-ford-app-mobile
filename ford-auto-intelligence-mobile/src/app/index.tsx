import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";

import {
  useEffect,
  useState
} from "react";

import api from "../services/api";

import { router } from "expo-router";

interface Vehicle {
  id: number;
  version: string;
}

export default function Home() {

  const [vehicles, setVehicles] =
    useState<Vehicle[]>([]);

  async function loadVehicles() {

    try {

      const response =
        await api.get("/vehicles");

      setVehicles(response.data);

    } catch (error) {

      console.log(error);
    }
  }

  useEffect(() => {

    loadVehicles();

  }, []);

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Ford Auto Intelligence
      </Text>

      <TouchableOpacity
      style={styles.compareButton}
      onPress={() => router.push("/compare")}
>

      <Text style={styles.compareButtonText}>
        Comparar Veículos
      </Text>

     </TouchableOpacity>

      <FlatList

        data={vehicles}

        keyExtractor={(item) =>
          item.id.toString()
        }

        renderItem={({ item }) => (

          <TouchableOpacity

            style={styles.card}

            onPress={() =>
              router.push({
                pathname: "/vehicle/[id]",
                params: {
                  id: item.id.toString()
                }
              })
            }
          >

            <Text style={styles.cardTitle}>
              {item.version}
            </Text>

          </TouchableOpacity>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: "#0A0F1C",

    paddingTop: 60,

    paddingHorizontal: 20
  },

  title: {

    fontSize: 28,

    fontWeight: "bold",

    color: "#FFFFFF",

    marginBottom: 20
  },

  card: {

    backgroundColor: "#111827",

    padding: 20,

    borderRadius: 14,

    marginBottom: 15
  },

  cardTitle: {

    color: "#FFFFFF",

    fontSize: 16,

    fontWeight: "600"
  },

  compareButton: {

  backgroundColor: "#2563EB",

  padding: 16,

  borderRadius: 12,

  marginBottom: 20,

  alignItems: "center"
},

compareButtonText: {

  color: "#FFFFFF",

  fontWeight: "bold",

  fontSize: 16
}
});