import { Alert, ScrollView } from "react-native"

import { styles } from "./styles"
import Ingredient from "../ingredient"
import { useState } from "react"
import { Selected } from "../selected"

export default function Ingredients() {
    const [selected, setSelected] = useState<string[]>([])

    function handleSelect(name: string) {
        if (selected.includes(name)) {
            setSelected(selected.filter((item) => item !== name))
        } else {
            setSelected([...selected, name])
        }
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

    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}
            >
                {Array.from({ length: 100 }).map((_, index) => (
                    <Ingredient
                        selected={selected.includes(index.toString())}
                        key={index}
                        name="Apple"
                        image="../../assets/images/apple.png"
                        onPress={() => handleSelect(index.toString())}
                    />
                ))}
            </ScrollView>
            {selected.length > 0 && (
                <Selected
                    quantity={selected.length}
                    onClear={handleClear}
                    onSearch={() => { }}
                />
            )}
        </>

    )
}
