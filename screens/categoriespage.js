import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';  

const CategoriesPage = () => {
  const navigation = useNavigation();  

  const handleCategoryClick = (category) => {
    console.log(`${category} clicked`);
    if (category === 'Category 1 (Grade 3-4)') {
      navigation.navigate('FirstCategory');  // Navigate to FirstCategory screen
    }    
    if (category === 'Category 2 (Grade 5-6)') {
      navigation.navigate('SecondCategoryy');  // Navigate to SecondCategoryy screen
    }
  };

  return (    <ImageBackground
      source={require('../assets/images/bg_img2.jpg')}  
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.categoriesContainer}>
        <Text style={styles.title}>Categories</Text>

        {/* Categories */}
        {[
          'Category 1 (Grade 3-4)', 
          'Category 2 (Grade 5-6)', 
          'Category 3 (Grade 7-8)', 
          'Category 4 (Grade 9-10)', 
          'Category 5 (Grade 11-12)'
        ].map((category) => (
          <TouchableOpacity
            key={category}
            style={styles.categoryButton}
            onPress={() => handleCategoryClick(category)}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#3e1b0f',
    marginBottom: 25,  // Adjusted to give space between the title and buttons
    marginTop:40,     // Added marginTop to create space from the top
  },
  categoriesContainer: {
    width: '35%',  // Adjust width to fit buttons better on screen
    alignItems: 'center', 
    justifyContent: 'center',
    marginBottom:70,
    
  },
  categoryButton: {
    backgroundColor: '#c2641c', 
    opacity: 0.9,  
    paddingVertical: 15,  
    paddingHorizontal: 30,  
    marginBottom: 18,  
    borderRadius: 10,  
    borderWidth: 2,
    borderColor: 'white',
    width: '100%',  
    alignItems: 'center',  
    justifyContent: 'center',  
  },
  categoryText: {
    color: 'white',  
    fontSize: 18,  
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)', 
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
});

export default CategoriesPage;