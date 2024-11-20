import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito'
import { Raleway_700Bold } from '@expo-google-fonts/raleway'
import { useFonts } from 'expo-font';
import { View, Text, Image, TouchableOpacity } from "react-native";
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '@/styles/onboarding/Onboard';
import { router } from 'expo-router';

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
      <View style={styles.firstContainer}>
      <View>
        <Image
            source={require("@/assets/images/logo.jpeg")} 
            style={styles.logo}
        />
        <Image source={require("@/assets/onboarding/shape_9.png")}/>
      </View>
      <View style={styles.titleWrapper}>
        <Image style={styles.titleTextShape1} source={require("@/assets/onboarding/shape_3.png")}/>
        <Text style={[styles.titleText, {fontFamily: "Raleway_700Bold"}]}>
            Start Learning With
        </Text>
        <Image style={styles.titleTextShape1} source={require("@/assets/onboarding/shape_2.png")}/>
      </View>
      <View>
        <Image
          style={styles.titleShape3}
          source={require("@/assets/onboarding/shape_6.png")}
        />
        <Text style={[styles.titleText, { fontFamily: "Raleway_700Bold" }]}>
            Delacademy
          </Text>
        </View>
        <View style={styles.dscWrapper}>
          <Text style={[styles.dscpText, { fontFamily: "Nunito_400Regular" }]}>
            Explore a variety of interactive lesson,
          </Text>
          <Text style={[styles.dscpText, { fontFamily: "Nunito_400Regular" }]}>
            video, quizze & assignment.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() => router.push("/(routes)/welcome-intro")}
        >
          <Text style={[styles.buttonText, { fontFamily: "Nunito_700Bold" }]}>
            Getting Started
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

export default OnboardingScreen