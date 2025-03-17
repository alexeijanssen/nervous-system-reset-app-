// DaySelector.jsx - Component for selecting between the 14 days of the protocol

import React from 'react';

/**
 * DaySelector component for navigating between protocol days
 * @param {Object} props - Component props
 * @param {number} props.currentDay - Current selected day (1-14)
 * @param {Function} props.onDayChange - Function to call when day is changed
 */
const DaySelector = ({ currentDay, onDayChange }) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-semibold">Day {currentDay}</h2>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => onDayChange(Math.max(1, currentDay - 1))}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 disabled:opacity-50"
            disabled={currentDay === 1}
            aria-label="Previous day"
          >
            ←
          </button>
          
          <button 
            onClick={() => onDayChange(Math.min(14, currentDay + 1))}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 disabled:opacity-50"
            disabled={currentDay === 14}
            aria-label="Next day"
          >
            →
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mt-4">
        {Array.from({length: 14}, (_, i) => i + 1).map(day => (
          <button
            key={day}
            onClick={() => onDayChange(day)}
            className={`w-full py-2 rounded 
              ${currentDay === day 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            aria-label={`Day ${day}`}
            aria-current={currentDay === day ? 'true' : 'false'}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DaySelector;
