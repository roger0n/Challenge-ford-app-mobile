import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

import {
  useState
} from "react";

import {
  router
} from "expo-router";

import AsyncStorage from
  "@react-native-async-storage/async-storage";


export default function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");
  
    const [error, setError] =
    useState("");


  async function handleLogin() {

  if (
    email.trim() === "" ||
    password.trim() === ""
  ) {

    setError(
      "Preencha o e-mail e a senha."
    );

    return;
  }

  const savedUsers =
    await AsyncStorage.getItem(
      "users"
    );

  const users =
    savedUsers
      ? JSON.parse(savedUsers)
      : [];

  const user =
    users.find(
      (user: any) =>
        user.email.toLowerCase() ===
          email.trim().toLowerCase() &&
        user.password === password
    );

  if (!user) {

    setError(
      "E-mail ou senha incorretos."
    );

    return;
  }

  setError("");

  await AsyncStorage.setItem(
    "userSession",
    JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email
    })
  );

  router.replace("/");
}


  return (

    <View
      style={{
        flex: 1,
        backgroundColor: "#0A0F1C",
        justifyContent: "center",
        paddingHorizontal: 30
      }}
    >

      <Text
        style={{
          color: "#FFFFFF",
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 8
        }}
      >
        Ford Auto Intelligence
      </Text>


      <Text
        style={{
          color: "#9CA3AF",
          fontSize: 16,
          marginBottom: 35
        }}
      >
        Inteligência competitiva automotiva
      </Text>


      <TextInput
        placeholder="E-mail"
        placeholderTextColor="#6B7280"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          backgroundColor: "#111827",
          color: "#FFFFFF",
          padding: 16,
          borderRadius: 12,
          marginBottom: 15
        }}
      />


      <TextInput
        placeholder="Senha"
        placeholderTextColor="#6B7280"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          backgroundColor: "#111827",
          color: "#FFFFFF",
          padding: 16,
          borderRadius: 12,
          marginBottom: 25
        }}
      />

      {error !== "" && (
        <Text
        style={{
            color: "#EF4444",
            marginBottom: 15,
            fontSize: 14
        }}
        >
        {error}
        </Text>

)}


      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "#2563EB",
          padding: 16,
          borderRadius: 12,
          alignItems: "center"
        }}
      >

        <Text
          style={{
            color: "#FFFFFF",
            fontWeight: "bold",
            fontSize: 16
          }}
        >
          Entrar
        </Text>

      </TouchableOpacity>

        <TouchableOpacity
            onPress={() =>
            router.push("/register")
            }
            style={{
            marginTop: 20,
            alignItems: "center"
        }}
    >
    <Text
        style={{
        color: "#60A5FA",
        fontSize: 15
        }}
    >
        Não possui uma conta? Criar conta
    </Text>
    </TouchableOpacity>

    </View>
  );
}