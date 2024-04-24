// Calendar Event Operations: 
// 1. Get all events
// 2. Get event by id
// 3. Create Event (post)
// 4. Update Event (put)
// 5. Delete Event (delete)


import {
  IonContent,
  IonDatetime,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonPage,
} from '@ionic/react';

import { addOutline, expand } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';
import './schedule.css';
import Header from "../components/Header/Header"
import NewEventModal from '../components/Modals/NewEventModal';
import { fetchData } from "../services/apiService";
import {useReadData, userUpdateData, useDeleteData, useCreateData} from "../hooks/useCrudOperations";

// Calendar Imports
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import { addHours } from 'date-fns/addHours'
import { startOfHour } from 'date-fns/startOfHour'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

// Calendar Setup
const locales = {
  'en-US': enUS,
}
const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1)
const now = new Date()
const start = endOfHour(now)
const end = addHours(start, 2)
// The types here are `object`. Strongly consider making them better as removing `locales` caused a fatal error
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})
//@ts-ignore

const DnDCalendar = withDragAndDrop(Calendar)
const CalApiUrl = 'http://127.0.0.1:8080/api/calendar'


const Schedule: React.FC = () => {
  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
  const page = useRef(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  const onEventResize: withDragAndDropProps['onEventResize'] = data => {
    const { start, end } = data

    setEvents(currentEvents => {
      return [...currentEvents]
    })
  }

  const onEventDrop: withDragAndDropProps['onEventDrop'] = data => {
    console.log(data)
  }
  // const onSave = async (title: string, startTime: Date, endTime: Date): Promise<void> => {
  //   try {
  //     // Make a POST request to save the event data to the database
  //     const response = await postData(CalApiUrl, {
  //       title,
  //       start_time: startTime,
  //       end_time: endTime,
  //     });
  useEffect(() => {
    fetchData(CalApiUrl) 
      .then((data: any) => {
        const mappedEvents = data.map((event: any) => ({
          id: event.id,
          title : event.title,
          start: new Date(event.start_time),
          end: new Date(event.end_time), // todo: add support for allday events
          description: event.description,
          location: event.location,
          sport: event.sport,
        }));
        setEvents(mappedEvents);
        console.log('Mapped events:', mappedEvents); // Log the fetched data
        setLoading(false);
      })

      .catch(error => {
        console.error('Error fetching events:', error);
        setLoading(false);
      });
  }, []);


  return (
    <IonPage ref={page}>
      <Header />
      <IonContent>
        <DnDCalendar
          defaultView='month'
          events={events}
          localizer={localizer}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
          resizable
          style={{ height: expand }}
        />  
      </IonContent>

      <IonFab  vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton id="newEventButton" onClick={() => setShowModal(true)}>
          <IonIcon icon={addOutline} />
        </IonFabButton>
      </IonFab>
      <NewEventModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={(title, startTime, endTime) => {
          console.log("Title:", title);
          console.log("Start Time:", startTime);
          console.log("End Time:", endTime);
        }}
      />
      
    
    </IonPage>
  );
};

export default Schedule;
