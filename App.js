import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useMemo, useRef, useState } from 'react';
import IconButton from './components/IconButton';
import CircleButton from './components/CircleButton';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomModal from './components/BottomModal';
import Toast from 'react-native-toast-message';

const PlaceholderImage = require('./assets/images/background-image.png')

export default function App() {

  const imageRef = useRef();

  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [pickedEmojis, setPickedEmojis] = useState([]);
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
      Toast.show({
        type: 'error',
        text1: 'You did not select any image'
      });
    }
  }

  const onReset = () => {
    setShowAppOptions(false);
    setPickedEmojis([]);
    setSelectedImage(null);
  }


  const onSaveImage = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        format: 'png',
        quality: 1,
      });

      if (localUri) {
        await MediaLibrary.saveToLibraryAsync(localUri);
        Toast.show({
          type: 'success',
          text1: 'Saved'
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addEmoji = (emoji) => {
    setPickedEmojis([...pickedEmojis, emoji]);
  };


  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);


  if (status === null) {
    requestPermission();
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.container}>
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
                  imageSize={60}
                  stickerSource={emoji}
                />
              ))}
            </View>
          </View>
          {showAppOptions ? (
            <View style={styles.optionsContainer}>
              <View style={styles.optionsRow}>
                <IconButton icon="refresh" label="Reset" onPress={onReset} />
                <CircleButton onPress={handlePresentModalPress} />
                <IconButton icon="save" label="Save" onPress={onSaveImage} />
              </View>
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <Button label="Choose a photo" theme='primary' onPress={pickImage} />
              <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
            </View>
          )}
          <BottomModal
            bottomSheetModalRef={bottomSheetModalRef}
            snapPoints={snapPoints}
          >
            <EmojiList onSelect={addEmoji} />
          </BottomModal>
          <StatusBar style="light" />
        </View>
        <Toast />
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
