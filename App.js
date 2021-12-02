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
import { Fontisto } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
export default function App() {
  const HistoryIcon = ({ navigation }) => {
    return (
      <Fontisto
        name="history"
        size={24}
        color="black"
        onPress={() => navigation.navigate("HistoryScreen")}
      />
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={({ navigation }) => ({
            title: "Discount Calculator",
            headerStyle: { backgroundColor: "#F9AA33" },
            headerTitleAlign: "center",
            headerRight: () => HistoryIcon({ navigation }),
          })}
        />
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
  //const [disabledBtn, setDisabledBtn] = React.useState(false);
  const [history, setHistory] = React.useState([]);

  const saveFunc = () => {
    let historyObj = { op: originalPrice, dis: discount, fp: finalPrice };
    let newArr = [...history, historyObj];
    setHistory(newArr);
    console.log(history);
  };
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
      <Text style={styles.head}>Let's see how much you save!</Text>
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
      <View style={styles.resView}>
        <Text style={styles.result}>You Save: {saving}</Text>
        <Text style={styles.result}>Final Price: {finalPrice}</Text>
      </View>
      <Pressable style={styles.hisBtn} onPress={() => saveFunc()}>
        <Text>SAVE</Text>
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
    color: "#F9AA33",
    fontSize: 22,
  },
  resView: {
    marginTop: 20,
  },
  head: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  hisBtn: {
    marginTop: 25,
    width: "25%",
    backgroundColor: "#F9AA33",
    height: "7%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
  },
});
