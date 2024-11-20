import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const TabsLayout = () => {
  return (
   <Tabs
        screenOptions={{}}
   >
        <Tabs.Screen name='home/index' />
        <Tabs.Screen name='search/index' />
        <Tabs.Screen name='courses/index' />
        <Tabs.Screen name='profile/index' />
   </Tabs>
  )
}

export default TabsLayout

const styles = StyleSheet.create({})