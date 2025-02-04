import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLOURS } from "@/constant/color";
import { IconSymbol } from "@/components/IconSymbol";

interface Transaction {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  images?: string[];
  type: string;
}

export default function DetailScreen() {
  const { id, type } = useLocalSearchParams();
  const [data, setData] = useState<Transaction | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const storageKey = type === "income" ? "income" : "expenses";

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const fetchDetails = async () => {
    const stored = await AsyncStorage.getItem(storageKey);
    if (stored) {
      const all = JSON.parse(stored);
      const selected = all.find((item: Transaction) => item.id === id);
      setData(selected);
    }
  };

  const handleUpdate = async () => {
    if (!data) return;

    try {
      const stored = await AsyncStorage.getItem(storageKey);
      if (stored) {
        const all = JSON.parse(stored);
        const updated = all.map((item: Transaction) =>
          item.id === id ? data : item
        );
        await AsyncStorage.setItem(storageKey, JSON.stringify(updated));
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const stored = await AsyncStorage.getItem(storageKey);
              if (stored) {
                const all = JSON.parse(stored);
                const filtered = all.filter(
                  (item: Transaction) => item.id !== id
                );
                await AsyncStorage.setItem(
                  storageKey,
                  JSON.stringify(filtered)
                );
                router.back();
              }
            } catch (error) {
              console.error("Error deleting:", error);
            }
          },
        },
      ]
    );
  };

  if (!data) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <IconSymbol
          name={type === "income" ? "banknote.fill" : "cart.fill"}
          size={24}
          color={COLOURS.primary}
        />
        <Text style={styles.category}>{data.category}</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <IconSymbol
              name={isEditing ? "checkmark.circle.fill" : "pencil.circle.fill"}
              size={24}
              color={COLOURS.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <IconSymbol name="trash.fill" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Amount</Text>
          {isEditing ? (
            <TextInput
              style={[styles.amount, styles.input]}
              value={data.amount.toString()}
              onChangeText={(text) =>
                setData({ ...data, amount: parseFloat(text) || 0 })
              }
              keyboardType="decimal-pad"
            />
          ) : (
            <Text style={styles.amount}>${data.amount.toFixed(2)}</Text>
          )}
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Date</Text>
          {isEditing ? (
            <TextInput
              style={[styles.value, styles.input]}
              value={data.date}
              onChangeText={(text) => setData({ ...data, date: text })}
            />
          ) : (
            <Text style={styles.value}>{data.date}</Text>
          )}
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Description</Text>
          {isEditing ? (
            <TextInput
              style={[styles.value, styles.input]}
              value={data.description}
              onChangeText={(text) => setData({ ...data, description: text })}
              multiline
            />
          ) : (
            <Text style={styles.value}>{data.description}</Text>
          )}
        </View>

        {isEditing && (
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
            <Text style={styles.updateButtonText}>Save Changes</Text>
          </TouchableOpacity>
        )}

        {data.images && data.images.length > 0 && (
          <View style={styles.imagesContainer}>
            <Text style={styles.label}>Attachments</Text>
            <ScrollView horizontal>
              {data.images.map((uri, index) => (
                <Image key={index} source={{ uri }} style={styles.image} />
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  category: {
    fontSize: 24,
    fontWeight: "600",
    flex: 1,
    marginLeft: 12,
  },
  detailsContainer: {
    padding: 20,
    gap: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  amount: {
    fontSize: 20,
    fontWeight: "600",
    color: COLOURS.primary,
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    minWidth: 120,
  },
  updateButton: {
    backgroundColor: COLOURS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  updateButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  imagesContainer: {
    gap: 12,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginRight: 12,
  },
});
