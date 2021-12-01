import React from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const MainScreen = ({ navigation }) => {
  const [originalPrice, setOriginalPrice] = React.useState(null);
  const [discount, setDiscount] = React.useState(null);
  const [saving, setSaving] = React.useState(null);
  const [finalPrice, setFinalPrice] = React.useState(null);

  React.useEffect(() => {
    if (originalPrice >= 0) {
      if (discount >= 0 && discount <= 100) {
        setSaving(((originalPrice * discount) / 100).toFixed(2));
        setFinalPrice((originalPrice - saving).toFixed(2));
      } else {
        alert("Discount should be less than 100!");
      }
    } else {
      alert("Price cannot be negative!");
    }
  });
  return (
    <View style={styles.container}>
      <Text style={styles.head}>Discount Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Price"
        placeholderTextColor="black"
        value={originalPrice}
        onChangeText={setOriginalPrice}
        keyboardType="number-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Discount"
        placeholderTextColor="black"
        value={discount}
        onChangeText={setDiscount}
        keyboardType="number-pad"
      />
      <Text style={styles.result}>You Save: {saving}</Text>

      <Text style={styles.result}>Final Price: {finalPrice}</Text>
      <Pressable onPress={() => navigation.navigate("HistoryScreen")}>
        <Text>Check History</Text>
      </Pressable>
    </View>
  );
};

const HistoryScreen = () => {
  return (
    <View>
      <Text>This is History screnen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    color: "black",
    margin: 10,
    padding: 5,
    width: "50%",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#2b2b2b",
  },
  result: {
    margin: 5,
    color: "#F9AA33",
    fontSize: 22,
  },
  head: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
