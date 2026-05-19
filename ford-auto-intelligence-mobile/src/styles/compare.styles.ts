import { StyleSheet } from "react-native";

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
importContainer: {

  marginBottom: 20
},

importLabel: {

  color: "#FFFFFF",

  marginBottom: 10,

  fontWeight: "600"
},

backButton: {

  backgroundColor: "#2563EB",

  padding: 14,

  borderRadius: 10,

  marginBottom: 20,

  alignItems: "center"
},

backText: {

  color: "#FFFFFF",

  fontWeight: "700"
},
});

export default styles;