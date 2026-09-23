import { useEffect, useState } from "react";

import {
  Platform,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput
} from "react-native";

import styles from "../styles/compare.styles";

import { File } from "expo-file-system";


import {
  router
} from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../services/api";

import { specCategories } from "../utils/specCategories";

type Vehicle = {

  id: number;

  brand: string;

  model: string;

  version: string;

  specifications: Record<string, any>;
};

export default function Compare() {

  const [vehicles, setVehicles] =
    useState<Vehicle[]>([]);
  
    async function saveVehicles(vehicleList: Vehicle[])
    {try { await AsyncStorage.setItem(
      "vehicles",
      JSON.stringify(vehicleList)
    );
  } catch {
    console.log("Erro ao salvar");
  }}


  const [vehicleA, setVehicleA] =
    useState<Vehicle | null>(null);

  const [vehicleB, setVehicleB] =
    useState<Vehicle | null>(null);
  
  const [showOnlyDifferences, setShowOnlyDifferences] =
    useState(false);

  const [search, setSearch] =
    useState("");
  
  const [selectedSpecs,setSelectedSpecs] =
    useState<string[]>([]);

 async function loadVehicles() {

  const response =
    await api.get("/vehicles");

  setVehicles(response.data);

  saveVehicles(
    response.data
  );
}

async function loadSavedVehicles() {

  try {

    const saved =
      await AsyncStorage.getItem(
        "vehicles"
      );

    if (saved) {

      setVehicles(
        JSON.parse(saved)
      );

      return;
    }

    loadVehicles();

  } catch {

    loadVehicles();

  }
}

useEffect(() => {

  loadSavedVehicles();

}, []);

function processJson(content: string) {
  const json = JSON.parse(content);

  if (!Array.isArray(json)) {
    alert(
      "O JSON deve conter uma lista de veículos."
    );
    return;
  }

  setVehicles((current) => {
    const merged = [
      ...current,
      ...json.filter(
        (newVehicle: Vehicle) =>
          !current.some(
            (existing) =>
              existing.version ===
              newVehicle.version
          )
      )
    ];

    saveVehicles(merged);

    return merged;
  });

  alert(
    "Veículos importados com sucesso!"
  );
}

  async function importJson() {
  try {
    let content: string;

    if (Platform.OS === "web") {
      const input = document.createElement("input");

      input.type = "file";
      input.accept = "application/json,.json";

      input.onchange = async () => {
        try {
          const selectedFile = input.files?.[0];

          if (!selectedFile) {
            return;
          }

          const webContent =
            await selectedFile.text();

          processJson(webContent);

        } catch (error) {
          console.log(
            "Erro ao importar JSON no Web:",
            error
          );

          alert(
            "Não foi possível importar o JSON."
          );
        }
      };

      input.click();

      return;
    }

    const result = await File.pickFileAsync({
      mimeTypes: ["application/json"],
      multipleFiles: false
    });

    if (result.canceled) {
      return;
    }

    const file = result.result;

    content = await file.text();

    processJson(content);

  } catch (error) {
    console.log(
      "Erro ao importar JSON:",
      error
    );

    alert(
      "Não foi possível importar o JSON."
    );
  }
}

  const specs =
    vehicleA?.specifications
      ? Object.keys(vehicleA.specifications)
      : [];

  function calculateCategoryWinner(
  specsList: string[]
) {

  let scoreA = 0;

  let scoreB = 0;

  specsList.forEach((spec) => {

    const valueA =
      vehicleA?.specifications?.[spec];

    const valueB =
      vehicleB?.specifications?.[spec];

    if (
      valueA &&
      !valueB
    ) {

      scoreA++;
    }

    if (
      valueB &&
      !valueA
    ) {

      scoreB++;
    }

    if (
      typeof valueA === "number" &&
      typeof valueB === "number"
    ) {

      if (valueA > valueB)
        scoreA++;

      if (valueB > valueA)
        scoreB++;
    }
  });

  if (scoreA > scoreB)
    return vehicleA?.version;

  if (scoreB > scoreA)
    return vehicleB?.version;

  return "Empate";
}

function toggleSpec(
  spec: string
) {

  if (
    selectedSpecs.includes(spec)
  ) {

    setSelectedSpecs(

      selectedSpecs.filter(
        (item) =>
          item !== spec
      )
    );

    return;
  }

  setSelectedSpecs([
    ...selectedSpecs,
    spec
  ]);
}

function getCategoryBadge(
  category: string
) {

  switch (category) {

    case "Tecnologia":
      return "💻 Melhor Tecnologia";

    case "Segurança":
      return "🛡️ Melhor Segurança";

    case "Conforto":
      return "🛋️ Mais Conforto";

    case "Motor":
      return "⚡ Melhor Performance";

    case "OffRoad":
      return "🏔️ Melhor Off-Road";

    case "Exterior":
      return "✨ Melhor Acabamento";

    default:
      return "🏆 Destaque";
  }
}

function formatValue(value: any) {

  if (
    value === undefined ||
    value === null ||
    value === "" ||
    value === "X"
  ) {
    return "N/A";
  }

  return String(value);
}

  return (
    <ScrollView
  style={styles.container}
  contentContainerStyle={styles.contentContainer}
>

      <TouchableOpacity

  style={styles.backButton}

  onPress={() =>
    router.push("/")
  }
>

  <Text style={styles.backText}>
    ← Página Inicial
  </Text>

</TouchableOpacity>

      <Text style={styles.title}>
        Comparativo
      </Text>

      <Text style={styles.subtitle}>
        Escolha dois veículos
      </Text>

      <View style={styles.importContainer}>

  <Text style={styles.importLabel}>
    Importar Datasheet JSON
  </Text>

  <TouchableOpacity
  style={styles.importButton}
  onPress={importJson}
>
  <Text style={styles.importButtonText}>
    Selecionar arquivo JSON
  </Text>
</TouchableOpacity>

</View>

      <ScrollView horizontal>

        <View style={styles.selectionContainer}>

          {vehicles.map((vehicle) => (

            <TouchableOpacity
              key={vehicle.id}
              style={[
                styles.vehicleButton,
                
                vehicleA?.id === vehicle.id &&
                styles.selectedVehicle,
                vehicleB?.id === vehicle.id &&
                styles.disabledVehicle
              ]}
             onPress={() => {
              if (vehicleB?.id === vehicle.id)
                return;
              setVehicleA(vehicle);
              }}
             disabled={
              vehicleB?.id === vehicle.id
             }
            >

              <Text style={styles.vehicleText}>
                A: {vehicle.version}
              </Text>

            </TouchableOpacity>
          ))}

        </View>

      </ScrollView>

      <ScrollView horizontal>

        <View style={styles.selectionContainer}>

          {vehicles.map((vehicle) => (

            <TouchableOpacity
              key={vehicle.id}
              style={[
                styles.vehicleButton,
                
                vehicleB?.id === vehicle.id &&
                styles.selectedVehicle,

                vehicleA?.id === vehicle.id &&
                styles.disabledVehicle
              ]}
              onPress={() => {
                if (vehicleA?.id === vehicle.id)
                  return;
                setVehicleB(vehicle);
              }}
              disabled={
                vehicleA?.id === vehicle.id
              }
            >
              <Text style={styles.vehicleText}>
                B: {vehicle.version}
              </Text>

            </TouchableOpacity>
          ))}

        </View>

      </ScrollView>

      <TextInput
      style={styles.searchInput}
      placeholder="Buscar especificação..."
      placeholderTextColor="#9CA3AF"
      value={search}
      onChangeText={setSearch}
      />

      {
  search.length > 0 && (

    <View style={styles.suggestionsContainer}>

      {
        specs

          .filter((spec) =>

            spec
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
          )

          .slice(0, 5)

          .map((spec) => (

            <TouchableOpacity

              key={spec}

              style={styles.suggestionItem}

              onPress={() => {

                if (
                  !selectedSpecs.includes(spec)
                ) {

                  setSelectedSpecs([
                    ...selectedSpecs,
                    spec
                  ]);
                }

                setSearch("");
              }}
            >

              <Text
                style={styles.suggestionText}
              >
                {spec}
              </Text>

            </TouchableOpacity>
          ))
      }

    </View>
  )
}

      <View style={styles.selectedSpecsContainer}>

  {
    selectedSpecs.map((spec) => (

      <TouchableOpacity

        key={spec}

        style={styles.selectedChip}

        onPress={() =>
          toggleSpec(spec)
        }
      >

        <Text style={styles.selectedChipText}>
          {spec} ✕
        </Text>

      </TouchableOpacity>
    ))
  }

</View>

      <View style={styles.dashboard}>

  <Text style={styles.dashboardTitle}>
    Resumo Executivo
  </Text>

  {Object.entries(specCategories)
    .map(([category, specs]) => (

      <View
        key={category}
        style={styles.dashboardCard}
      >

        <Text style={styles.dashboardCategory}>
          {category}
        </Text>

        <Text style={styles.dashboardWinner}>
          🏆 {
            calculateCategoryWinner(
              specs
            )
          }
        </Text>

        <Text style={styles.badgeText}>
          {
          getCategoryBadge(category)
          }
        </Text>

      </View>
    ))}
    

</View>

      <TouchableOpacity
      style={styles.toggleButton}
      onPress={() =>
        setShowOnlyDifferences(
          !showOnlyDifferences
        )}
>
  <Text style={styles.toggleText}>
    {showOnlyDifferences
      ? "Mostrar Tudo"
      : "Mostrar Apenas Diferenças"}
      </Text>
      </TouchableOpacity>

      {
        vehicleA &&
        vehicleB && (

          <View style={styles.table}>

            <View style={styles.rowHeader}>

              <Text style={styles.headerCell}>
                Especificação
              </Text>

              <Text style={styles.headerCell}>
                {vehicleA.version}
              </Text>

              <Text style={styles.headerCell}>
                {vehicleB.version}
              </Text>

            </View>

            {Object.entries(specCategories).map(

  ([category, categorySpecs]) => (

    <View key={category}>

      <Text style={styles.categoryTitle}>
        {category}
      </Text>

      {categorySpecs.filter((spec) => {
        if (selectedSpecs.length > 0 && !selectedSpecs.includes(spec)) {
          return false;
        }
        const matchesSearch =
        spec
        .toLowerCase()
        .includes(search.toLowerCase());

  if (!matchesSearch)
    return false;

  if (!showOnlyDifferences)
    return true;

  const valueA =
    vehicleA?.specifications?.[spec];

  const valueB =
    vehicleB?.specifications?.[spec];

  return (formatValue(valueA) !==formatValue(valueB));
})

  .map((spec) => {

    const valueA =
      vehicleA?.specifications?.[spec];

    const valueB =
      vehicleB?.specifications?.[spec];
      const different =
      formatValue(valueA) !==
      formatValue(valueB);

    return (

      <View
        key={spec}
        style={[
          styles.row,

          different &&
          styles.highlightRow
        ]}
      >

        <Text style={styles.cell}>
          {spec}
        </Text>

        <Text
          style={[
            styles.cell,

            different &&
            styles.highlightText
          ]}
        >
          
        {formatValue(valueA)}
          
        </Text>

        <Text
          style={[
            styles.cell,

            different &&
            styles.highlightText
          ]}
        >
        {formatValue(valueB)}
        </Text>

      </View>
    );
  })}

    </View>
  )
)}

          </View>
        )
      }

    </ScrollView>
  );
}

