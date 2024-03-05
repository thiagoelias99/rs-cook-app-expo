import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { FlatList, Text, View } from "react-native";

import { styles } from "./styles";
import { Recipe } from "@//components/recipe";

export default function Recipes() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons
          name="arrow-back"
          size={32}
          onPress={() => router.back()}
        />
        <Text style={styles.title}>Ingredientes</Text>
      </View>
      <FlatList
          data={[1, 2, 3]}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => {
            return (
              <Recipe
                recipe={{
                  name: "Bolo de cenoura",
                  image: "https://www.receiteria.com.br/wp-content/uploads/bolo-de-cenoura-de-liquidificador-1.jpeg",
                  minutes: 40
                }}
              />
            )
          }}
        />
    </View>
  )
}
