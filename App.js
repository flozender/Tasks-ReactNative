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
  const [state, setState] = useState({
    tasks: [],
  });
  const [text, setText] = useState('');
  const {tasks} = state;

  useEffect(() => {
    async function getStoredState() {
      try {
        const storedState = JSON.parse(
          await AsyncStorage.getItem('@tasks:state'),
        );
        if (storedState.tasks.length !== 0) {
          setState(storedState);
        }
      } catch (err) {
        console.log('err', err);
      }
    }
    getStoredState();
  }, []);

  const addTask = async () => {
    try {
      if (!text) {
        Alert.alert('Empty task? 👀', 'Please enter a task to add!', [
          {text: 'Okay'},
        ]);
        return;
      }

      const newState = {
        ...state,
        tasks: [...tasks, {id: Math.random(), text: text}],
      };

      setState(newState);
      setText('');

      await AsyncStorage.setItem('@tasks:state', JSON.stringify(newState));
    } catch (err) {
      console.log(err);
    }
  };

  const changeText = (t) => {
    setText(t);
  };

  const deleteTask = async (id) => {
    const newState = {...state, tasks: tasks.filter((task) => task.id !== id)};
    setState(newState);
    await AsyncStorage.setItem('@tasks:state', JSON.stringify(newState));
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
