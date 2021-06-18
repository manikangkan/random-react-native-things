import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export default function App() {
  const progress = useSharedValue(1);
  const scale = useSharedValue(1);
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [
        {scale: scale.value},
        {rotate: `${progress.value * 2 * Math.PI}rad`},
      ],
    };
  }, []);

  React.useEffect(() => {
    progress.value = withRepeat(withTiming(0.5), 10, true);
    scale.value = withRepeat(withSpring(1), 10, true);
  }, []);
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedView, reanimatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  animatedView: {
    width: 100,
    height: 100,
    borderRadius: 16,
    backgroundColor: '#43a2f2',
  },
});
