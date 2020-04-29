import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from './components/header';
import ListItem from './components/list-item';

const App = () => {
  useEffect(() => {
    async function getStoredTasks() {
      let storedTasks = [];
      try {
        storedTasks = await AsyncStorage.getItem('@tasks:mytasks');
        console.log('found', storedTasks);
        if (storedTasks !== null) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (err) {
        console.log('err', err);
      }
    }
    getStoredTasks();
  }, []);

  useEffect(() => {
    async function saveTasks() {
      console.log('saving', tasks);
      await AsyncStorage.setItem('@tasks:mytasks', JSON.stringify(tasks));
    }
    if (tasks.length) {
      saveTasks();
    }
  });

  const addTask = async () => {
    try {
      if (!text) {
        Alert.alert('Empty task? 👀', 'Please enter a task to add!', [
          {text: 'Okay'},
        ]);
        return;
      }
      setTasks((tasks) => tasks.concat({id: Math.random(), text: text}));
      console.log('set', text);
      console.log('tasks after set', tasks);

      setText('');
    } catch (err) {
      console.log(err);
    }
  };

  const changeText = (t) => {
    setText(t);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

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
    // backgroundColor: '#DAFFED',
    backgroundColor: 'white',
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
    // borderBottomColor: '#4A0D67',
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
    // backgroundColor: '#4A0D67',
    backgroundColor: 'black',
    borderRadius: 50,
    height: '90%',
  },
  plus: {
    color: 'white',
    margin: '40%',
  },
});
