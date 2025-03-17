// OverviewScreen.jsx - Component for the protocol overview screen

import React from 'react';
import DaySelector from './Navigation/DaySelector';
import SessionTabs from './Navigation/SessionTabs';
import { formatBreathPattern } from '../utils/timeUtils';

/**
 * OverviewScreen component displays the protocol day and session information
 * @param {Object} props - Component props
 * @param {number} props.currentDay - Current selected day (1-14)
 * @param {string} props.currentSession - Current session type
 * @param {Object} props.programData - Protocol data for all days
 * @param {Function} props.onDayChange - Function to call when day changes
 * @param {Function} props.onSessionChange - Function to call when session changes
 * @param {Function} props.onStartSession - Function to call when session is started
 */
const OverviewScreen = ({ 
  currentDay, 
  currentSession, 
  programData, 
  onDayChange, 
  onSessionChange, 
  onStartSession 
}) => {
  // Get data for the current day
  const dayData = programData[currentDay];
  
  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">14-Day Nervous System Reset</h1>
        
        {/* Day navigation */}
        <DaySelector 
          currentDay={currentDay} 
          onDayChange={onDayChange} 
        />
        
        {/* Display day title */}
        <div className="text-center sm:text-left mb-4">
          <p className="text-gray-600">{dayData.title}</p>
        </div>
        
        {/* Session tabs */}
        <SessionTabs 
          currentSession={currentSession} 
          onSessionChange={onSessionChange} 
        />
        
        {/* Session details */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-2">
            {dayData.sessionTitles[currentSession]}
          </h3>
          <p className="text-sm mb-3">{dayData.description[currentSession]}</p>
          <div className="text-sm">
            <span className="font-medium">Duration:</span> {Math.floor(dayData.sessionDurations[currentSession] / 60)} minutes
          </div>
          <div className="text-sm">
            <span className="font-medium">Breath Pattern:</span> {formatBreathPattern(dayData.breathPatterns[currentSession])}
          </div>
        </div>
        
        {/* Start session button */}
        <button
          onClick={onStartSession}
          className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium text-center"
        >
          Start Session
        </button>
        
        {/* Protocol info */}
        <div className="mt-8 text-sm text-gray-600">
          <p>Follow the 14-day protocol to reset your nervous system using evidence-based breathing techniques. Each day includes three practices designed to progressively build your capacity for nervous system regulation.</p>
        </div>
      </div>
    </div>
  );
};

export default OverviewScreen;
