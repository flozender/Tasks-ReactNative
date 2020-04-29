import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ListItem = ({item, handlePress}) => {
  const {id, text} = item;
  return (
    <View style={styles.body}>
      <Text style={styles.text}>{text}</Text>
      <Icon
        name="remove"
        style={styles.remove}
        onPress={() => handlePress(id)}
      />
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#473198',
    padding: 10,
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#ADFC92',
    fontSize: 28,
    fontFamily: 'PatrickHand-Regular',
    paddingHorizontal: 10,
  },
  remove: {
    fontSize: 35,
    color: 'firebrick',
  },
});
