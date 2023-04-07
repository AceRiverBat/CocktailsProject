import React, { useState } from 'react';
import HomeComponent from "../components/HomeComponent"
import MonthCocktail from "../components/MonthCocktail"
import FooterNavBar from '../components/FooterNavBar';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
  } from "react-native";
  
export default function Home() {

    const [ShowHome, setShowHome] = useState(true);
    const [ShowMonthCocktail, setShowMonthCocktail] = useState(false);

    return (
        <>
        <ScrollView style={{ backgroundColor: 'white' }}>
        
        {
            ShowHome == true ?
            <View>
                <HomeComponent/>
            </View>
            :
            ShowMonthCocktail == true ?
            <MonthCocktail/>
            :
            <View>
            </View>
        }
        </ScrollView>
        <FooterNavBar
        onPresshome={() => {setShowHome(true); setShowMonthCocktail(false)}} 
        onPressMonthCocktail={() =>{setShowHome(false); setShowMonthCocktail(true)}}
        />
        </>
    );
}
