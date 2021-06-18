import React, {Component} from 'react';
import {StatusBar, Dimensions, StyleSheet, View, Animated} from 'react-native';
import dayjs from 'dayjs';
const {width} = Dimensions.get('screen');
const SIZE = width * 0.9;
const TICK_INTERVAL = 1000;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: new Animated.Value(0),
      tick: new Animated.Value(0),
    };
  }

  _timer = 0;
  _ticker = null;

  componentDidMount = () => {
    const current = dayjs();
    console.log('current: ', current);
    const diff = current.endOf('day').diff(current, 'seconds');
    console.log('diff: ', diff);
    const oneDay = 24 * 60 * 60;
    console.log('oneDay: ', oneDay);
    this._timer = oneDay - diff;
    console.log('this._timer: ', this._timer);
    this.state.tick.setValue(this._timer);

    this._animate();

    this._ticker = setInterval(() => {
      this._timer += 1;
      this.state.tick.setValue(this._timer);
    }, TICK_INTERVAL);
  };

  componentWillUnmount = () => {
    clearInterval(this._ticker);
    this._ticker = null;
  };

  _animate = () => {
    Animated.timing(this.state.index, {
      toValue: this.state.tick,
      duration: TICK_INTERVAL / 2,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const {index} = this.state;
    const interpolated = {
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg'],
    };
    const secDegree = Animated.multiply(index, 6);
    const transformSec = {
      transform: [{rotate: secDegree.interpolate(interpolated)}],
    };
    const rotateMin = Animated.divide(secDegree, new Animated.Value(60));
    const transformMin = {
      transform: [{rotate: rotateMin.interpolate(interpolated)}],
    };
    const rotateHour = Animated.divide(secDegree, new Animated.Value(12));
    const transformHour = {
      transform: [{rotate: rotateHour.interpolate(interpolated)}],
    };

    return (
      <View style={styles.container}>
        <View style={styles.big} />
        <View style={styles.medium} />
        <View style={styles.small} />
        <Animated.View style={[styles.rotate, transformHour]}>
          <View style={styles.hour} />
        </Animated.View>
        <Animated.View style={[styles.rotate, transformMin]}>
          <View style={styles.min} />
        </Animated.View>
        <Animated.View style={[styles.rotate, transformSec]}>
          <View style={styles.sec} />
        </Animated.View>
        <View style={styles.pole} />
        <StatusBar hidden={true} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#232628',
  },

  big: {
    width: SIZE * 0.9,
    aspectRatio: 1,
    borderRadius: SIZE * 0.1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    position: 'absolute',
  },
  medium: {
    width: SIZE * 0.7,
    aspectRatio: 1,
    borderRadius: SIZE * 0.06,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    position: 'absolute',
  },
  small: {
    width: SIZE * 0.5,
    aspectRatio: 1,
    borderRadius: SIZE * 0.04,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    position: 'absolute',
  },

  rotate: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  hour: {
    height: '26%',
    marginTop: '25%',
    width: 5,
    borderRadius: 100,
    backgroundColor: '#fff',
  },
  min: {
    height: '30%',
    marginTop: '20%',
    width: 2,
    borderRadius: 100,
    backgroundColor: '#fff',
  },
  sec: {
    height: '60%',
    marginTop: '6%',
    width: 0.5,
    borderRadius: 100,
    backgroundColor: '#fff',
  },
  pole: {
    width: SIZE * 0.03,
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
});

// import React from 'react';
// import {
//   StatusBar,
//   ImageBackground,
//   StyleSheet,
//   View,
//   Animated,
// } from 'react-native';
// const bg =
//   'https://images.unsplash.com/photo-1569817480240-41de5e7283c9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODJ8fHJhaW58ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60';
// export default function App() {
//   const value = React.useRef(new Animated.Value(0)).current;
//   React.useEffect(() => {
//     Animated.timing(value, {
//       toValue: 360,
//       duration: 500,
//       useNativeDriver: true,
//     });
//   });
//   return (
//     <>
//       <ImageBackground source={{uri: bg}} style={styles.bg}>
//         {/* Clock */}
//         <View style={styles.clock}>
//           <View style={styles.sec} />
//           <View
//             style={{
//               ...styles.min,
//               transform: [
//                 {
//                   rotate: '1deg',
//                 },
//               ],
//             }}
//           />
//           <View style={styles.hour} />
//           <View style={styles.pole} />
//         </View>
//       </ImageBackground>
//       <StatusBar hidden={true} />
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   bg: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   clock: {
//     position: 'absolute',
//     backgroundColor: 'rgba(255,255,255, .2)',
//     width: 300,
//     aspectRatio: 1,
//     borderRadius: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   sec: {
//     width: 1,
//     height: 180,
//     backgroundColor: '#fff',
//     borderRadius: 50,
//     position: 'absolute',
//     transform: [{rotate: '155deg'}, {translateY: 60}],
//   },
//   min: {
//     width: 3,
//     height: 120,
//     backgroundColor: '#fff',
//     borderRadius: 50,
//     position: 'absolute',
//     transform: [{translateY: 60}],
//   },
//   hour: {
//     width: 5,
//     height: 60,
//     backgroundColor: '#fff',
//     borderRadius: 50,
//     position: 'absolute',
//     transform: [{rotate: '125deg'}, {translateY: 30}],
//   },
//   pole: {
//     width: 20,
//     height: 20,
//     backgroundColor: '#fff',
//     borderRadius: 50,
//   },
// });
