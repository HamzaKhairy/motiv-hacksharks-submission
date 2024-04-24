import React, { useState, ReactNode, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { IonPage, IonContent, IonIcon, IonCol, IonGrid, IonRouterOutlet, IonRow, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { chevronDownOutline, chevronForwardOutline } from 'ionicons/icons';

import { v4 as uuidv4 } from 'uuid';
import SearchBar from './componenets/SearchBar/SearchBar';
import Header from '../../components/Header/Header';
import ProfileButton from '../../components/ProfileButton/ProfileButton';
import { useReadData } from '../../hooks/useCrudOperations';
import { ConversationType, SchoolType, TeamType, UserType } from '../../types/userTypes';
import { useSelector } from 'react-redux';
import store from '../../redux/store';
import { updateConversationUserIds } from '../../redux/actions/conversationActions';

interface CollapsibleMenuProps {
    title: string;
    children: ReactNode;
}

const CollapsibleMenu: React.FC<CollapsibleMenuProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button className="plainButton" style={{ background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={toggleMenu}>
                <h2 className="h2-text">{title}</h2>
                <IonIcon size='large' icon={isOpen ? chevronDownOutline : chevronForwardOutline} slot="end" />
            </button>
            {isOpen && <div>{children}</div>}
        </div>
    );
};

const Messages: React.FC = () => {
    const state = useSelector((state: { conversationReducer: any }) => state.conversationReducer);

    const user_id = useSelector((state: { user: UserType }) => state.user.id);

    const history = useHistory();

    const { data: schoolsData, loading: schoolsLoading, error: schoolsError } = useReadData<SchoolType[]>(`/api/users/${user_id}/schools`);

    const [teamsApiEndpoint, setTeamsApiEndpoint] = useState<string>('');
    useEffect(() => {
        if (!schoolsLoading && schoolsData && !schoolsError) {
            setTeamsApiEndpoint(`/api/schools/${schoolsData[0].id}/teams?includeMembers=true`);
        }
    }, [schoolsData, schoolsLoading, schoolsError]);

    const { data: teamsData, loading: teamsLoading, error: teamsError } = useReadData<TeamType[]>(teamsApiEndpoint);

    useEffect(() => {
        if (!teamsLoading && teamsData && !teamsError) {
            console.log(teamsData);
        }
    }, [teamsData, teamsLoading, teamsError]);

    const { data: conversationData, loading: conversationLoading, error: conversationError } = useReadData<ConversationType[]>(`/api/users/${user_id}/conversations`);

    useEffect(() => {
        if (!conversationLoading && conversationData && !conversationError) {

        }
    }, [conversationData, conversationLoading, conversationError]);

    const findConversation = (userId: string[]) => {
        if (conversationData === null) return [];

        const userIds = [user_id, ...userId];

        store.dispatch(updateConversationUserIds(userIds));

        const returnVal = conversationData.filter((convo: { users: any[]; }) => {
            const convoUserIds = convo.users.map(user => user.id).sort();
            const sortedGivenIds = [...userIds].sort();

            return convoUserIds.length === sortedGivenIds.length &&
                convoUserIds.every((id, index) => id === sortedGivenIds[index]);
        });

        if (returnVal.length === 0) {
            return uuidv4();
        }

        return returnVal[0].id;
    }

    return (
        <IonPage>
            <IonContent>
                <Header />
                <SearchBar />

                {/* Itterate over each team */}
                {teamsData ? teamsData.map((team) => (
                    <CollapsibleMenu key={team.id} title={team.name}>
                        <IonGrid>
                            <IonRow>
                                <IonCol className='ion-col-center' size="12" size-sm="3">
                                    <ProfileButton
                                        isSchool={true}
                                        varient='non-toggleable'
                                        width={150}
                                        height={75}
                                        onClick={() => {
                                            history.push(`/dms/${team.conversation.id}`);

                                        }}
                                        userData={
                                            {
                                                id: "",
                                                firstName: team.name,
                                                lastName: "",
                                                subtext: "",
                                                pfp: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
                                                roles: [],
                                                studentCode: ""
                                            }
                                        }
                                    />
                                </IonCol>
                                <IonCol className='ion-col-center' size="12" size-sm="3">
                                    <ProfileButton
                                        isSchool={true}
                                        varient='non-toggleable'
                                        width={150}
                                        height={75}
                                        onClick={() => {
                                            history.push(`/dms/${findConversation(["1"])}`);

                                        }}
                                        userData={
                                            {
                                                id: "",
                                                firstName: "Coach",
                                                lastName: "",
                                                subtext: "",
                                                pfp: "https://www.gravatar.com/avatar/205e460bc79e2e5b48aec07710c08d50",
                                                roles: [],
                                                studentCode: ""
                                            }
                                        }
                                    />
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                        <IonGrid>
                            {team.students?.map((student, index) => (
                                index % 2 === 0 ? (
                                    <IonRow key={`row-${index}`}>
                                        <IonCol className='ion-col-center' size="12" size-sm="3">
                                            <ProfileButton
                                                isSchool={true}
                                                varient='non-toggleable'
                                                width={150}
                                                height={75}
                                                onClick={() => {
                                                    history.push(`/dms/${findConversation([student.id])}`);

                                                }}
                                                userData={student}
                                            />
                                        </IonCol>
                                        {team.students && team.students[index + 1] && (
                                            <IonCol className='ion-col-center' size="12" size-sm="3">
                                                <ProfileButton
                                                    isSchool={true}
                                                    varient='non-toggleable'
                                                    width={150}
                                                    height={75}
                                                    onClick={() => {
                                                        if (team.students && team.students[index + 1]) {
                                                            history.push(`/dms/${findConversation([team.students[index + 1].id])}`);
                                                        }
                                                    }}
                                                    userData={team.students[index + 1]}
                                                />
                                            </IonCol>
                                        )}
                                    </IonRow>
                                ) : null
                            ))}
                        </IonGrid>
                    </CollapsibleMenu>
                )) : (<p>No Teams Found</p>)}
            </IonContent>
        </IonPage>
    );
};

export default Messages;
