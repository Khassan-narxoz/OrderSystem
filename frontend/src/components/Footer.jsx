import React from 'react';
import '../css/Footer.css'; // Өз қалауыңызша CSS қосыңыз

export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
    </footer>
  );
}
