import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { COLOURS } from "@/constant/color";
import { IconSymbol } from "@/components/IconSymbol";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import * as ImagePicker from "expo-image-picker";
import { DateSelector } from "@/components/stats/dateSelector";

const categories = [
  "Salary",
  "Freelance",
  "Investments",
  "Business",
  "Rental",
  "Bonus",
  "Gift",
  "Other",
];
type DateModeType = "single" | "range";

export default function AddIncome() {
  const defaultDate = dayjs();

  const router = useRouter();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [dateMode, setDateMode] = useState<DateModeType>("single");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const newImages = result.assets.map((asset) => asset.uri);
      setImages([...images, ...newImages]);
    }
  };
  const handleAddIncome = async () => {
    try {
      // First, get current expenses
      const storedIncome = await AsyncStorage.getItem("income");
      const currentExpenses = storedIncome ? JSON.parse(storedIncome) : [];

      // Create new expense with all required fields
      const newIncome = {
        id: Date.now().toString(),
        category: selectedCategory,
        description,
        amount: parseFloat(amount),
        date: selectedDate.format("YYYY-MM-DD"),
        images,
        type: "income",
      };

      // Add to existing expenses
      const updatedIncome = [...currentExpenses, newIncome];

      // Store updated list
      await AsyncStorage.setItem("income", JSON.stringify(updatedIncome));

      // Add console log to verify data
      console.log("Updated income:", updatedIncome);

      router.back();
    } catch (error) {
      console.error("Error adding income:", error);
    }
  };

  const handleDateChange = (value: any) => {
    if (dateMode === "single" && value.date) {
      setSelectedDate(dayjs(value.date));
      setShowDatePicker(false);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />

        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(!showDatePicker)}
        >
          <IconSymbol name="calendar" size={20} color={COLOURS.primary} />
          <Text style={styles.dateText}>
            {selectedDate.format("MMMM D, YYYY")}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateSelector
            mode={dateMode}
            // value={selectedDate.toDate()}
            date={selectedDate.toDate()}
            onChange={handleDateChange}
          />
        )}

        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <IconSymbol name="doc.fill" size={20} color={COLOURS.primary} />
          <Text style={styles.uploadText}>Add Receipt/Documents</Text>
        </TouchableOpacity>

        {images.length > 0 && (
          <ScrollView horizontal style={styles.imagePreview}>
            {images.map((uri, index) => (
              <Image key={index} source={{ uri }} style={styles.previewImage} />
            ))}
          </ScrollView>
        )}

        <Text style={styles.label}>Category</Text>
        <View style={styles.categoryGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAddIncome}>
          <Text style={styles.addButtonText}>Add Income</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  form: {
    padding: 20,
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
  },
  selectedCategory: {
    backgroundColor: COLOURS.primary,
  },
  categoryText: {
    color: "#666",
  },
  selectedCategoryText: {
    color: "white",
  },
  addButton: {
    backgroundColor: COLOURS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    gap: 8,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    gap: 8,
  },
  uploadText: {
    fontSize: 16,
    color: COLOURS.primary,
    fontWeight: "500",
  },
  imagePreview: {
    flexDirection: "row",
    marginTop: 12,
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
  },
});
