import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
} from "react-native";
import { Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function Details() {

    const navigation = useNavigation();

    const route = useRoute();
    const { strDrink, strDrinkThumb, strInstructions } = route.params;
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${strDrink}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(json => {
                setIngredients(getIngredients(json.drinks[0])); // Ajouter tous les ingrédients à l'état
            })
            .catch(error => console.error(error));
    }, []);

    const getIngredients = (drink) => {
        const ingredients = [];
        for (let i = 1; i <= 15; i++) {
            const ingredientName = drink['strIngredient' + i];
            if (ingredientName != null) {
                const ingredientMeasurement = drink['strMeasure' + i];
                if (ingredientMeasurement == null) {
                    ingredients.push({ name: ingredientName, measurement: "at your convenience" });
                } else {
                    ingredients.push({ name: ingredientName, measurement: ingredientMeasurement });
                }
            }
        }
        return ingredients;
    };

    const handleBack = () => {
        navigation.navigate('Home');
    };

    return (
        <>
            <ScrollView style={styles.container}>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={handleBack}>
                    <Ionicons style={styles.icon} name='arrow-back-circle' size={50} color="#f1f1f1" />
                </TouchableOpacity>
            </View>
                <Image source={{ uri: strDrinkThumb }} style={styles.image} />
                <Text style={styles.title}>{strDrink}</Text>
                <Text style={styles.titleS}>Ingredients : </Text>
                {ingredients.map((ingredient, index) => (
                    <Text style={styles.ingredientText} key={index}>{ingredient.name}: {ingredient.measurement}</Text>
                ))}
                <Text style={styles.titleS}>Preparation : </Text>
                <Text style={styles.instructions}>{strInstructions}</Text>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D1C1D',
    },
    iconContainer: {
       padding:10,
       marginTop: 60,
      },
    ingredientsContainer: {
        flex: 1,
        padding: 10,
    },
    ingredientText: {
        fontSize: 16,
        marginBottom: 5,
        color: "white",
        margin: 10,
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
        color: "white",
    },
    titleS: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
        color: 'white',
        textDecorationLine: "underline"
    },
    instructions: {
        fontSize: 16,
        margin: 10,
        textAlign: 'center',
        color: "white",
    },
});