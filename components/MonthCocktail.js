import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";

export default function MonthCocktail() {
    const [cocktail, setCocktail] = useState(null);

    useEffect(() => {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
            .then((response) => response.json())
            .then((json) => setCocktail(json.drinks[0]))
            .catch((error) => console.error(error));
    }, []);

    const handleNewCocktail = () => {
        setCocktail(null);
        fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
            .then((response) => response.json())
            .then((json) => setCocktail(json.drinks[0]))
            .catch((error) => console.error(error));
    };

    if (!cocktail) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Chargement...</Text>
            </View>
        );
    }

    const {
        strDrink,
        strDrinkThumb,
        strInstructions,
        strIngredient1,
        strIngredient2,
        strIngredient3,
    } = cocktail;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.titleRandom}>Randomly Cocktail</Text>
            <Image source={{ uri: strDrinkThumb }} style={styles.image} />
            <Text style={styles.title}>{strDrink}</Text>
            <View style={styles.ingredientsContainer}>
            <Text style={styles.titleS}>Ingredients : </Text>
                <Text style={styles.ingredientText}>{strIngredient1}</Text>
                <Text style={styles.ingredientText}>{strIngredient2}</Text>
                <Text style={styles.ingredientText}>{strIngredient3}</Text>
            </View>
            <Text style={styles.titleS}>Preparation : </Text>
                <Text style={styles.instructions}>{strInstructions}</Text>
            <TouchableOpacity style={styles.button} onPress={handleNewCocktail}>
                <Text style={styles.buttonText}>Nouveau cocktail</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D1C1D',
        paddingTop: 70,
    },
    ingredientText: {
        fontSize: 16,
        marginBottom: 5,
        color: "white",
        margin: 10,
        textAlign: 'center',
    },
    instructions: {
        fontSize: 16,
        margin: 10,
        textAlign: 'center',
        color: "white",
    },
    image: {
        width: '80%',
        height: 250,
        resizeMode: 'contain',
        borderRadius: 10,
        marginBottom: 20,
        alignSelf:"center",
    },
    titleRandom: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        color:"white",
        marginBottom:30,
        textDecorationLine: "underline"
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
        color: 'white',
    },
    titleS: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
        color: 'white',
        textDecorationLine: "underline"
    },
    button: {
        backgroundColor: '#f0c869',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 20,
        alignSelf:"center",
        margin:100,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});