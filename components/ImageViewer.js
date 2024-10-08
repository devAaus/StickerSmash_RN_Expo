import { Image, StyleSheet } from 'react-native'
import React from 'react'

export default function ImageViewer({ placeholderImageSource, selectedImage }) {

   const imageSource = selectedImage ? { uri: selectedImage } : placeholderImageSource;

   return (
      <Image source={imageSource} style={styles.image} />
   )
}

const styles = StyleSheet.create({
   image: {
      width: 320,
      height: 500,
      borderRadius: 18,
      objectFit: 'contain'
   },
})