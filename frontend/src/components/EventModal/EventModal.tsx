import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import Modal from 'react-native-modal';

import {createEvent} from '../../services/eventServices';

interface EventModalProps {
  isModalVisible: boolean;
  toggleModal: () => void;
  fetchEvents: () => void;
}

function EventModal({
  isModalVisible,
  toggleModal,
  fetchEvents,
}: EventModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('25/07/2021');
  const [isWithImage, setIsWithImage] = useState(false);
  const [randomImage, setRandomImage] = useState('');

  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const response = await fetch('https://picsum.photos/200/300');
        setRandomImage(response.url);
      } catch (error) {
        console.error('Erro ao buscar imagem aleatória:', error);
      }
    };
    fetchRandomImage();
  }, [isWithImage]);

  function cleanAllInputs() {
    setTitle('');
    setDescription('');
    setIsWithImage(false);
    setRandomImage('');
    // setDate('');
  }

  function handleCreateChange() {
    if (title === '' || description === '' || date === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const eventData = {
      title: title,
      description: description,
      image_url: randomImage,
      selected_date: date,
      withImage: isWithImage,
    };

    createEvent(eventData)
      .then(response => {
        console.log('Evento criado com sucesso:', response);
        fetchEvents();
      })
      .catch(error => {
        console.error('Erro ao criar o evento:', error);
      });

    cleanAllInputs();
  }

  return (
    <Modal isVisible={isModalVisible}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Novo Evento</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={text => setDescription(text)}
        />
        <Text style={styles.modalLabel}>Selecione a data:</Text>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkboxTextContainer}
            onPress={() => setIsWithImage(!isWithImage)}>
            <CheckBox checked={isWithImage} containerStyle={styles.checkbox} />
            <Text style={styles.checkboxText}>Adicionar foto</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateChange}>
          <Text style={styles.createButtonText}>Criar evento</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
          <Text style={styles.closeButtonText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

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
