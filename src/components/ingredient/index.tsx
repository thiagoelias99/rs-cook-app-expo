import { Pressable, PressableProps, Image, Text } from "react-native"

import { styles } from "./styles"

interface IngredientProps extends PressableProps {
    name: string
    image: string
    selected?: boolean
}

export default function Ingredient({ name, image, selected, ...rest }: IngredientProps) {
    return (
        <Pressable
            style={[styles.container, selected && styles.selected]}
            {...rest}
            >
            <Image
                style={styles.image}
                source={{ uri: image}} 
                />
            <Text
                style={styles.title}
            >{name}</Text>
        </Pressable>
    )
}
