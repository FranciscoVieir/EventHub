import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EventModal from './src/components/EventModal/EventModal';
import EventListCard from './src/components/EventList';
import {IEvent} from './src/Interface';
import {getAllEvents} from './src/services/eventServices';

function App() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [events, setEvents] = useState<IEvent[]>([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const eventData = await getAllEvents();
      setEvents(eventData);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Lista de Eventos</Text>
      </View>
      <EventModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        fetchEvents={fetchEvents}
      />
      <View style={styles.eventListContainer}>
        <EventListCard events={events} fetchEvents={fetchEvents} />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
        <Text style={styles.addButtonText}>Adicionar um novo evento</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  eventListContainer: {
    marginBottom: 80,
    flex: 1,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
