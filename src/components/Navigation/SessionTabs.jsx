// SessionTabs.jsx - Component for selecting between morning, afternoon, and evening sessions

import React from 'react';

/**
 * SessionTabs component for switching between different session types
 * @param {Object} props - Component props
 * @param {string} props.currentSession - Current active session ('morning', 'afternoon', or 'evening')
 * @param {Function} props.onSessionChange - Function to call when session is changed
 */
const SessionTabs = ({ currentSession, onSessionChange }) => {
  return (
    <div className="flex space-x-2 mb-6 w-full">
      <button
        onClick={() => onSessionChange('morning')}
        className={`flex-1 py-2 rounded-lg text-center ${
          currentSession === 'morning' 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        Morning
      </button>
      
      <button
        onClick={() => onSessionChange('afternoon')}
        className={`flex-1 py-2 rounded-lg text-center ${
          currentSession === 'afternoon' 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        Afternoon
      </button>
      
      <button
        onClick={() => onSessionChange('evening')}
        className={`flex-1 py-2 rounded-lg text-center ${
          currentSession === 'evening' 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        Evening
      </button>
    </div>
  );
};

export default SessionTabs;
