import { View, StyleSheet, ScrollView } from 'react-native';
import {
   BottomSheetModal,
   BottomSheetView,
   BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

const BottomModal = ({ bottomSheetModalRef, snapPoints, children }) => {

   return (
      <BottomSheetModalProvider>
         <View style={styles.modalContainer}>
            <BottomSheetModal
               ref={bottomSheetModalRef}
               index={1}
               snapPoints={snapPoints}
            >
               <BottomSheetView style={styles.contentContainer}>
                  {children}
               </BottomSheetView>
            </BottomSheetModal>
         </View>
      </BottomSheetModalProvider>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
   },
   contentContainer: {
      flex: 1,
      alignItems: 'center',
   },
});

export default BottomModal;