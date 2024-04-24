import React, { useState } from 'react';

interface UserData {
    name: string;
    age: number;
    email: string;
}

const UserModel = (props: UserData): UserData => {
    const [user, setUser] = useState<UserData>(props);

    return user;
};

export default UserModel;