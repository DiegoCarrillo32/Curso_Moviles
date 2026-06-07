import { db } from "@/db/client";
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Index() {
  const [text, setText] = useState("");
  const [username, setUsername] = useState("usuario");
  const { data } = useLiveQuery(db.select().from(todos));

  useEffect(() => {
    AsyncStorage.getItem("username").then((val) => {
      if (val) setUsername(val);
    });
  }, []);

  const saveUsername = async (val: string) => {
    setUsername(val);
    await AsyncStorage.setItem("username", val);
  };

  const addTodo = async () => {
    if (text.trim() === "") return;
    await db.insert(todos).values({
      title: text,
      done: false,
    });
    setText("");
  };

  const toggleTodo = async (id: number, currentDone: boolean) => {
    await db.update(todos).set({ done: !currentDone }).where(eq(todos.id, id));
  };

  const deleteTodo = async (id: number) => {
    await db.delete(todos).where(eq(todos.id, id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Hola, {username}</Text>
        <TextInput
          style={styles.nameInput}
          value={username}
          onChangeText={saveUsername}
          placeholder="Tu nombre"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Agregar algo..."
        />
        <Button title="Add" onPress={addTodo} />
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity onPress={() => toggleTodo(item.id, item.done)}>
              <Text style={[styles.todoText, item.done && styles.todoDone]}>
                {item.title}
              </Text>
            </TouchableOpacity>
            <Button
              title="Delete"
              color="red"
              onPress={() => deleteTodo(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  header: { fontSize: 20, fontWeight: "bold" },
  nameInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 6,
    borderRadius: 5,
    width: 120,
  },
  inputContainer: { flexDirection: "row", marginBottom: 20 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  todoTextContainer: { flex: 1 },
  todoText: { fontSize: 18 },
  todoDone: { textDecorationLine: "line-through", color: "#888" },
});
