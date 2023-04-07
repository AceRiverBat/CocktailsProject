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

    const [cocktails, setCocktails] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

    useEffect(() => {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((json) => {
                setCocktails(json.drinks[0]);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleNewCocktail = () => {
        fetch(apiUrl)
        .then((response) => response.json())
        .then((json) => {
            setCocktails(json.drinks[0]);
        })
        .catch((error) => {
            console.error(error);
        });
    };

    useEffect(() => {
        if (cocktails && cocktails.strDrink) {
            const apiUrlingredients = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktails.strDrink}`;

            fetch(apiUrlingredients)
                .then(response => response.json())
                .then(json => {
                    setIngredients(getIngredients(json.drinks[0]));
                })
                .catch(error => console.error(error));
        }
    }, [cocktails]);

    const getIngredients = (drink) => {
        const ingredients = [];
        for (let i = 1; drink[`strIngredient${i}`] && i <= 15; i++) {
            const ingredientName = drink[`strIngredient${i}`];
            const ingredientMeasurement = drink[`strMeasure${i}`];
            const ingredientImage = `https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(ingredientName)}-Small.png`;
            if (ingredientMeasurement == null) {
                ingredients.push({ name: ingredientName, measurement: "at your convenience", image: ingredientImage });
            } else {
                ingredients.push({ name: ingredientName, measurement: ingredientMeasurement, image: ingredientImage });
            }
        }

        console.log(ingredients)
        return ingredients;
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.titleRandom}>Randomly Cocktail</Text>
            <View style={styles.cardContainer}>
            <Text style={styles.title}>{cocktails.strDrink}</Text>
            <Image source={{ uri: cocktails.strDrinkThumb }} style={styles.image} />
            <View style={styles.ingredientsContainer}>
            <Text style={styles.titleS}>Ingredients : </Text>
            {ingredients.map((ingredient, index) => (
                    <>
                    <Image source={{ uri: ingredient.image }} style={styles.ingredientImage}/>
                    <Text style={styles.ingredientText}>{ingredient.name} : {ingredient.measurement}</Text>
                    </>
                ))}
            </View>
            <Text style={styles.titleS}>Preparation : </Text>
                <Text style={styles.instructions}>{cocktails.strInstructions}</Text>
            <TouchableOpacity style={styles.button} onPress={handleNewCocktail}>
                <Text style={styles.buttonText}>Nouveau cocktail</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    ingredientText: {
        fontSize: 16,
        marginBottom: 5,
        margin: 10,
        textAlign: 'center',
    },
    cardContainer:{
        backgroundColor: "#f1f1f1",
        borderRadius: 10,
        padding: 20,
        marginLeft: 20,
        marginRight: 20,
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 1,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        elevation: 2,
    },
    ingredientImage:{
        width:90,
        height:90,
        alignSelf:"center",
        margin:10
    },
    instructions: {
        fontSize: 16,
        margin: 10,
        textAlign: 'center',
    },
    image: {
        width: '80%',
        height: 250,
        resizeMode: 'contain',
        borderRadius: 10,
        marginBottom: 20,
        alignSelf:"center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    titleRandom: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30,
        marginTop: 60,
        margin: 10,
    },
    titleS: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
        textDecorationLine: "underline"
    },
    button: {
        backgroundColor: '#000000',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 20,
        alignSelf:"center",
        marginBottom:90,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color:"white"
    },
});