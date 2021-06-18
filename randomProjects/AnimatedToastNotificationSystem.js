/* eslint-disable prettier/prettier */
// Animated Toast Notification System
import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  Text,
  View,
  StatusBar,
  Animated,
} from 'react-native';
const bg =
  'https://images.unsplash.com/photo-1541695221650-0a5d9c8a143a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTEzfHxyYWlueXxlbnwwfDF8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60';
const userProf =
  'https://images.unsplash.com/photo-1612793884587-7d011e99143c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHBvdHJhaXR8ZW58MHwxfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60';

function Notifications({item, vanish}) {
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(4000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => vanish());
  }, [opacity]);

  return (
    <Animated.View
      style={{
        ...styles.notificationWrapper,
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          },
        ],
      }}>
      <View style={styles.messageWrapper}>
        <Image
          style={styles.avatar}
          source={{
            uri: userProf,
          }}
        />
        <View style={styles.usernameAndMessage}>
          <Text style={styles.userName}>Manikangkan Das</Text>
          <Text style={styles.notificationContent}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>
        </View>
        <Text style={styles.id}>{item}</Text>
      </View>
    </Animated.View>
  );
}

export default () => {
  const [notification, setNotification] = React.useState([]);
  return (
    <>
      <ImageBackground
        style={styles.image}
        source={{
          uri: bg,
        }}>
        <ScrollView
          contentContainerStyle={styles.messages}
          showsVerticalScrollIndicator={false}>
          {notification.map(item => (
            <Notifications
              key={item}
              item={item}
              vanish={() => {
                setNotification(notification =>
                  notification.filter(
                    currentNotification => currentNotification !== item,
                  ),
                );
              }}
            />
          ))}
        </ScrollView>

        {/*Push notification */}
        <TouchableOpacity
          style={styles.pushNotification}
          onPress={() =>
            setNotification([
              ...notification,
              Math.trunc(Math.random() * 10000),
            ])
          }>
          <Text style={styles.pnText}>Push Notification</Text>
        </TouchableOpacity>
      </ImageBackground>
      <StatusBar hidden={true} />
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  messages: {
    alignItems: 'center',
  },
  notificationWrapper: {
    width: '96%',
    marginTop: 6,
    borderRadius: 16,
    overflow: 'hidden',
  },
  messageWrapper: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255, .4)',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  usernameAndMessage: {
    width: '86%',
    paddingHorizontal: 10,
  },
  userName: {
    color: '#000',
    fontFamily: 'poppins-semibold',
    fontSize: 12,
  },
  notificationContent: {
    color: '#000',
    fontFamily: 'poppins-medium',
    fontSize: 10,
  },
  pushNotification: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, .4)',
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 10,
    position: 'absolute',
    bottom: 0,
  },
  pnText: {
    color: '#000',
    fontFamily: 'poppins-medium',
    fontSize: 12,
    padding: 10,
    textAlign: 'center',
  },
  id: {
    backgroundColor: '#000',
    color: '#fff',
    paddingHorizontal: 8,
    paddingTop: 2,
    fontSize: 10,
    borderRadius: 10,
    position: 'absolute',
    right: 6,
    top: 6,
    fontFamily: 'poppins-regular',
  },
});
