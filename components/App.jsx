// App.jsx - Main application component

import React, { useState } from 'react';
import OverviewScreen from './OverviewScreen';
import BreathingGuideInterface from './BreathingGuide/BreathingGuideInterface';
import programData from '../data/programData';

/**
 * Main App component for the 14-Day Nervous System Reset Protocol
 */
const App = () => {
  // State for the current day and session
  const [currentDay, setCurrentDay] = useState(1);
  const [sessionType, setSessionType] = useState('morning');
  const [viewMode, setViewMode] = useState('overview'); // 'overview' or 'practice'
  
  // Handler for changing the day
  const handleDayChange = (day) => {
    setCurrentDay(day);
  };
  
  // Handler for changing the session type
  const handleSessionChange = (session) => {
    setSessionType(session);
  };
  
  // Handler for starting a session
  const handleStartSession = () => {
    setViewMode('practice');
  };
  
  // Handler for returning to the overview screen
  const handleBackToOverview = () => {
    setViewMode('overview');
  };
  
  // Render either the overview screen or the practice screen
  return (
    <div className="min-h-screen bg-gray-50">
      {viewMode === 'overview' ? (
        <OverviewScreen 
          currentDay={currentDay}
          currentSession={sessionType}
          programData={programData}
          onDayChange={handleDayChange}
          onSessionChange={handleSessionChange}
          onStartSession={handleStartSession}
        />
      ) : (
        <BreathingGuideInterface 
          dayNumber={currentDay}
          sessionData={programData[currentDay]}
          sessionType={sessionType}
          setSessionType={handleSessionChange}
          onBackClick={handleBackToOverview}
        />
      )}
    </div>
  );
};

export default App;
