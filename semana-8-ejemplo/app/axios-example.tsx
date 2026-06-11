import { axiosClient } from "@/lib/api/axios-client";
import { Post, State } from "@/lib/api/types";
import axios, { CancelTokenSource } from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const AxiosExample = () => {
  const [listState, setListState] = useState<State<Post[]>>({
    data: null,
    loading: false,
    error: null,
  });

  const [createState, setCreateState] = useState<State<Post>>({
    data: null,
    loading: false,
    error: null,
  });

  const cancelSourceRef = useRef<CancelTokenSource | null>(null);

  useEffect(() => {
    cancelSourceRef.current = axios.CancelToken.source();

    async function loadPosts() {
      setListState({ data: null, loading: true, error: null });
      try {
        const { data } = await axiosClient.get<Post[]>("/posts", {
          params: { _limit: 5 },
          cancelToken: cancelSourceRef.current?.token,
        });
        setListState({ data: data, loading: false, error: null });
      } catch (error) {}
    }

    loadPosts();
    return () => cancelSourceRef.current?.cancel("Component unmounted");
  }, []);

  async function handleCreate() {
    setCreateState({ data: null, loading: true, error: null });
    try {
      const { data } = await axiosClient.post<Post>("/posts", {
        title: "Test Title",
        body: "Test body",
        userId: 1,
      });
      setCreateState({ data: data, loading: false, error: null });
    } catch (error) {}
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>GET - Load Posts</Text>
      {listState.loading && <ActivityIndicator style={styles.spinner} />}
      {listState.error && <Text>{listState.error}</Text>}
      {listState.data && (
        <FlatList
          data={listState.data}
          scrollEnabled={false}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.postCard}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postBody} numberOfLines={2}>
                {item.body}
              </Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleCreate}
        disabled={createState.loading}
      >
        <Text style={styles.buttonText}>Create post</Text>
      </TouchableOpacity>

      {createState.data && (
        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>{createState.data.id}</Text>
          <Text style={styles.resultText}>{createState.data.title}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default AxiosExample;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 60 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 8,
  },
  infoBox: {
    backgroundColor: "#fff8ee",
    borderRadius: 8,
    padding: 14,
    marginBottom: 8,
  },
  highlightBox: {
    backgroundColor: "#fff0f0",
    borderRadius: 8,
    padding: 14,
    marginBottom: 8,
    marginTop: 8,
  },
  highlightTitle: { fontWeight: "bold", marginBottom: 6 },
  infoTitle: { fontWeight: "bold", marginBottom: 6 },
  infoText: { fontSize: 13, lineHeight: 20, color: "#333" },
  code: {
    fontFamily: "monospace",
    backgroundColor: "#ffe9cc",
    color: "#1a1a1a",
  },
  postCard: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  postTitle: { fontWeight: "600", fontSize: 13, marginBottom: 4 },
  postBody: { fontSize: 12, color: "#555" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  textArea: { height: 80, textAlignVertical: "top" },
  button: {
    backgroundColor: "#FF6B35",
    borderRadius: 6,
    padding: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  error: { color: "red", marginBottom: 8 },
  spinner: { marginVertical: 16 },
  resultBox: {
    backgroundColor: "#e6ffe6",
    borderRadius: 6,
    padding: 12,
  },
  resultLabel: { fontWeight: "bold", marginBottom: 4, fontSize: 13 },
  resultText: { fontSize: 13 },
});
