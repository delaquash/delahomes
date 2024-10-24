import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito'
import { Raleway_700Bold } from '@expo-google-fonts/raleway'
import { useFonts } from 'expo-font';
import { View, Text } from "react-native";
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

type Props = {}

const OnboardingScreen = (props: Props) => {
  let [fontsLoaded, fontError ] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_700Bold
  })
  return (
    <LinearGradient
        colors={["E5ECF9, #F6F7F9"]}
        style={{ flex:1, alignItems: "center", justifyContent: "center"}}
    >
      <View>

      </View>
    </LinearGradient>
  )
}

export default OnboardingScreen