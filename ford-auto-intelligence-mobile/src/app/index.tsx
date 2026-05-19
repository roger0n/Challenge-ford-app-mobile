import {
  View,
  Text,
  FlatList,
  TouchableOpacity
} from "react-native";

import styles from "../styles/index.styles";

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

