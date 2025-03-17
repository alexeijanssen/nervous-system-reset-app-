// BreathPhaseDisplay.jsx - Component for visualizing the breath phase

import React from 'react';

/**
 * BreathPhaseDisplay component shows the current breathing phase
 * @param {Object} props - Component props
 * @param {string} props.phase - Current breath phase ('ready', 'inhale', 'holdIn', 'exhale', 'holdOut', 'complete')
 * @param {number} props.holdCount - Current count during hold phases
 * @param {number} props.holdDuration - Total duration of the current hold phase
 */
const BreathPhaseDisplay = ({ phase, holdCount, holdDuration }) => {
  return (
    <div className="flex items-center justify-center w-40 h-40 rounded-full border-8 border-gray-200 mb-8 relative">
      <div className="text-center">
        {phase === 'ready' && <p className="text-xl text-gray-600">Ready</p>}
        
        {phase === 'inhale' && (
          <p className="text-xl text-blue-500 animate-pulse">Inhale</p>
        )}
        
        {phase === 'holdIn' && (
          <>
            <p className="text-xl text-purple-500">Hold</p>
            {holdDuration > 0 && <p className="text-3xl font-bold text-purple-700 mt-2">{holdCount}</p>}
          </>
        )}
        
        {phase === 'exhale' && (
          <p className="text-xl text-indigo-500 animate-pulse">Exhale</p>
        )}
        
        {phase === 'holdOut' && (
          <>
            <p className="text-xl text-teal-500">Hold</p>
            {holdDuration > 0 && <p className="text-3xl font-bold text-teal-700 mt-2">{holdCount}</p>}
          </>
        )}
        
        {phase === 'complete' && <p className="text-xl text-green-500">Complete</p>}
      </div>
    </div>
  );
};

export default BreathPhaseDisplay;
