import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import Modal from 'react-native-modal';

const EventModal = ({isModalVisible, toggleModal}) => {
  const [newEvent, setNewEvent] = useState({
    title: 'Título Estático',
    description: 'Descrição Estática',
    date: '01-11-2023',
    withImage: true,
  });

  const toggleImage = () => {
    setNewEvent({...newEvent, withImage: !newEvent.withImage});
  };

  return (
    <Modal isVisible={isModalVisible}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Novo Evento</Text>
        <TextInput style={styles.input} value={newEvent.title} />
        <TextInput style={styles.input} value={newEvent.description} />
        <Text style={styles.modalLabel}>Selecione a data:</Text>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkboxTextContainer}
            onPress={toggleImage}>
            <CheckBox
              checked={newEvent.withImage}
              containerStyle={styles.checkbox}
            />
            <Text style={styles.checkboxText}>Adicionar foto</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Criar evento</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
          <Text style={styles.closeButtonText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalLabel: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
  },
  checkboxContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginLeft: 10,
  },
  checkboxText: {
    fontSize: 17,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  createButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 1,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default EventModal;
