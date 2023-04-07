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
        navigation.navigate('Details', { strDrink: cocktail.strDrink, strDrinkThumb: cocktail.strDrinkThumb, strInstructions: cocktail.strInstructions,});
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.titleRandom}>Cocktail Recipes :</Text>
            {cocktails.map((cocktail) => (
                <TouchableWithoutFeedback key={cocktail.idDrink} onPress={() => handleCardPress(cocktail)}>
                    <View style={styles.card}>
                        <Text style={styles.title}>{cocktail.strDrink}</Text>
                        <Image source={{ uri: cocktail.strDrinkThumb }} style={styles.image} />
                    </View>
                </TouchableWithoutFeedback>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1D1C1D',
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
        marginBottom: 10,
        textAlign: "center",
    },
    titleRandom: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        color:"white",
        marginBottom:30,
        marginTop:60,
        textDecorationLine: "underline"
    },
    image: {
        width: 300,
        height:200,
        resizeMode: "cover",
        borderRadius: 10,
    },
});