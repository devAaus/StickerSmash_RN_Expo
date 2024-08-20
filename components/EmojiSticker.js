import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function EmojiSticker({ imageSize, stickerSource }) {
   const scaleImage = useSharedValue(imageSize);
   const doubleTap = Gesture.Tap()
      .numberOfTaps(2)
      .onStart(() => {
         scaleImage.value = scaleImage.value === imageSize ? imageSize * 2 : imageSize;
      });

   const imageStyle = useAnimatedStyle(() => ({
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
   }));

   const translateX = useSharedValue(0);
   const translateY = useSharedValue(0);
   const drag = Gesture.Pan()
      .onChange((event) => {
         translateX.value += event.changeX;
         translateY.value += event.changeY;
      });

   const containerStyle = useAnimatedStyle(() => ({
      transform: [
         { translateX: withSpring(translateX.value) },
         { translateY: withSpring(translateY.value) },
      ],
   }));

   return (
      <GestureDetector gesture={drag}>
         <Animated.View style={[containerStyle, { position: 'absolute' }]}>
            <GestureDetector gesture={doubleTap}>
               <Animated.Image
                  source={stickerSource}
                  resizeMode="contain"
                  style={[imageStyle, { width: imageSize, height: imageSize }]}
               />
            </GestureDetector>
         </Animated.View>
      </GestureDetector>
   );
}
