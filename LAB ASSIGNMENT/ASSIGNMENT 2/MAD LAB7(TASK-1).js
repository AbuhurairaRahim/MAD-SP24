import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, FlatList } from 'react-native';

const DiscountCalculatorApp = () => {
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  const [history, setHistory] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const calculateDiscount = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercentage);
    const discountAmount = (price * discount) / 100;
    const finalPrice = price - discountAmount;
    setCalculatedPrice(finalPrice.toFixed(2));

    const calculation = `${originalPrice} - ${discountPercentage}% = ${finalPrice.toFixed(2)}`;
    setHistory([...history, calculation]);
  };

  const renderItem = ({ item }) => (
    <Text style={styles.historyItem}>{item}</Text>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Discount Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Original Price"
        keyboardType="numeric"
        value={originalPrice}
        onChangeText={text => setOriginalPrice(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Discount Percentage"
        keyboardType="numeric"
        value={discountPercentage}
        onChangeText={text => setDiscountPercentage(text)}
      />
      <Button title="Calculate" onPress={calculateDiscount} />
      {calculatedPrice && (
        <View>
          <Text style={styles.result}>You Save: {originalPrice - calculatedPrice}</Text>
          <Text style={styles.result}>Final Price: {calculatedPrice}</Text>
        </View>
      )}
      <Button title="View History" onPress={() => setModalVisible(true)} />

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Calculation History</Text>
          <FlatList
            data={history}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  result: {
    fontSize: 18,
    marginVertical: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  historyItem: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default DiscountCalculatorApp;