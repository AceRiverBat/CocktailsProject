import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

const FooterNavBar = ({onPresshome, onPressMonthCocktail}) => {
    const [isHomeClicked, setIsHomeClicked] = useState(true);
    const [isMonthCocktailClicked, setIsMonthCocktailClicked] = useState(false);

    return (
        <View style={styles.bodyContainer}>
        <TouchableOpacity onPress={() => {
                setIsHomeClicked(true);
                setIsMonthCocktailClicked(false);
                onPresshome();
            }}>
            <Ionicons style={[styles.menuItem, isHomeClicked && styles.focusText]} name='home' size={40}/>
            
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
                setIsHomeClicked(false);
                setIsMonthCocktailClicked(true);
                onPressMonthCocktail();
            }}>
            <Ionicons style={[styles.menuItem, isMonthCocktailClicked && styles.focusText]} name='cafe' size={40}/>
        </TouchableOpacity>
        </View>
    )
  };

const styles = StyleSheet.create({
      bodyContainer:{
        width:'85%',
        height:60,
        alignSelf:"center",
          flexDirection: 'row',
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#000000',
          justifyContent:"space-around",
          padding: 10,
          paddingBottom:10,
          borderRadius: '15%',
          marginBottom:20,
      },
      menuItem: {
          color: 'gray',
      },
      focusText: {
        color: "white",
    },
  });
  export default FooterNavBar;