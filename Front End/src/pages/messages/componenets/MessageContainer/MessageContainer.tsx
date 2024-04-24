import React from "react"

import ProfileButton from "../../../../components/ProfileButton/ProfileButton";
import { IonCol, IonRow } from "@ionic/react";

export interface MessageContainerProps {
    varient: 'sender' | 'receiver';
    message: string;
    userId: string;
}

export const MessageContainer: React.FC<MessageContainerProps> = ({
    varient,
    message,
    userId,
}) => {

    let IonColClassName;
    let Contents;

    switch (varient) {
        case 'sender':
            IonColClassName = 'ion-col-right';
            Contents = (<>
                <p>{message}</p>
                <ProfileButton varient='image' userId={userId} userData={{
                                                id: "",
                                                firstName: "",
                                                lastName: "",
                                                subtext: "",
                                                pfp: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
                                                roles: [],
                                                studentCode: ""
                                            }}/>
            </>)
            break;
        case 'receiver':
            IonColClassName = 'ion-col-left';
            Contents = (<>
                {/* <ProfileButton varient='image' userId={userId} /> */}
                <p>{message}</p>
            </>)
            break;
    }


    return (
        <IonRow>
            <IonCol className={IonColClassName}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    {Contents}
                </div>
            </IonCol>
        </IonRow>
    )
}