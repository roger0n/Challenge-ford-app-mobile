import { StyleSheet } from "react-native";

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
},
welcomeText: {
  color: "#9CA3AF",
  fontSize: 16,
  marginBottom: 20
},

aiButton: {
  backgroundColor: "#7C3AED",
  padding: 16,
  borderRadius: 12,
  marginBottom: 20,
  alignItems: "center"
},

aiButtonText: {
  color: "#FFFFFF",
  fontWeight: "bold",
  fontSize: 16
},

logoutButton: {
  backgroundColor: "#DC2626",
  padding: 16,
  borderRadius: 12,
  alignItems: "center",
  marginTop: 15,
  marginBottom: 30
},

logoutButtonText: {
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: "bold"
}
});

export default styles;