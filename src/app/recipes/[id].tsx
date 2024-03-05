import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { FlatList, Text, View } from "react-native";

import { styles } from "./styles";
import { Recipe } from "@//components/recipe";
import { useEffect, useState } from "react";
import { services } from "@//services";

export default function Recipes() {
  const [ingredients, setIngredients] = useState<IngredientsResponse[]>([])
  const [recipes, setRecipes] = useState<RecipeResponse[]>([])
  const params = useLocalSearchParams<{ id: string }>()

  const ingredientsIds = params.id.split(",")

  useEffect(() => {
    services.ingredients.findByIds(ingredientsIds).then(setIngredients)
  }, [])

  useEffect(() => {
    services.recipes.findByIngredientsIds(ingredientsIds).then(setRecipes)
  }, [])

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
        data={recipes}
        keyExtractor={(item) => item.id}
        style={styles.recipes}
        contentContainerStyle={styles.recipesContent}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ gap: 16 }}
        numColumns={2}
        renderItem={({ item }) => {
          return (
            <Recipe
              recipe={{
                name: item.name,
                image: item.image,
                minutes: item.minutes,
              }}
            />
          )
        }}
      />
    </View>
  )
}
