import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeComponent() {
    const navigation = useNavigation();
    const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

    const [cocktails, setCocktails] = useState([]);

    useEffect(() => {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((json) => {
                setCocktails(json.drinks);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleCardPress = (cocktail) => {
        navigation.navigate('Details', { strDrink: cocktail.strDrink, strDrinkThumb: cocktail.strDrinkThumb, strInstructions: cocktail.strInstructions, });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.titleRandom}>Cocktail Recipes :</Text>
            <View style={styles.cardContainer}>
                {cocktails.map((cocktail) => (
                    <TouchableWithoutFeedback key={cocktail.idDrink} onPress={() => handleCardPress(cocktail)}>
                        <View style={styles.card}>
                            <Image source={{ uri: cocktail.strDrinkThumb }} style={styles.image} />
                            <Text style={styles.title}>{cocktail.strDrink}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardContainer: {
        flexDirection:'row',
        flexWrap: 'wrap',
    },
    card: {
        alignSelf: "center",
        backgroundColor: "#f1f1f1",
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        margin: 10,
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 1,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        textAlign: "center",
    },
    titleRandom: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30,
        marginTop: 60,
        margin: 10,
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: "cover",
        borderRadius: 10,
    },
});