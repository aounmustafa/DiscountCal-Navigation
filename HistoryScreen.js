import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { ListItem } from "react-native-elements";

const HistoryScreen = ({ navigation, route }) => {
  navigation.setOptions({
    title: "History",
    headerStyle: { backgroundColor: "#F9AA33" },
    headerTitleAlign: "center",
    headerRight: () => ClearAll(),
  });

  const { myArr } = route.params;
  const [myArr2, setMyArr2] = React.useState(myArr);
  const [showModal, setShowModal] = React.useState(false);

  const deleteEntry = (i) => {
    let newArr = myArr.filter((element, index) => {
      return index != i;
    });
    myArr.splice(i, 1);
    setMyArr2(newArr);
  };

  const confirmClear = () => {
    myArr.splice(0, myArr.length);
    setMyArr2([]);
  };

  const ClearAll = () => {
    return (
      <Pressable
        style={{ alignItems: "center" }}
        onPress={() => setShowModal(true)}
      >
        <AntDesign name="delete" size={24} color="black" />
        <Text>Clear All</Text>
      </Pressable>
    );
  };

  const ConfirmModal = (props) => {
    return (
      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Are you sure you want to clear all?
              </Text>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Pressable
                  style={styles.mbutton}
                  onPress={() => {
                    props.setShowModal(false);
                    confirmClear();
                  }}
                >
                  <Text>Yes</Text>
                </Pressable>
                <Pressable
                  style={styles.mbutton}
                  onPress={() => props.setShowModal(false)}
                >
                  <Text>No</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <View>
      {showModal ? <ConfirmModal setShowModal={setShowModal} /> : null}
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
        {myArr2.length > 0 ? (
          myArr2.map((item, i) => (
            <ListItem key={i} bottomDivider>
              <ListItem.Content
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>{item.op}</Text>
                <Text> {item.dis}</Text>
                <Text> {item.fp}</Text>
              </ListItem.Content>
              <Entypo
                name="squared-cross"
                size={22}
                color="red"
                onPress={() => deleteEntry(i)}
              />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItem.Content style={{ alignItems: "center" }}>
              <Text style={styles.titles}>No Items!</Text>
            </ListItem.Content>
          </ListItem>
        )}
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
  titles: {
    fontSize: 20,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    height: "25%",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    borderWidth: 0.25,
  },

  mbutton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    width: "20%",
    padding: 10,
    backgroundColor: "#F9AA33",
    margin: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
});
export default HistoryScreen;
