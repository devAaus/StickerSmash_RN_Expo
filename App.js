import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';


const PlaceholderImage = require('./assets/images/background-image.png')

export default function App() {

  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      console.log(result)
      setSelectedImage(result.assets[0].uri)
    } else {
      alert('You did not select any image')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer PlaceholderImage={PlaceholderImage} selectedImage={selectedImage} />
      </View>
      <View style={styles.buttonContainer}>
        <Button label="Choose a photo" theme='primary' onPress={pickImage} />
        <Button label="Use this photo" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  buttonContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
