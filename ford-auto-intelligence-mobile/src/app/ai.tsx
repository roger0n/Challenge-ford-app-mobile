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

import styles from "../styles/ai.styles";

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
    style={styles.container}
    contentContainerStyle={styles.content}
  >

    <TouchableOpacity
      onPress={() => router.back()}
      style={styles.backButton}
    >
      <Text style={styles.backText}>
        ← Voltar
      </Text>
    </TouchableOpacity>

    <Text style={styles.title}>
      Assistente IA
    </Text>

    <Text style={styles.subtitle}>
      Pergunte sobre os veículos disponíveis
      no Ford Auto Intelligence.
    </Text>

    <TextInput
      value={question}
      onChangeText={setQuestion}
      placeholder="Ex: Compare a Ranger XLT com a Limited"
      placeholderTextColor="#6B7280"
      multiline
      style={styles.input}
    />

    <TouchableOpacity
      onPress={askAI}
      disabled={loading}
      style={[
        styles.askButton,
        loading && styles.askButtonDisabled
      ]}
    >

      {loading ? (

        <ActivityIndicator
          color="#FFFFFF"
        />

      ) : (

        <Text style={styles.askButtonText}>
          Perguntar à IA
        </Text>

      )}

    </TouchableOpacity>

    {answer !== "" && (

      <View style={styles.answerCard}>

        <Text style={styles.answerTitle}>
          Resposta
        </Text>

        <Text style={styles.answerText}>
          {answer}
        </Text>

      </View>

    )}

  </ScrollView>
);
}