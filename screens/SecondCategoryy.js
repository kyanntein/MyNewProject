import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const SecondCategoryy = () => {
  return (
    <ImageBackground
      source={require('../assets/images/bg_img2.jpg')}  // Adjust path as necessary
      style={styles.background}
      resizeMode="cover"
    >
      {/* Add your content here */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default SecondCategoryy;