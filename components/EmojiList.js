import { useState } from 'react';
import { StyleSheet, FlatList, Image, Platform, Pressable, View, ScrollView } from 'react-native';

const emojis = [
   require('../assets/images/emoji1.png'),
   require('../assets/images/emoji2.png'),
   require('../assets/images/emoji3.png'),
   require('../assets/images/emoji4.png'),
   require('../assets/images/emoji5.png'),
   require('../assets/images/emoji6.png'),
   require('../assets/images/emoji7.png'),
   require('../assets/images/emoji8.png'),
   require('../assets/images/emoji9.png'),
   require('../assets/images/emoji10.png'),
   require('../assets/images/emoji11.png'),
   require('../assets/images/emoji12.png'),
   require('../assets/images/emoji13.png'),
   require('../assets/images/emoji14.png'),
   require('../assets/images/emoji15.png'),
   require('../assets/images/emoji16.png'),
   require('../assets/images/emoji17.png'),
   require('../assets/images/emoji18.png'),
   require('../assets/images/emoji19.png'),
   require('../assets/images/emoji20.png'),
];

export default function EmojiList({ onSelect, onCloseModal }) {
   const [emoji] = useState(emojis);

   return (
      <ScrollView>
         <View style={styles.listContainer}>
            {emoji.map((item) => (
               <Pressable
                  onPress={() => {
                     onSelect(item);
                     onCloseModal();
                  }}
                  key={item}
               >
                  <Image source={item} style={styles.image} />
               </Pressable>
            ))}
         </View>
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   listContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 2
   },
   image: {
      width: 50,
      height: 50,
      margin: 10,
   },
});
