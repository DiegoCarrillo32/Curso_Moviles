import * as Notifications from "expo-notifications";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Modal,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

interface Task {
  id: string;
  text: string;
}
const TasksIndex = () => {
  const [task, setTask] = useState<string>("");
  const [todoList, setTodoList] = useState<Task[]>([]);
  const router = useRouter();

  const addTask = async () => {
    if (task.trim().length > 0) {
      setTodoList([...todoList, { id: Date.now().toString(), text: task }]);
      setTask("");
      await Notifications.scheduleNotificationAsync({
        content: { title: "Task Added", body: `Dont forget ${task}` },
        trigger: null,
      });
    }
  };

  useEffect(() => {
    const requestPermissions = async () => {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== Notifications.PermissionStatus.GRANTED) {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== Notifications.PermissionStatus.GRANTED) {
        return;
      }
    };
    requestPermissions();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F8F9FA",
        paddingHorizontal: 20,
      }}
    >
      <TextInput
        placeholder="New Task"
        placeholderTextColor="#999"
        style={styles.input}
        value={task}
        onChangeText={setTask}
      />
      <Pressable style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>Add Text</Text>
      </Pressable>

      <FlatList
        data={todoList}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Pressable
            style={styles.listItem}
            onPress={() => {
              router.push({
                pathname: "/tasks/[id]",
                params: { id: item.text },
              });
            }}
          >
            <Text style={styles.itemText}>{item.text}</Text>
          </Pressable>
        )}
      />
      {/* 
      <Modal transparent={true}>
        <View>
          <View>
            <Text>Delete Task?</Text>
            <Text>This action cannot be undone.</Text>
            <View>
              <Pressable>
                <Text>Cancel</Text>
              </Pressable>

              <Pressable>
                <Text>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal> */}
    </SafeAreaView>
  );
};

export default TasksIndex;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA", padding: 20 },
  input: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  addButton: {
    backgroundColor: "#E3F2FD",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: { color: "#1E88E5", fontWeight: "bold", fontSize: 16 },
  listItem: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: { fontSize: 16, color: "#333" },
  deleteHint: { fontSize: 12, color: "#CCC" },

  // Modal Styles (Replacing Portal/Dialog)
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  modalSub: { color: "#666", marginBottom: 20 },
  modalButtons: { flexDirection: "row", gap: 15 },
  cancelBtn: { padding: 10, width: 100, alignItems: "center" },
  deleteBtn: {
    backgroundColor: "#FFEBEE",
    padding: 10,
    borderRadius: 10,
    width: 100,
    alignItems: "center",
  },
  deleteText: { color: "#D32F2F", fontWeight: "bold" },
  cancelText: { color: "#666" },
});
