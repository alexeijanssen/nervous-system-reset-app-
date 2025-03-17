// BreathingControls.jsx - Controls for volume and binaural beats

import React from 'react';

/**
 * BreathingControls component provides audio controls for the breathing guide
 * @param {Object} props - Component props
 * @param {number} props.volume - Current breath tone volume (-40 to 0 dB)
 * @param {Function} props.onVolumeChange - Function called when tone volume changes
 * @param {number} props.beepVolume - Current beep volume (-40 to 0 dB)
 * @param {Function} props.onBeepVolumeChange - Function called when beep volume changes
 * @param {boolean} props.binauralEnabled - Whether binaural beats are enabled
 * @param {Function} props.onBinauralToggle - Function called when binaural beats are toggled
 * @param {string} props.binauralFreq - Current binaural frequency type ('delta', 'theta', 'alpha')
 * @param {Function} props.onBinauralFreqChange - Function called when binaural frequency changes
 * @param {number} props.binauralVolume - Current binaural volume (-60 to -10 dB)
 * @param {Function} props.onBinauralVolumeChange - Function called when binaural volume changes
 */
const BreathingControls = ({
  volume,
  onVolumeChange,
  beepVolume,
  onBeepVolumeChange,
  binauralEnabled,
  onBinauralToggle,
  binauralFreq,
  onBinauralFreqChange,
  binauralVolume,
  onBinauralVolumeChange
}) => {
  return (
    <div className="w-full">
      {/* Breath tone volume control */}
      <div className="flex flex-col w-full mb-4">
        <label className="text-gray-600 mb-2">Breath Tone Volume</label>
        <input
          type="range"
          min="-40"
          max="0"
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          className="w-full"
        />
      </div>
      
      {/* Beep volume control */}
      <div className="flex flex-col w-full mb-4">
        <label className="text-gray-600 mb-2">Beep Volume</label>
        <input
          type="range"
          min="-40"
          max="0"
          value={beepVolume}
          onChange={(e) => onBeepVolumeChange(Number(e.target.value))}
          className="w-full"
        />
      </div>
      
      {/* Binaural beats controls */}
      <div className="flex flex-col w-full mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-gray-600">Binaural Beats</label>
          <div className="flex items-center">
            <label className="mr-2 text-sm text-gray-500">Off</label>
            <div 
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
                binauralEnabled ? 'bg-blue-500 justify-end' : 'bg-gray-300 justify-start'
              }`}
              onClick={() => onBinauralToggle(!binauralEnabled)}
            >
              <div className="bg-white w-4 h-4 rounded-full shadow-md"></div>
            </div>
            <label className="ml-2 text-sm text-gray-500">On</label>
          </div>
        </div>
        
        {/* Only show these controls when binaural beats are enabled */}
        {binauralEnabled && (
          <>
            <div className="flex flex-col mt-2">
              <label className="text-gray-600 mb-1 text-sm">Binaural Beat Type</label>
              <select 
                value={binauralFreq}
                onChange={(e) => onBinauralFreqChange(e.target.value)}
                className="p-2 border border-gray-300 rounded"
              >
                <option value="delta">Delta (1-4 Hz) - Deep Sleep</option>
                <option value="theta">Theta (4-8 Hz) - Light Sleep</option>
                <option value="alpha">Alpha (8-13 Hz) - Relaxation</option>
              </select>
            </div>
            
            <div className="flex flex-col mt-2">
              <label className="text-gray-600 mb-1 text-sm">Binaural Volume</label>
              <input
                type="range"
                min="-60"
                max="-10"
                value={binauralVolume}
                onChange={(e) => onBinauralVolumeChange(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BreathingControls;
