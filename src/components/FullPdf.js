import React from 'react';
import {
  Modal,
  View,
  SafeAreaView,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import PDFView from 'react-native-view-pdf';
import CloseCTA from './CloseCTA';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const FullPdf = ({uri, visible, onRequestClose, pdfIndicator}) => {
  const resourceType = 'url';
  const resources = {
    file:
      Platform.OS === 'ios'
        ? 'downloadedDocument.pdf'
        : '/sdcard/Download/downloadedDocument.pdf',
    url: uri,
    base64: 'JVBERi0xLjMKJcfs...',
  };

  // console.log('pdfIndicator', pdfIndicator,resources[resourceType]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={visible}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <View style={styles.modal}>
            {pdfIndicator == true ? (
              <ActivityIndicator size="large" color="#ffffff" />
            ) : (
              <PDFView
                fadeInDuration={250.0}
                style={{width: wp('100%'), height: hp('100%'), top: hp('10%')}}
                resource={resources[resourceType]}
                resourceType={resourceType}
                onLoad={() => {
                  console.log(`PDF rendered from ${resourceType}`);
                }}
                onError={error => console.log('Cannot render PDF', error)}
              />
            )}
          </View>
          <CloseCTA
            topHeight={hp('4%')}
            color={'white'}
            onPress={() => {
              onRequestClose();
            }}
          />
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    marginTop: 30,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  text: {
    color: '#3f2949',
    marginTop: 50,
  },
});

export default FullPdf;
