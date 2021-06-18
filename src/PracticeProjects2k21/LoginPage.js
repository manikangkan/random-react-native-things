import React from 'react';
import {
  ImageBackground,
  Animated,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');
const bg =
  'https://images.unsplash.com/photo-1507027682794-35e6c12ad5b4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bmF0dXJlJTIwcmFpbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60';

export default function App() {
  const buttonOpacity = React.useRef(new Animated.Value(1)).current;
  const onStateChange = () => {
    Animated.timing(buttonOpacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  return (
    <>
      <ImageBackground source={{uri: bg}} style={styles.bg}>
        <View style={styles.buttonContainer}>
          <TapGestureHandler onHandlerStateChange={onStateChange}>
            <Animated.View style={{...styles.button, opacity: buttonOpacity}}>
              <Text style={styles.buttonText}>Sign In</Text>
            </Animated.View>
          </TapGestureHandler>
          <View style={[styles.button, styles.dribbbleBg]}>
            <Text style={[styles.buttonText, styles.dribbbleText]}>
              Sign In with Dribbble
            </Text>
          </View>
        </View>
      </ImageBackground>
      <StatusBar hidden={true} />
    </>
  );
}

const styles = StyleSheet.create({
  bg: {flex: 1, justifyContent: 'flex-end'},
  buttonContainer: {
    height: height / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: width / 1.2,
    height: height / 12,
    backgroundColor: 'rgba(255, 255, 255,.6)',
    borderRadius: 10,
    marginVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'poppins-medium',
  },
  dribbbleBg: {
    backgroundColor: 'rgba(234, 76, 137, .6)',
    color: '#fff',
  },
  dribbbleText: {
    color: '#fff',
  },
});
