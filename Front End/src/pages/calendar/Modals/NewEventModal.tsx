import React, { useRef, useState } from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonIcon,
  IonButtons,
  IonDatetime,
  IonLabel,
  IonToggle,
  useIonToast,
  IonNote,
  IonTextarea,
} from '@ionic/react';
import { backspaceOutline, calendar, calendarOutline, chevronBack, documentTextOutline, locationOutline } from 'ionicons/icons';
import { useCreateData } from '../../../hooks/useCrudOperations'; // Import the new hook
import { format, parseISO  } from 'date-fns';
import { fetchData } from "../../../services/apiService";
import './NewEventModal.css';
import { FaNoteSticky } from 'react-icons/fa6';
import { urlBase } from '../../../utilities/utils';
import { Primary } from '../../../components/Header/Header.stories';

interface NewEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateEvents: () => void; 
}

const NewEventModal: React.FC<NewEventModalProps> = ({ isOpen, onClose, onUpdateEvents }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [showStartModal, setShowStartModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [showToast] = useIonToast();
  const CalApiUrl = '/api/calendar'
  const { createData, data, loading, error } = useCreateData(CalApiUrl);

  const handleStartDateTimeChange = (e: CustomEvent) => {
    const newDateTimeValue = e.detail.value;
    setStartTime(newDateTimeValue);
  };
  const handleEndtDateTimeChange = (e: CustomEvent) => {
    const newDateTimeValue = e.detail.value;
    setEndTime(newDateTimeValue);
  };
  const handleSave = async () => {
    if (!title || !startTime || !endTime || !location) {
      showToast({ message: 'Please fill in all required fields', duration: 1500, color: 'danger' });
      return;
    }
    if (parseISO(startTime) > parseISO(endTime)) {
      showToast({ message: 'Start time cannot be after end time', duration: 1500, color: 'danger' });
      return;
    }

    const body = {
      title: title,
      description: description,
      start_time: startTime,
      end_time: endTime,
      location: location
  };
    try {
      await createData(body);
      onClose();
      onUpdateEvents();
      console.log('Event created');
    } catch (error) {
      // Handle error
    }
  };

  const modal = useRef<HTMLIonModalElement>(null);

  return (
    <>
      <IonModal ref={modal} breakpoints={[0, 0.6, 0.8]} initialBreakpoint={0.7} isOpen={isOpen} onDidDismiss={onClose} className='new-event-modal'>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={onClose}><IonIcon icon={chevronBack} /></IonButton>
            </IonButtons>
            <IonButtons slot="end">
            </IonButtons>
            <IonTitle className='new-title'>{title || "New Event"}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonInput
            clearInput={true}
            mode="md"
            className="ion-margin-top"
            fill="outline"
            labelPlacement="floating"
            label="Event Title *"
            value={title}
            onIonChange={(e) => setTitle(e.detail.value!)}
          />  

          <IonItem><IonToggle>All Day?</IonToggle></IonItem>

          <IonItem onClick={() => setShowStartModal(true)}>
            <IonLabel>Start <span style={{ color: 'red' }}>*</span></IonLabel>
            {startTime && (<IonNote slot="end">{format(new Date(startTime), "MMMM, d, yyyy  h:mma")}</IonNote>)}
            <IonIcon icon={calendarOutline} slot='end' />
          </IonItem>

          <IonItem onClick={() => setShowEndModal(true)}>
            <IonLabel>End <span style={{ color: 'red' }}>*</span></IonLabel>
            {endTime && (<IonNote slot="end">{format(new Date(endTime), "MMMM, d, yyyy  h:mma")}</IonNote>)}
            <IonIcon icon={calendarOutline} slot='end'/>
          </IonItem>

          <IonItem>
          <IonInput
            clearOnEdit={true}
            placeholder="Enter a room or location *"
            value={location}
            onIonInput={(e) => setLocation(e.detail.value!)}
            />
          <IonIcon icon={locationOutline} slot='end'/>
          </IonItem>


          <IonItem lines="none" >
            <IonTextarea value={description} 
            placeholder="Add a descripton..."  
            aria-label='Description'
            onIonInput={(e) => setDescription(e.detail.value!)}/>
          </IonItem>

          <IonButton 
          expand="block" 
          onClick={handleSave}>
            
          <p className='event-save'> Save</p>

          
          </IonButton>


        </IonContent>
      </IonModal>

      <IonModal initialBreakpoint={0.7} isOpen={showStartModal} onDidDismiss={() => setShowStartModal(false)}>
        <IonContent scrollY={false}>
          <IonDatetime 
            display-format='YYYY-MM-DDTHH:mm'
            size="cover" 
            show-default-buttons={true}  
            onIonChange={handleStartDateTimeChange}
            value={startTime}
            />
        </IonContent>
      </IonModal>

      <IonModal initialBreakpoint={0.7} isOpen={showEndModal} onDidDismiss={() => setShowEndModal(false)}>
        <IonContent scrollY={false}>
          <IonDatetime 
            display-format='YYYY-MM-DDTHH:mm'
            size="cover" 
            show-default-buttons={true}  
            onIonChange={handleEndtDateTimeChange}
            value={endTime}
          />
        </IonContent>
      </IonModal>
    </>
  );
};

export default NewEventModal;
