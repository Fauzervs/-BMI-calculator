import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Animated,
} from "react-native";

export default function App() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [imc, setImc] = useState(null);
  const [message, setMessage] = useState("");
  const fadeAnim = useState(new Animated.Value(0))[0];

  function handleSubmit() {
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);

    if (pesoNum && alturaNum) {
      const imcCalc = pesoNum / (alturaNum * alturaNum);
      setImc(imcCalc.toFixed(2));

      if (imcCalc < 18.5) {
        setMessage("Abaixo do peso");
      } else if (imcCalc < 24.9) {
        setMessage("Peso normal");
      } else if (imcCalc < 29.9) {
        setMessage("Sobrepeso");
      } else {
        setMessage("Obesidade");
      }

      Keyboard.dismiss();
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      setMessage("Por favor, insira valores válidos.");
      setImc(null);
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Calcule seu IMC</Text>

      <TextInput
        style={styles.input}
        value={peso}
        onChangeText={(peso) => setPeso(peso)}
        placeholder="Peso (Kg)"
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        value={altura}
        onChangeText={(altura) => setAltura(altura)}
        placeholder="Altura (Metros)"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      {imc && (
        <Animated.View style={[styles.resultContainer, { opacity: fadeAnim }]}>
          <Text style={styles.result}>IMC: {imc}</Text>
          <Text style={styles.message}>{message}</Text>
        </Animated.View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f8ff", // Cor de fundo alterada
  },
  title: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 30,
    color: "#333",
  },
  input: {
    backgroundColor: "#e6e6fa",
    borderRadius: 10,
    margin: 15,
    padding: 10,
    color: "#333",
    fontSize: 20,
    width: "80%",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    backgroundColor: "#4682b4",
    padding: 15,
    borderRadius: 10,
    width: "80%",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  result: {
    fontSize: 25,
    color: "#333",
  },
  message: {
    fontSize: 20,
    color: "#333",
    marginTop: 10,
  },
});
