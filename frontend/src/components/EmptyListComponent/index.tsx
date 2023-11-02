import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';

export default function EmptyListComponent() {
  return (
    <View style={styles.emptyListContainer}>
      <Text style={styles.emptyListText}>Lista de eventos está vazia</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 18,
    color: 'gray',
  },
});
