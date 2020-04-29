import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Tasks</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ADFC92',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    marginBottom: 30,
    marginTop: 20,
    elevation: 10,
    borderWidth: 2,
    borderColor: '#4A0D67',
    borderRadius: 5,
    marginHorizontal: 3,
  },
  text: {
    color: '#473198',
    fontSize: 40,
    fontFamily: 'Montserrat-ExtraBold',
  },
});
