import React, { useEffect, useRef, useState } from 'react';
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/react';
import { addOutline, expand } from 'ionicons/icons';
import format from 'date-fns/format';
import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import { fetchData } from '../../services/apiService';
import { urlBase } from '../../utilities/utils';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Header from '../../components/Header/Header';
import NewEventModal from './Modals/NewEventModal';
import EventModal from './Modals/EventModal';

const locales = {
  'en-US': enUS,
};
const localizer = dateFnsLocalizer({
  format,
  startOfWeek,
  getDay,
  locales,
});
const DnDCalendar = withDragAndDrop(Calendar);
const CalApiUrl = '/api/calendar';

const Schedule: React.FC = () => {
  const page = useRef(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  useEffect(() => {
    updateEvents();
    setPresentingElement(page.current);
  }, []);

  const setPresentingElement = (element: HTMLElement | null) => {
  };

  const updateEvents = () => {
    fetchData(urlBase + CalApiUrl)
      .then(data => {
        const mappedEvents = data.map(event => ({
          id: event.id,
          title: event.title,
          start: new Date(event.start_time),
          end: new Date(event.end_time),
          description: event.description,
          location: event.location,
          sport: event.sport,
        }));
        setEvents(mappedEvents);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        setLoading(false);
      });
  };

  const onSelectEvent = (event: any) => {
    setSelectedEvent(event);
    setShowModal(true);
  };
  const selectEvent = (event: any) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const onCardClick = (event: any) => {
    selectEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setShowModal(false);
  };

  const onEventResize: withDragAndDropProps['onEventResize'] = data => {
    const { start, end } = data;
    setEvents(currentEvents => [...currentEvents]);
  };

  const onEventDrop: withDragAndDropProps['onEventDrop'] = data => {
    console.log(data);
  };

  const todayEvents = events.filter(
    event => event.start >= startOfDay(new Date()) && event.end <= endOfDay(new Date())
  );

  return (
    <IonPage ref={page}>
      <Header />
      <IonContent>
        <DnDCalendar
          defaultView="month"
          events={events}
          localizer={localizer}
          onSelectEvent={onSelectEvent}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
          resizable
          style={{ height: expand }}
        />
        {todayEvents.length > 0 && (
          <div>
            <h2 className='event-title'>{format(new Date(), 'MMMM do')}</h2>
            {todayEvents.map(event => (
              <IonCard key={event.id} onClick={() => onCardClick(event)}>
                <IonCardHeader>
                  <IonCardTitle className='event-subtitle'>{event.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>{format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}</IonCardContent>
              </IonCard>
            ))}
          </div>
        )}
        <EventModal isOpen={showModal} onClose={closeModal} event={selectedEvent} onUpdateEvents={updateEvents} />
      </IonContent>

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton id="newEventButton" onClick={() => setShowNewEventModal(true)}>
          <IonIcon icon={addOutline} />
        </IonFabButton>
      </IonFab>
      <NewEventModal isOpen={showNewEventModal} onClose={() => setShowNewEventModal(false)} onUpdateEvents={updateEvents} />
    </IonPage>
  );
};

export default Schedule;
