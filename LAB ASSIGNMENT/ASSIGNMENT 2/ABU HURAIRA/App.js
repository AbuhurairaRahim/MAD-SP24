import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';

const App = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [education, setEducation] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (name.trim() === '' || age.trim() === '' || education.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), name: name, age: age, education: education }]);
    setName('');
    setAge('');
    setEducation('');
  };

  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={text => setName(text)}
        value={name}
        placeholder="Enter Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setAge(text)}
        value={age}
        placeholder="Enter Age"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setEducation(text)}
        value={education}
        placeholder="Enter Education"
      />
      <Button onPress={addTask} title="Add Task" />
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <View>
              <Text style={styles.taskText}>Name: {item.name}</Text>
              <Text style={styles.taskText}>Age: {item.age}</Text>
              <Text style={styles.taskText}>Education: {item.education}</Text>
            </View>
            <Button onPress={() => deleteTask(item.id)} title="Delete" />
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  taskText: {
    fontSize: 18,
  },
});

export default App;