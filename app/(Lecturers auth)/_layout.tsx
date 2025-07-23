import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="lecturerSignIn" options={{ headerShown: false }} />
      <Stack.Screen name="lecturerSignup" options={{ headerShown: false }} />
      <Stack.Screen name="lecturerForgotPassword" options={{ headerShown: false }} />
      {/* <Stack.Screen name="+not-found" /> */}
    </Stack>
  )
}

export default _layout

const styles = StyleSheet.create({})