import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0A0F1C"
  },

  content: {
    padding: 20,
    paddingTop: 60
  },

  backButton: {
    marginBottom: 25
  },

  backText: {
    color: "#60A5FA",
    fontSize: 16
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8
  },

  subtitle: {
    color: "#9CA3AF",
    fontSize: 15,
    marginBottom: 25
  },

  input: {
    backgroundColor: "#111827",
    color: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    minHeight: 120,
    textAlignVertical: "top",
    fontSize: 16,
    marginBottom: 15
  },

  askButton: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    alignItems: "center"
  },

  askButtonDisabled: {
    backgroundColor: "#374151"
  },

  askButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16
  },

  answerCard: {
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 18,
    marginTop: 25
  },

  answerTitle: {
    color: "#60A5FA",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10
  },

  answerText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 24
  }

});

export default styles;