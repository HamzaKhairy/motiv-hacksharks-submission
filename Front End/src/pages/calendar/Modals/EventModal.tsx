import React, { useState } from 'react';
import { IonModal, IonButton, IonContent, IonRow, IonCol, IonCard, IonCardContent, IonIcon, useIonToast, IonInput, IonTextarea, IonToggle, IonLabel, IonItem } from '@ionic/react';
import { format } from 'date-fns';
import { useDeleteData, userUpdateData } from '../../../hooks/useCrudOperations';
import { calendarOutline, pencilOutline, trashBinOutline, saveOutline, locationOutline, timeOutline } from 'ionicons/icons';
import '../../../fonts.css';
import './EventModal.css';

interface EventModalProps {
  isOpen: boolean;
  onUpdateEvents: () => void;
  onClose: () => void;
  event: any;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, onUpdateEvents, event }) => {
  if (!event) {
    return null; // Return null if event is null or undefined
  }
  const [showToast] = useIonToast();
  const [editMode, setEditMode] = useState(false);
  const [editedEvent, setEditedEvent] = useState(event);

  const { deleteData } = useDeleteData('/api/calendar/' + event.id);
  const { createData } = userUpdateData('/api/calendar/' + event.id);
  const handleDiscard = () => { onClose(); };
  const startTime = format(new Date(event.start), "h:mm aa");
  const endTime = format(new Date(event.end), "h:mm aa");
  const date = format(new Date(event.start), "M/d/yyyy");

  const handleDelete = async () => {
    try {
      await deleteData();
      onUpdateEvents();
      onClose();
      showToast({
        message: 'Event deleted',
        duration: 2000,
        color: 'danger',
      });
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    setEditedEvent(event);
  };

  const handleSaveEdit = async () => {
    try {
      await createData(editedEvent);
      onUpdateEvents();
      setEditMode(false);
      onClose();
      showToast({
        message: 'Event updated',
        duration: 2000,
        color: 'success',
      });
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <IonModal breakpoints={[0, 0.6, 0.8]} initialBreakpoint={0.6} isOpen={isOpen} onDidDismiss={onClose} className='new-event-modal'>
      <IonContent>
        <IonRow >
          <IonCol size="12">
            <IonCard color='transparent'>
              <IonCardContent>
                {editMode ? (
                  <>
                    <IonInput
                      clearInput={true}
                      mode="md"
                      className="ion-margin-top"
                      fill="outline"
                      labelPlacement="floating"
                      label="Event Title *"
                      value={editedEvent.title}
                      onIonChange={(e) => setEditedEvent({ ...editedEvent, title: e.detail.value! })}
                    />  
                    <IonItem><IonToggle>All Day?</IonToggle></IonItem>

                  <IonItem lines="none" >
                    <IonTextarea value={editedEvent.description}
                    placeholder="Add a descripton..."  
                    aria-label='Description'
                    onIonInput={(e) => setEditedEvent({ ...editedEvent, description: e.detail.value! })}/>
                  </IonItem>

                    <IonItem>
                      <IonInput
                        placeholder="Enter a room or location"
                        value={editedEvent.location}
                        onIonInput={(e) => setEditedEvent({ ...editedEvent, location: e.detail.value! })}
                        />
                      <IonIcon icon={locationOutline} slot='end'/>
                    </IonItem>

                    

                    <IonButton color="success" onClick={handleSaveEdit}>
                      Save
                      <IonIcon icon={saveOutline} slot='start' />
                    </IonButton>
                    <IonButton color="success" onClick={handleDiscard}>
                      Discard
                      <IonIcon icon={trashBinOutline} slot='start' />
                    </IonButton>
                  </>
                ) : (
                  <>
                    <h2 className='event-title'>{editedEvent.title} | {date}</h2>
                    <p className='event-subtitle'><IonIcon icon={timeOutline} /> {startTime} to {endTime}</p>
                    <p className='event-info'><IonIcon icon={locationOutline} /> <strong>{editedEvent.location}</strong></p>

                    <p className='event-info'> {editedEvent.description}</p>

                    <p className='event-info'><strong>Sport:</strong> {editedEvent.sport}</p>
                    <IonButton color="white" onClick={handleEdit}>
                      Edit
                      <IonIcon icon={pencilOutline} slot='start' />
                    </IonButton>
                    <IonButton color="white" onClick={handleDelete}>
                      Delete
                      <IonIcon icon={trashBinOutline} slot='start' />
                    </IonButton>
                  </>
                )}
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonModal>
  );
};

export default EventModal;
