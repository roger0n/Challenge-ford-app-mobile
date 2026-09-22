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

import AsyncStorage from "@react-native-async-storage/async-storage";



import api from "../services/api";

import { router } from "expo-router";

interface Vehicle {
  id: number;
  version: string;
}

export default function Home() {

  const [vehicles, setVehicles] =
    useState<Vehicle[]>([]);

  const [userName, setUserName] =
    useState("");

  async function checkSession() {

  const session =
    await AsyncStorage.getItem(
      "userSession"
    );

  if (!session) {

    router.replace("/login");

    return false;
  }

  const user =
    JSON.parse(session);

  setUserName(
    user.name
  );

  return true;
} 
  
  
    async function loadVehicles() {

  try {

    const response =
      await api.get("/vehicles");

    const apiVehicles =
      response.data;

    const saved =
      await AsyncStorage.getItem(
        "vehicles"
      );

    if (saved) {

      const savedVehicles =
        JSON.parse(saved);

      const merged = [
        ...apiVehicles
      ];

      savedVehicles.forEach(
        (savedVehicle: Vehicle) => {

          const alreadyExists =
            merged.some(
              (vehicle) =>
                vehicle.version ===
                savedVehicle.version
            );

          if (!alreadyExists) {

            merged.push(
              savedVehicle
            );
          }
        }
      );

      setVehicles(merged);

      return;
    }

    setVehicles(apiVehicles);

  } catch (error) {

    console.log(error);
  }
}

 useEffect(() => {

  async function initialize() {

    const logged =
      await checkSession();

    if (logged) {
      await loadVehicles();
    }
  }

  initialize();

}, []);

async function handleLogout() {

  await AsyncStorage.removeItem(
    "userSession"
  );

  router.replace("/login");
}

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Ford Auto Intelligence
      </Text>

      <Text
      style={{
      color: "#9CA3AF",
      fontSize: 16,
      marginBottom: 20
      }}>
        Olá, {userName}!
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

        ListFooterComponent={

    <TouchableOpacity
      onPress={handleLogout}
      style={{
        backgroundColor: "#DC2626",
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 15,
        marginBottom: 30
      }}
    >

      <Text
        style={{
          color: "#FFFFFF",
          fontSize: 16,
          fontWeight: "bold"
        }}
      >
        Sair
      </Text>

    </TouchableOpacity>

  }
      />
    </View>
  );
}

