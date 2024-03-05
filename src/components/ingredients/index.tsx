import { Alert, ScrollView } from "react-native"

import { styles } from "./styles"
import Ingredient from "../ingredient"
import { useEffect, useState } from "react"
import { Selected } from "../selected"
import { router } from "expo-router"
import { services } from "@//services"

export default function Ingredients() {
    const [selected, setSelected] = useState<string[]>([])
    const [ingredients, setIngredients] = useState<IngredientsResponse[]>([])

    function handleSelect(name: string) {
        if (selected.includes(name)) {
            setSelected(selected.filter((item) => item !== name))
        } else {
            setSelected([...selected, name])
        }
    }

    function handleSearch() {
        // router.navigate("/recipes/" + selected)
        router.navigate("/recipes/")
    }

    function handleClear() {
        Alert.alert("Limpar", "Deseja limpar os ingredientes selecionados?", [
            {
                text: "Não",
                style: "cancel"
            },
            {
                text: "Sim",
                onPress: () => setSelected([])
            }
        ])
    }

    useEffect(() => {
        services.ingredients.findAll().then(setIngredients)
    }, [])

    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}
            >
                {ingredients.map((ingredient) => (
                    <Ingredient
                        selected={selected.includes(ingredient.id)}
                        key={ingredient.id}
                        name={ingredient.name}
                        image={`${services.storage.imagePath}${ingredient.image}`}
                        onPress={() => handleSelect(ingredient.id)}
                    />
                ))}
            </ScrollView>
            {selected.length > 0 && (
                <Selected
                    quantity={selected.length}
                    onClear={handleClear}
                    onSearch={handleSearch}
                />
            )}
        </>

    )
}
