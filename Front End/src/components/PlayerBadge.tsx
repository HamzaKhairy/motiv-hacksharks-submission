import React, { useState } from 'react';

interface PlayerBadgeProps {
  playerName: string;
  playerSubtext: string;
  imageUrl: string;
}

const PlayerBadge: React.FC<PlayerBadgeProps> = ({ playerName, playerSubtext, imageUrl }) => {
  const [isImageLeft, setIsImageLeft] = useState(true);

  const toggleImagePosition = () => {
    setIsImageLeft(!isImageLeft);
  };

  const styles = {
    badge: {
      position: 'relative',
      display: 'inline-block',
      backgroundColor: isImageLeft ? 'red' : 'gray',
      borderRadius: '50px',
      color: 'white',
      padding: '0 10px',
      cursor: 'pointer', // To indicate it's clickable
      transition: 'background-color 0.4s ease',
    },
    badgeContent: {
      display: 'flex',
      alignItems: 'center',
      height: '80px',
      flexDirection: isImageLeft ? 'row' : 'row-reverse', // Toggles the flex direction
    },
    image: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      marginBlock: '10px',
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'column',
      paddingInline: '10px',
      textAlign: isImageLeft ? 'left' : 'right'
    },
    name: {
      fontFamily: 'lovelo, sans-serif',
    },
    number: {
      fontFamily: 'lovelo, sans-serif',
    },
  };

  let pfp_src;

  if (imageUrl === "") {
    pfp_src = "/defaults/pfp.png"
  } else {
    pfp_src = `http://localhost:3000/api/files/${imageUrl}`
  }

  return (
    <div style={styles.badge as React.CSSProperties} onClick={toggleImagePosition}>
      <div style={styles.badgeContent as React.CSSProperties}>
        <img src={pfp_src} alt="player" style={styles.image} />
        <div style={styles.textContainer as React.CSSProperties}>
          <div style={styles.name}>{playerName}</div>
          <div style={styles.number}>{playerSubtext}</div>
        </div>
      </div>
    </div>
  );
};

export default PlayerBadge;
