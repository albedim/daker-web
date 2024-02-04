import React, { useState, useEffect } from 'react';

const CursorFollowDiv = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '50px',
        height: '50px',
        backgroundColor: 'blue',
        borderRadius: '50%',
      }}
    ></div>
  );
};

export default CursorFollowDiv;
