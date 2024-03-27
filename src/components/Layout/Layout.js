// Layout.js
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div style={{ 
        backgroundImage: 'url("/image/wallpaper.jpg")', // Reference to the image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
       
      }}>
        {children}
      </div>
  );
};

export default Layout;