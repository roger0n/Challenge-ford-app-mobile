import { StyleSheet } from "react-native";

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
  },
  backButton: {

  backgroundColor: "#2563EB",

  padding: 12,

  borderRadius: 10,

  width: 110,

  alignItems: "center",

  marginTop: 20,

  marginBottom: 20
},

backText: {

  color: "#FFFFFF",

  fontWeight: "bold"
},
});
export default styles;