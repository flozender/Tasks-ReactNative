import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from './components/header';
import ListItem from './components/list-item';

const App = () => {
  const getStoredTasks = async () => {
    let storedTasks = [];
    try {
      storedTasks = (await AsyncStorage.getItem('my_tasks')) || [];
    } catch (err) {
      console.log('err', err);
    }
    return storedTasks;
  };

  const storeTasks = async () => {};

  const [tasks, setTasks] = useState([{id: Math.random(), text: 'dsfs'}]);
  const [text, setText] = useState('');

  const addTask = () => {
    setTasks([...tasks, {id: Math.random(), text: text}]);
    setText('');
  };

  const changeText = (t) => {
    setText(t);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.body}>
        <FlatList
          data={tasks}
          renderItem={({index, item}) => {
            return (
              <ListItem key={index} item={item} handlePress={deleteTask} />
            );
          }}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={() => <Header />}
        />
      </SafeAreaView>
      <View style={styles.addTask}>
        <TextInput
          style={styles.input}
          onChangeText={changeText}
          value={text}
          placeholder={'Add a new task...'}
        />
        <TouchableOpacity style={styles.plusButton} onPress={addTask}>
          <Icon name="plus" style={styles.plus} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#DAFFED',
    height: '100%',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    padding: 10,
  },
  input: {
    width: '75%',
    borderBottomWidth: 2,
    borderBottomColor: '#4A0D67',
    fontFamily: 'PatrickHand-Regular',
    fontSize: 20,
  },
  addTask: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 60,
    marginBottom: 10,
  },
  plusButton: {
    width: '13%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: '#4A0D67',
    borderRadius: 50,
    height: '90%',
  },
  plus: {
    color: 'white',
    margin: '40%',
  },
});
