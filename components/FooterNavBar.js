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
            <Ionicons style={[styles.menuItem, isHomeClicked && styles.focusText]} name='home' size={45}/>
            
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
                setIsHomeClicked(false);
                setIsMonthCocktailClicked(true);
                onPressMonthCocktail();
            }}>
            <Ionicons style={[styles.menuItem, isMonthCocktailClicked && styles.focusText]} name='cafe' size={45}/>
        </TouchableOpacity>
        </View>
    )
  };

const styles = StyleSheet.create({
      bodyContainer:{
        width:'100%',
          flexDirection: 'row',
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#f1f1f1',
          justifyContent:"space-around",
          padding: 10,
          paddingBottom:10,
      },
      menuItem: {
          color: 'gray',
      },
      focusText: {
        color: "#95190C",
    },
  });
  export default FooterNavBar;