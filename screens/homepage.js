import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Easing, ImageBackground } from 'react-native';

const HomePage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [sequence, setSequence] = useState([]);
  const shakeAnim = new Animated.Value(0);

  const handleStart = () => {
    navigation.navigate('Categories'); 
  };

  const handleCalculatorPress = (number) => {
    console.log('Button pressed:', number);
    const newSequence = [...sequence, number];
    console.log('Current sequence:', newSequence);
    setSequence(newSequence);
    
    if (newSequence.length === 4) {
      console.log('Checking sequence:', newSequence.join(''));
      if (newSequence.join('') === '2451') {
        console.log('Correct sequence! Navigating to AdminPanel');
        navigation.navigate('AdminPanel');
      } else {
        console.log('Wrong sequence');
      }
      setSequence([]); // Reset sequence after 4 numbers
    }
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: -5,
          duration: 100,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 5,
          duration: 100,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 100,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <ImageBackground
      source={require('../assets/images/bg_img2.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.label}>Enter Name: </Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Type your name"
          placeholderTextColor="#a05c2a"
        />
        <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
          <TouchableOpacity style={styles.startButton} onPress={handleStart}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>      {/* Calculator Buttons - only the circled ones */}      <View style={[styles.calculatorContainer, { bottom: 200, right: 50 }]}>
        <TouchableOpacity
          onPress={() => handleCalculatorPress(1)}
          style={[styles.calculatorButton, { top: 90, left: 10 }]}
        >
          <Text style={styles.calculatorButtonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleCalculatorPress(2)}
          style={[styles.calculatorButton, { top: 90, left: 45 }]}
        >
          <Text style={styles.calculatorButtonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleCalculatorPress(4)}
          style={[styles.calculatorButton, { top: 125, left: 10 }]}
        >
          <Text style={styles.calculatorButtonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleCalculatorPress(5)}
          style={[styles.calculatorButton, { top: 125, left: 45 }]}
        >
          <Text style={styles.calculatorButtonText}>5</Text>
        </TouchableOpacity>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, 
  },
  label: { 
    fontSize: 32, 
    color: '#3e1b0f', 
    marginBottom: 10, 
    fontWeight: 'bold' 
  },
  input: { 
    width: '80%', 
    padding: 10, 
    marginBottom: 20, 
    backgroundColor: '#f0f0f0', 
    borderRadius: 5 
  },
  startButton: {
    backgroundColor: '#c2641c',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
    zIndex: 1,
  },
  buttonText: { 
    color: 'white', 
    fontSize: 28, 
    fontFamily: 'sans-serif-medium' 
  },  calculatorContainer: {
    position: 'absolute',
    width: 120,
    height: 160,
    backgroundColor: 'transparent',
  },
  calculatorButton: {
    position: 'absolute',
    width: 25,
    height: 25,
    backgroundColor: '#c2641c',
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calculatorButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  }
});

export default HomePage;