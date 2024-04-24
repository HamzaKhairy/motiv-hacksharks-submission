export interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  subtext: string;
  pfp: string;
  roles: string[];
  studentCode: string;
}

export interface TeamType {
  id: string;
  name: string;
  conversation: {
    id: string;
  };
  students?: UserType[];
}

export interface SchoolType {
  id: string;
  name: string;
}

export interface ConversationType {
  id: string;
  users: UserType[];
}

export interface MessageType {
  userId: string;
  text: string;
  createdAt: string;
}