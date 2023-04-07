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
            <Image source={{ uri: cocktails.strDrinkThumb }} style={styles.image} />
            <Text style={styles.title}>{cocktails.strDrink}</Text>
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
        backgroundColor: '#ffbf00',
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