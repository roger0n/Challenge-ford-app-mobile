import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from "react-native";

import { useState } from "react";
import { router } from "expo-router";

import AsyncStorage from
  "@react-native-async-storage/async-storage";

import api from "../services/api";

export default function AI() {

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function askAI() {

    if (question.trim() === "") {
      return;
    }

    try {

      setLoading(true);
      setAnswer("");

      // Pega todos os veículos que o app
      // já armazenou no AsyncStorage
      const saved =
        await AsyncStorage.getItem(
          "vehicles"
        );

      let vehicles =
        saved ? JSON.parse(saved) : [];

      // Se ainda não houver veículos salvos,
      // busca os veículos da API
      if (vehicles.length === 0) {

        const response =
          await api.get("/vehicles");

        vehicles = response.data;
      }

      // Envia pergunta + veículos para
      // nosso backend
      const response =
        await api.post("/ai", {
          question,
          vehicles
        });

      setAnswer(
        response.data.answer
      );

    } catch (error) {

      console.log(error);

      setAnswer(
        "Não foi possível consultar a IA."
      );

    } finally {

      setLoading(false);
    }
  }

  return (

    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#0A0F1C"
      }}
      contentContainerStyle={{
        padding: 20,
        paddingTop: 60
      }}
    >

      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          marginBottom: 25
        }}
      >

        <Text
          style={{
            color: "#60A5FA",
            fontSize: 16
          }}
        >
          ← Voltar
        </Text>

      </TouchableOpacity>

      <Text
        style={{
          color: "#FFFFFF",
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 8
        }}
      >
        Assistente IA
      </Text>

      <Text
        style={{
          color: "#9CA3AF",
          fontSize: 15,
          marginBottom: 25
        }}
      >
        Pergunte sobre os veículos disponíveis
        no Ford Auto Intelligence.
      </Text>

      <TextInput
        value={question}
        onChangeText={setQuestion}
        placeholder="Ex: Compare a Ranger XLT com a Limited"
        placeholderTextColor="#6B7280"
        multiline
        style={{
          backgroundColor: "#111827",
          color: "#FFFFFF",
          padding: 16,
          borderRadius: 12,
          minHeight: 120,
          textAlignVertical: "top",
          fontSize: 16,
          marginBottom: 15
        }}
      />

      <TouchableOpacity
        onPress={askAI}
        disabled={loading}
        style={{
          backgroundColor:
            loading
              ? "#374151"
              : "#2563EB",
          padding: 16,
          borderRadius: 12,
          alignItems: "center"
        }}
      >

        {loading ? (

          <ActivityIndicator
            color="#FFFFFF"
          />

        ) : (

          <Text
            style={{
              color: "#FFFFFF",
              fontWeight: "bold",
              fontSize: 16
            }}
          >
            Perguntar à IA
          </Text>

        )}

      </TouchableOpacity>

      {answer !== "" && (

        <View
          style={{
            backgroundColor: "#111827",
            borderRadius: 12,
            padding: 18,
            marginTop: 25
          }}
        >

          <Text
            style={{
              color: "#60A5FA",
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 10
            }}
          >
            Resposta
          </Text>

          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              lineHeight: 24
            }}
          >
            {answer}
          </Text>

        </View>

      )}

    </ScrollView>
  );
}