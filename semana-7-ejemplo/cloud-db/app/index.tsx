import { db } from "@/firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
interface Todo {
  id: string;
  title: string;
  done: boolean;
}
export default function Index() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (db) {
      setLoading(true);
      const q = query(collection(db, "notas"), orderBy("title", "desc"));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const loadedTodos: Todo[] = [];
          snapshot.forEach((docSnap) => {
            loadedTodos.push({
              id: docSnap.id,
              ...(docSnap.data() as Omit<Todo, "id">),
            });
          });
          setTodos(loadedTodos);
          setLoading(false);
        },
        (error) => {
          console.error(error);
          setLoading(false);
        },
      );
      return () => unsubscribe();
    } else {
      setTodos([]);
      setLoading(false);
    }
  }, []);

  const handleAddNote = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Ingrese titulo");
      return;
    }

    try {
      const doc = await addDoc(collection(db, "notas"), {
        title,
        done: false,
      });
      console.log(doc.id);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Error al guardar");
    }
  };

  const handleToggle = async (todo: Todo) => {
    try {
      await updateDoc(doc(db, "notas", todo.id), {
        done: !todo.done,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "notas", id));
  };

  if (!db) {
    return (
      <View>
        <Text>Firebase not init</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <Button title="Agregar" onPress={handleAddNote} />

      <Text style={styles.headre}>TODOs</Text>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.noteItem}>
              <Text
                style={{
                  fontWeight: "bold",
                  textDecorationLine: item.done ? "line-through" : "none",
                }}
              >
                {item.title}
              </Text>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Button
                  onPress={() => handleToggle(item)}
                  title={item.done ? "Desmarcar" : "Completar"}
                />
                <View style={{ width: 10 }} />
                <Button
                  title={"Borrar"}
                  color={"red"}
                  onPress={() => handleDelete(item.id)}
                />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginVertical: 5,
    borderRadius: 8,
  },
  noteItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 5,
  },
  headre: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
});
