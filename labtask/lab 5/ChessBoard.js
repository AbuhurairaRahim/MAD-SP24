import React from 'react';
import { View, StyleSheet } from 'react-native';

const Chessboard = () => {
  const renderSquares = () => {
    const squares = [];
    const colors = ['white', 'black'];

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const colorIndex = (i + j) % 2;
        const color = colors[colorIndex];
        squares.push(
          <View
            key={`${i}-${j}`}
            style={[styles.square, { backgroundColor: color }]}
          />
        );
      }
    }

    return squares;
  };

  return (
    <View style={styles.chessboard}>
      {renderSquares()}
    </View>
  );
};

const styles = StyleSheet.create({
  chessboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    aspectRatio: 1,
  },
  square: {
    width: '12.5%',
    aspectRatio: 1,
  },
});

export default Chessboard;
