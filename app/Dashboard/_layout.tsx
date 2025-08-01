import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="seeAllAnnouncements" options={{ headerShown: false }} />
      {/* <Stack.Screen name="+not-found" /> */}
    </Stack>
  )
}

export default _layout

const styles = StyleSheet.create({})