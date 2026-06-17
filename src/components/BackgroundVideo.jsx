import React from 'react';
import bgVideo from '../assets/bg1.mp4'; 

export default function BackgroundVideo() {
  return (
    <div className="video-container">
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src={bgVideo} type="video/mp4" />
      </video>
    </div>
  );
}