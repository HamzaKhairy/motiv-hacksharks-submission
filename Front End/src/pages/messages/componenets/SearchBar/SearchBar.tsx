import React, {
    useState,
} from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";

import './SearchBar.css';
import { IonInput, IonItem, IonList, IonSearchbar } from '@ionic/react';

export interface SearchBarProps {
    toggleable?: boolean,
    height?: number,
}

// The SearchBar component
export const SearchBar: React.FC<SearchBarProps> = ({
    toggleable = true,
    height = 70,
}) => {

    const [isToggled, setIsToggled] = useState(false);

    const semicircleSize = height / 2;

    const toggle = () => {
        if (toggleable) {
            setIsToggled(!isToggled);
        }
    }

    return (
        <IonSearchbar placeholder="Search" color="light"></IonSearchbar>
    );
};

export default SearchBar;
