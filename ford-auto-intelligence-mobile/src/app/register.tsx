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


export default function Register() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] =
    useState("");


  async function handleRegister() {

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {

      setError(
        "Preencha todos os campos."
      );

      return;
    }


    if (
      password !== confirmPassword
    ) {

      setError(
        "As senhas não coincidem."
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


    const userExists =
      users.some(
        (user: any) =>
          user.email.toLowerCase() ===
          email.trim().toLowerCase()
      );


    if (userExists) {

      setError(
        "Já existe uma conta com este e-mail."
      );

      return;
    }


    const newUser = {

      id: Date.now(),

      name:
        name.trim(),

      email:
        email.trim(),

      password
    };


    const updatedUsers = [
      ...users,
      newUser
    ];


    await AsyncStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );


    router.replace("/login");
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
        Criar Conta
      </Text>


      <Text
        style={{
          color: "#9CA3AF",
          fontSize: 16,
          marginBottom: 30
        }}
      >
        Ford Auto Intelligence
      </Text>


      <TextInput
        placeholder="Nome"
        placeholderTextColor="#6B7280"
        value={name}
        onChangeText={setName}
        style={{
          backgroundColor: "#111827",
          color: "#FFFFFF",
          padding: 16,
          borderRadius: 12,
          marginBottom: 15
        }}
      />


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
          marginBottom: 15
        }}
      />


      <TextInput
        placeholder="Confirmar senha"
        placeholderTextColor="#6B7280"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={{
          backgroundColor: "#111827",
          color: "#FFFFFF",
          padding: 16,
          borderRadius: 12,
          marginBottom: 15
        }}
      />


      {error !== "" && (

        <Text
          style={{
            color: "#EF4444",
            marginBottom: 15
          }}
        >
          {error}
        </Text>

      )}


      <TouchableOpacity
        onPress={handleRegister}
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
            fontSize: 16,
            fontWeight: "bold"
          }}
        >
          Criar Conta
        </Text>

      </TouchableOpacity>


      <TouchableOpacity
        onPress={() =>
          router.replace("/login")
        }
        style={{
          marginTop: 20,
          alignItems: "center"
        }}
      >

        <Text
          style={{
            color: "#9CA3AF"
          }}
        >
          Já possui uma conta? Entrar
        </Text>

      </TouchableOpacity>

    </View>
  );
}