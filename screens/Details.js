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
                setIngredients(getIngredients(json.drinks[0]));
            })
            .catch(error => console.error(error));
    }, []);

    const getIngredients = (drink) => {
        const ingredients = [];
        for (let i = 1; i <= 25; i++) {
            const ingredientName = drink['strIngredient' + i];
            if (ingredientName != null) {
                const ingredientMeasurement = drink['strMeasure' + i];
                const ingredientImage = `https://www.thecocktaildb.com/images/ingredients/${ingredientName}-Small.png`;
                if (ingredientMeasurement == null) {
                    ingredients.push({ name: ingredientName, measurement: "at your convenience", image: ingredientImage });
                } else {
                    ingredients.push({ name: ingredientName, measurement: ingredientMeasurement, image: ingredientImage });
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

            <View style={styles.cardContainer}>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={handleBack}>
                    <Ionicons style={styles.icon} name='arrow-back-circle' size={55} color="black" />
                </TouchableOpacity>
            </View>
                <Text style={styles.title}>{strDrink}</Text>
                <Image source={{ uri: strDrinkThumb }} style={styles.image} />
                <Text style={styles.titleS}>Ingredients : </Text>
                {ingredients.map((ingredient, index) => (
                    <>
                    <Image source={{ uri: ingredient.image }} style={styles.ingredientImage}/>
                    <Text style={styles.ingredientText}>{ingredient.name} : {ingredient.measurement}</Text>
                    </>
                ))}
                <Text style={styles.titleS}>Preparation : </Text>
                <Text style={styles.instructions}>{strInstructions}</Text>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"white",
    },
    cardContainer:{
        backgroundColor: "#f1f1f1",
        borderRadius: 10,
        padding: 10,
        marginLeft: 20,
        marginTop:50,
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
    iconContainer: {
       padding:10,
      },
    ingredientsContainer: {
        flex: 1,
        padding: 10,
    },
    ingredientImage:{
        width:90,
        height:90,
        alignSelf:"center",
        margin:10
    },
    ingredientText: {
        fontSize: 16,
        marginBottom: 5,
        margin: 10,
        textAlign: 'center',
    },
    image: {
        width: '80%',
        height: 250,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: 20,
        alignSelf:"center",
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
    },
    titleS: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
        textDecorationLine: "underline"
    },
    instructions: {
        fontSize: 16,
        margin: 10,
        textAlign: 'center',
        paddingBottom: 60
    },
});