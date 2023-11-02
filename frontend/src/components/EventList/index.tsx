import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {deleteEvent, getAllEvents} from '../../services/eventServices';
import {IEvent} from '../../Interface';

function EventListCard() {
  const [events, setEvents] = useState<IEvent[]>([]);

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

  const handleDelete = async (eventId: string) => {
    Alert.alert(
      'Excluir Evento',
      'Tem certeza de que deseja excluir este evento?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteEvent(eventId);
              await fetchEvents();
              console.log('Evento excluído com sucesso.');
            } catch (error) {
              console.error('Erro ao excluir o evento:', error);
            }
          },
        },
      ],
    );
  };

  return (
    <FlatList
      data={events}
      keyExtractor={item => item._id}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        <View style={styles.card}>
          <Image
            source={
              item.withImage
                ? {uri: item.image_url}
                : require('../../assets/desconhecido.png')
            }
            style={styles.eventImage}
          />
          <View style={styles.eventInfo}>
            <Text style={styles.eventTitle}>Título: {item.title}</Text>
            <Text style={styles.eventDescription}>
              Descrição: {item.description}
            </Text>
            <Text style={styles.eventDate}>Data: {item.selected_date}</Text>
          </View>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(item._id)}>
            <Image
              source={require('../../assets/trash.png')}
              style={styles.trashIcon}
            />
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1,
    padding: 7,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  trashIcon: {
    width: 20,
    height: 20,
  },
  eventImage: {
    width: '100%',
    height: 200,
  },
  eventInfo: {
    padding: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDescription: {
    fontSize: 16,
    marginTop: 5,
  },
  eventDate: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default EventListCard;
