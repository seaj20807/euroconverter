import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Image, Text, View, Button, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { API_URL, API_TOKEN } from "@env";

export default function App() {
  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState(0);
  const [conversion, setConversion] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getResults = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: { apikey: API_TOKEN },
        });
        const data = await response.json();
        setResults(data.rates);
      } catch (error) {
        console.error(error);
      }
    };
    getResults();
  }, []);

  const convert = (amount) => {
    if (isNaN(amount)) {
      alert.alert("Please enter a number!");
    }
    setConversion(parseFloat(amount) / results[currency]);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: "https://cdn.pixabay.com/photo/2013/07/12/15/34/euro-150091_1280.png",
        }}
      />
      <Text style={styles.text}>{parseFloat(conversion).toFixed(2)}</Text>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={(number) => setAmount(number)}
          inputMode="numeric"
          keyboardType="numeric"
        />
        <Picker
          selectedValue={currency}
          onValueChange={(itemValue, itemIndex) => setCurrency(itemValue)}
        >
          {Object.keys(results).map((curCode) => {
            return (
              <Picker.Item key={curCode} label={curCode} value={curCode} />
            );
          })}
        </Picker>
        <Button title="Convert" onPress={() => convert(amount)} />
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 110,
    width: 200,
  },
  text: {
    fontSize: 25,
  },
  input: {
    width: 200,
    borderColor: "grey",
    borderWidth: 1,
  },
});
