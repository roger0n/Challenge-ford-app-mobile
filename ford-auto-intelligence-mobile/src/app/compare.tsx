import { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput
} from "react-native";

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

  useEffect(() => {

    async function loadVehicles() {

      const response =
        await api.get("/vehicles");

      setVehicles(response.data);
    }

    loadVehicles();

  }, []);

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

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        Comparativo
      </Text>

      <Text style={styles.subtitle}>
        Escolha dois veículos
      </Text>

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

  return valueA !== valueB;
})

  .map((spec) => {

    const valueA =
      vehicleA?.specifications?.[spec];

    const valueB =
      vehicleB?.specifications?.[spec];

    const different =
      valueA !== valueB;

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
          {
          valueA === 0 ||
          valueA === undefined ||
          valueA === null
          
          ? "N/A"
          
          : String(valueA)
          }
        </Text>

        <Text
          style={[
            styles.cell,

            different &&
            styles.highlightText
          ]}
        >
          {
          valueB === 0 ||
          valueB === undefined ||
          valueB === null
          
          ? "N/A"
          
          : String(valueB)
          }
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

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#00142D",
    padding: 20
  },

  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10
  },

  subtitle: {
    color: "#8FB8FF",
    marginBottom: 20
  },

  selectionContainer: {
    flexDirection: "row",
    marginBottom: 20
  },

  vehicleButton: {
    backgroundColor: "#0A2342",
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#1E3A5F"
  },

  selectedVehicle: {
    borderColor: "#4DA3FF",
    borderWidth: 2
  },

  vehicleText: {
    color: "white",
    fontWeight: "bold"
  },

  table: {
    marginTop: 20
  },

  rowHeader: {
    flexDirection: "row",
    backgroundColor: "#0A2342",
    padding: 10
  },

  row: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#1E3A5F"
  },

  differentRow: {
    backgroundColor: "#112D4E"
  },

  headerCell: {
    flex: 1,
    color: "#4DA3FF",
    fontWeight: "bold"
  },

  cell: {
    flex: 1,
    color: "white",
    fontSize: 12
  },

  categoryTitle: {

  color: "#60A5FA",

  fontSize: 20,

  fontWeight: "bold",

  marginTop: 25,

  marginBottom: 10
},

disabledVehicle: {

  opacity: 0.35,

  borderColor: "#374151"
},

highlightRow: {

  backgroundColor: "#0F2A4A"
},

highlightText: {

  color: "#60A5FA",

  fontWeight: "bold"
},
toggleButton: {

  backgroundColor: "#2563EB",

  padding: 14,

  borderRadius: 12,

  alignItems: "center",

  marginBottom: 20
},

toggleText: {

  color: "#FFFFFF",

  fontWeight: "bold"
},

searchInput: {

  backgroundColor: "#0A2342",

  color: "#FFFFFF",

  padding: 14,

  borderRadius: 12,

  marginBottom: 20,

  borderWidth: 1,

  borderColor: "#1E3A5F"
},
dashboard: {

  marginBottom: 25
},

dashboardTitle: {

  color: "#FFFFFF",

  fontSize: 24,

  fontWeight: "bold",

  marginBottom: 15
},

dashboardCard: {

  backgroundColor: "#0A2342",

  padding: 16,

  borderRadius: 14,

  marginBottom: 12,

  borderWidth: 1,

  borderColor: "#1E3A5F"
},

dashboardCategory: {

  color: "#8FB8FF",

  fontSize: 14,

  marginBottom: 6
},

dashboardWinner: {

  color: "#FFFFFF",

  fontSize: 18,

  fontWeight: "bold"
},

badgeText: {

  color: "#60A5FA",

  marginTop: 8,

  fontWeight: "600"
},

specSelector: {

  flexDirection: "row",

  flexWrap: "wrap",

  marginBottom: 20
},

specButton: {

  backgroundColor: "#0A2342",

  paddingVertical: 10,

  paddingHorizontal: 14,

  borderRadius: 20,

  marginRight: 10,

  borderWidth: 1,

  borderColor: "#1E3A5F"
},

selectedSpecButton: {

  backgroundColor: "#2563EB",

  borderColor: "#60A5FA"
},

specButtonText: {

  color: "#FFFFFF",

  fontSize: 12
},
selectedSpecsContainer: {

  flexDirection: "row",

  flexWrap: "wrap",

  marginBottom: 20
},

selectedChip: {

  backgroundColor: "#2563EB",

  paddingVertical: 8,

  paddingHorizontal: 14,

  borderRadius: 20,

  marginRight: 10,

  marginBottom: 10
},

selectedChipText: {

  color: "#FFFFFF",

  fontWeight: "bold"
},
suggestionsContainer: {

  backgroundColor: "#0A2342",

  borderRadius: 12,

  marginBottom: 20,

  overflow: "hidden",

  borderWidth: 1,

  borderColor: "#1E3A5F"
},

suggestionItem: {

  padding: 14,

  borderBottomWidth: 1,

  borderBottomColor: "#1E3A5F"
},

suggestionText: {

  color: "#FFFFFF"
},
});