import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

const StudentRecord = ({ name, gpa }) => (
  <View style={{ borderBottomWidth: 1, padding: 10 }}>
    <Text>Name: {name}</Text>
    <Text>GPA: {gpa}</Text>
  </View>
);

const App = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [gpa, setGpa] = useState(0);

  const addStudent = () => {
    setStudents([...students, { name, gpa }]);
    setName('');
    setGpa(0);
  };

  const searchStudent = (searchName) => {
    const filteredStudents = students.filter((student) => student.name.includes(searchName));
    setStudents(filteredStudents);
  };

  const clearStudents = () => {
    setStudents([]);
  };

  const deleteStudent = (index) => {
    const newStudents = [...students];
    newStudents.splice(index, 1);
    setStudents(newStudents);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Student Name:</Text>
      <TextInput value={name} onChangeText={setName} placeholder="Enter Name" />
      <Text>GPA:</Text>
      <TextInput value={gpa.toString()} onChangeText={(text) => setGpa(parseFloat(text))} placeholder="Enter GPA" keyboardType="numeric" />
      <Button title="Add Student" onPress={addStudent} />
      <TextInput placeholder="Search Student" onChangeText={searchStudent} />
      <Button title="Clear All" onPress={clearStudents} />
      <FlatList
        data={students}
        renderItem={({ item, index }) => (
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <StudentRecord name={item.name} gpa={item.gpa} />
            <Button title="Delete" onPress={() => deleteStudent(index)} />
          </View>
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

export default App;