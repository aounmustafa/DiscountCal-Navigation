import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ListItem } from "react-native-elements";

const HistoryScreen = ({ navigation, route }) => {
  navigation.setOptions({
    title: "History",
    headerStyle: { backgroundColor: "#F9AA33" },
    headerTitleAlign: "center",
    headerRight: () => ClearAll(),
  });
  const { myArr } = route.params;

  const ClearAll = () => {
    return (
      <Pressable style={{ alignItems: "center" }}>
        <AntDesign name="delete" size={24} color="black" />
        <Text>Clear All</Text>
      </Pressable>
    );
  };
  return (
    <View>
      <ListItem>
        <ListItem.Content
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <ListItem.Title style={styles.titles}>Original Price</ListItem.Title>
          <ListItem.Title style={styles.titles}>Discount</ListItem.Title>
          <ListItem.Title style={styles.titles}>Final Price</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ScrollView>
        {myArr.map((item, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>{item.op}</Text>
              <Text> {item.dis}</Text>
              <Text> {item.fp}</Text>
            </ListItem.Content>
            <ListItem.Chevron onPress={() => deleteEntry} />
          </ListItem>
        ))}
      </ScrollView>
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
  titles: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default HistoryScreen;
