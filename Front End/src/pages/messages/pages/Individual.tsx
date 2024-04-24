import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle, IonCol, IonGrid, IonRow, IonInput, IonItem } from '@ionic/react';
import { arrowBack } from 'ionicons/icons';

import Header from '../../../components/Header/Header';
import ProfileButton from '../../../components/ProfileButton/ProfileButton';
import { MessageContainer } from '../componenets/MessageContainer/MessageContainer';
import { useSelector } from 'react-redux';
import { useReadData, useCreateData } from '../../../hooks/useCrudOperations';
import { ConversationType, MessageType } from '../../../types/userTypes';


const Individual: React.FC = () => {
    const state = useSelector((state: { conversationReducer: any }) => state.conversationReducer);
    const history = useHistory();

    const user_id = sessionStorage.getItem('user_id') ?? "1";
    const { id } = useParams<{ id: string }>();

    const [otherUsers, setOtherUsers] = useState<string[]>(state.userIds.filter((item: string) => item !== user_id));
    const { data: conversationData, loading: conversationLoading, error: conversationError } = useReadData<ConversationType>(`/api/conversations/${id}`, otherUsers.length <= 1);

    useEffect(() => {
        if (!conversationLoading) {
            if (conversationError) {
                console.log(conversationError);
            } else if (conversationData) {
                setOtherUsers(conversationData.users.filter(user => user.id !== user_id).map(user => user.id));
            }
        }

    }, [conversationData, conversationLoading, conversationError]);

    const [message, setMessage] = useState<string>('');
    const [messagesList, setMessagesList] = useState<MessageType[]>([]);
    const { data: conversationMessagesData, loading: conversationMessagesLoading, error: conversationMessagesError } = useReadData<MessageType[]>(`/api/conversations/${id}/messages`);

    useEffect(() => {
        if (!conversationMessagesLoading) {
            if (conversationMessagesError) {
                console.log(conversationMessagesError);
            } else if (conversationMessagesData) {
                setMessagesList(conversationMessagesData);
                console.log(conversationMessagesData);
            }
        }

    }, [conversationMessagesData, conversationMessagesLoading, conversationMessagesError]);

    const { createData, data, loading, error } = useCreateData(`/api/conversations/${id}/messages`);
    const submitAction = () => {
        // Logic to handle submission
        console.log("Submit button clicked");
        // You might want to collect input data here and do something with it
        setMessagesList(prevMessagesList => [...prevMessagesList, { userId: user_id, text: message, createdAt: new Date().toISOString() }]);
        createData({ userId: user_id, text: message, createdAt: new Date().toISOString() });
        

    };

    return (
        <IonPage>
            <IonHeader>
                <Header />
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={() => history.goBack()}>
                            <IonIcon size='large' icon={arrowBack} />
                            {/* <ProfileButton width={70} height={60} userId={state.userIds[1].id} /> */}
                            {/* <ProfileButton width={70} height={60} userId={otherUsers[0] ? otherUsers[0] : user_id} /> */}
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    {messagesList && messagesList.map((message, index) => {
                        // return <MessageContainer userId={message.userId} varient={message.userId === state.userIds[0].id ? 'sender' : 'receiver'} message={message.text} />
                        return <MessageContainer key={`message-container-${index}`} userId={message.userId} varient={message.userId === user_id ? 'sender' : 'receiver'} message={message.text} />
                    })}
                </IonGrid>
            </IonContent>
            <IonItem fill="solid">
                <IonInput
                    placeholder="Message"
                    onIonChange={(e) => setMessage(e.detail.value ?? '')}
                    value={message}
                ></IonInput>
                <IonButton onClick={submitAction}>Submit</IonButton>
            </IonItem>
        </IonPage>
    );
};

export default Individual;
