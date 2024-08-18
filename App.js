import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import * as ImagePicker from 'expo-image-picker';
import { useRef, useState } from 'react';
import IconButton from './components/IconButton';
import CircleButton from './components/CircleButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import { toast, Toasts } from '@backpackapp-io/react-native-toast';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const PlaceholderImage = require('./assets/images/background-image.png')

export default function App() {

  const imageRef = useRef();

  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmojis, setPickedEmojis] = useState([]); // Change to array
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
      setShowAppOptions(true)
    } else {
      toast.error('You did not select any image')
    }
  }

  const onReset = () => {
    setShowAppOptions(false);
    setPickedEmojis([]);
    setSelectedImage(null);
  }

  const onAddSticker = () => {
    setIsModalVisible(true);
  }

  const onSaveImage = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        format: 'png',
        quality: 1,
      });

      if (localUri) {
        await MediaLibrary.saveToLibraryAsync(localUri);
        toast.success("Saved!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const addEmoji = (emoji) => {
    setPickedEmojis([...pickedEmojis, emoji]);
  };

  if (status === null) {
    requestPermission();
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.container}>
        <Toasts />
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <View ref={imageRef} collapsable={false}>
              <ImageViewer
                placeholderImageSource={PlaceholderImage}
                selectedImage={selectedImage}
              />
              {pickedEmojis.map((emoji, index) => (
                <EmojiSticker
                  key={index}
                  imageSize={40}
                  stickerSource={emoji}
                />
              ))}
            </View>
          </View>
          {showAppOptions ? (
            <View style={styles.optionsContainer}>
              <View style={styles.optionsRow}>
                <IconButton icon="refresh" label="Reset" onPress={onReset} />
                <CircleButton onPress={onAddSticker} />
                <IconButton icon="save" label="Save" onPress={onSaveImage} />
              </View>
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <Button label="Choose a photo" theme='primary' onPress={pickImage} />
              <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
            </View>
          )}
          <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
            <EmojiList onSelect={addEmoji} onCloseModal={onModalClose} />
          </EmojiPicker>
          <StatusBar style="light" />
        </View>
      </GestureHandlerRootView>
    </SafeAreaProvider>
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
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 50,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
