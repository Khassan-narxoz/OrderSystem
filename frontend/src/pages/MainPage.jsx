import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/MainPage.css';

export default function MainPage({ Component }) {
  return (
    <div className="main-page">
      <Navbar />
      <main className="main-content">
        {Component}
      </main>
      <Footer />
    </div>
  );
}
