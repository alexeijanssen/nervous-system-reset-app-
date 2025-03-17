// BreathingGuideInterface.jsx - Main breathing guide component

import React, { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { formatTime, calculateCycleTime, determineBreathPhase, calculateHoldCount } from '../../utils/timeUtils';
import { 
  initializeAudioSynths, 
  disposeSynths, 
  setBinauralFrequencies, 
  toggleBinauralBeats,
  playBeep,
  playInhaleTone,
  playExhaleTone,
  stopTones,
  setVolumes,
  ensureToneStarted
} from '../../utils/audioUtils';
import BreathPhaseDisplay from './BreathPhaseDisplay';
import BreathingControls from './BreathingControls';
import SessionTabs from '../Navigation/SessionTabs';

/**
 * BreathingGuideInterface - The main interactive breathing guide component
 * @param {Object} props - Component props
 * @param {number} props.dayNumber - Current day number (1-14)
 * @param {Object} props.sessionData - Data for the current day
 * @param {string} props.sessionType - Current session type ('morning', 'afternoon', 'evening')
 * @param {Function} props.setSessionType - Function to change the session type
 * @param {Function} props.onBackClick - Function to handle back button click
 */
const BreathingGuideInterface = ({ 
  dayNumber, 
  sessionData, 
  sessionType, 
  setSessionType,
  onBackClick
}) => {
  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [breathCount, setBreathCount] = useState(0);
  const [breathPhase, setBreathPhase] = useState('ready');
  const [holdCount, setHoldCount] = useState(0);
  const [volume, setVolume] = useState(-15); // Initial volume in decibels
  const [beepVolume, setBeepVolume] = useState(-10); // Initial beep volume
  const [binauralEnabled, setBinauralEnabled] = useState(false);
  const [binauralVolume, setBinauralVolume] = useState(-25); // Quieter by default
  const [binauralFreq, setBinauralFreq] = useState('alpha'); // Default to alpha waves
  
  // Refs
  const timerRef = useRef(null);
  const synthsRef = useRef(null);
  
  // Current session settings
  const currentPattern = sessionData.breathPatterns[sessionType];
  const totalDuration = sessionData.sessionDurations[sessionType];
  const inhaleTime = currentPattern.inhale || 0;
  const holdInTime = currentPattern.holdIn || 0;
  const exhaleTime = currentPattern.exhale || 0;
  const holdOutTime = currentPattern.holdOut || 0;
  const cycleTime = inhaleTime + holdInTime + exhaleTime + holdOutTime;
  
  // Initialize audio synths
  useEffect(() => {
    synthsRef.current = initializeAudioSynths(volume, beepVolume, binauralVolume);
    
    // Cleanup on unmount
    return () => {
      if (synthsRef.current) {
        disposeSynths(synthsRef.current);
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  // Handle binaural beat frequency changes
  useEffect(() => {
    if (synthsRef.current) {
      setBinauralFrequencies(synthsRef.current, binauralFreq);
    }
  }, [binauralFreq]);
  
  // Handle volume changes
  useEffect(() => {
    if (synthsRef.current) {
      setVolumes(synthsRef.current, {
        toneVolume: volume,
        beepVolume: beepVolume,
        binauralVolume: binauralVolume
      });
    }
  }, [volume, beepVolume, binauralVolume]);
  
  // Handle binaural beat toggling
  useEffect(() => {
    if (synthsRef.current && isPlaying) {
      toggleBinauralBeats(synthsRef.current, binauralEnabled);
    }
  }, [binauralEnabled, isPlaying]);
  
  // Reset timer when session type changes
  useEffect(() => {
    resetSession();
  }, [sessionType]);
  
  // Main timing loop
  useEffect(() => {
    if (isPlaying && timeElapsed < totalDuration) {
      timerRef.current = setInterval(() => {
        setTimeElapsed(prevTime => {
          const newTime = prevTime + 0.1;
          
          // Calculate current breath count
          const newBreathCount = Math.floor(newTime / cycleTime) + 1;
          if (newBreathCount !== breathCount) {
            setBreathCount(newBreathCount);
          }
          
          // Determine breath phase
          const timeInCurrentCycle = newTime % cycleTime;
          const newPhase = determineBreathPhase(timeInCurrentCycle, currentPattern);
          
          // Handle phase transitions
          if (newPhase !== breathPhase) {
            setBreathPhase(newPhase);
            setHoldCount(0);
            
            // Play appropriate sounds for phase transitions
            if (synthsRef.current) {
              switch(newPhase) {
                case 'inhale':
                  playBeep(synthsRef.current, 'inhale');
                  playInhaleTone(synthsRef.current, inhaleTime);
                  break;
                case 'holdIn':
                  stopTones(synthsRef.current);
                  break;
                case 'exhale':
                  playBeep(synthsRef.current, 'exhale');
                  playExhaleTone(synthsRef.current, exhaleTime);
                  break;
                case 'holdOut':
                  stopTones(synthsRef.current);
                  break;
                default:
                  break;
              }
            }
          }
          
          // Handle hold count beeps
          if ((newPhase === 'holdIn' || newPhase === 'holdOut') && synthsRef.current) {
            const newHoldCount = calculateHoldCount(timeInCurrentCycle, currentPattern, newPhase);
            if (newHoldCount !== holdCount) {
              setHoldCount(newHoldCount);
              
              // Play a beep for each count during hold phases
              const holdDuration = newPhase === 'holdIn' ? holdInTime : holdOutTime;
              if (holdDuration > 0) {
                playBeep(synthsRef.current, 'hold');
              }
            }
          }
          
          return newTime;
        });
      }, 100); // Update every 100ms for smooth transitions
    } else if (timeElapsed >= totalDuration) {
      // End the session when time is up
      setIsPlaying(false);
      setBreathPhase('complete');
      
      if (synthsRef.current) {
        stopTones(synthsRef.current);
        toggleBinauralBeats(synthsRef.current, false);
      }
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, timeElapsed, breathCount, breathPhase, holdCount, 
      currentPattern, inhaleTime, holdInTime, exhaleTime, holdOutTime, 
      totalDuration, cycleTime]);
  
  const togglePlay = () => {
    if (!isPlaying) {
      // Start playback
      setIsPlaying(true);
      
      // Reset count and phase if starting from the beginning
      if (timeElapsed === 0) {
        setBreathCount(1);
        setBreathPhase('inhale');
        setHoldCount(0);
      }
      
      // Ensure Tone.js is started (required by browsers)
      ensureToneStarted();
      
      // Start audio
      if (synthsRef.current) {
        if (breathPhase === 'inhale') {
          playInhaleTone(synthsRef.current, inhaleTime);
        } else if (breathPhase === 'exhale') {
          playExhaleTone(synthsRef.current, exhaleTime);
        }
        
        // Start binaural beats if enabled
        if (binauralEnabled) {
          toggleBinauralBeats(synthsRef.current, true);
        }
      }
    } else {
      // Stop playback
      setIsPlaying(false);
      
      // Stop audio
      if (synthsRef.current) {
        stopTones(synthsRef.current);
        toggleBinauralBeats(synthsRef.current, false);
      }
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };
  
  const resetSession = () => {
    setIsPlaying(false);
    setTimeElapsed(0);
    setBreathCount(0);
    setHoldCount(0);
    setBreathPhase('ready');
    
    // Stop audio
    if (synthsRef.current) {
      stopTones(synthsRef.current);
      toggleBinauralBeats(synthsRef.current, false);
    }
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };
  
  // Remaining time
  const remainingTime = totalDuration - timeElapsed;
  
  // Progress percentage
  const progress = (timeElapsed / totalDuration) * 100;
  
  // Format breath pattern display
  const getPatternDisplay = () => {
    let pattern = `${inhaleTime}`;
    if (holdInTime > 0) pattern += `-${holdInTime}`;
    pattern += `-${exhaleTime}`;
    if (holdOutTime > 0) pattern += `-${holdOutTime}`;
    return pattern;
  };
  
  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-md w-full max-w-md mx-auto">
      <div className="flex justify-between items-center w-full mb-4">
        <button 
          onClick={onBackClick} 
          className="text-blue-500 hover:text-blue-700"
        >
          Back
        </button>
        <h2 className="text-xl font-semibold text-gray-800">Day {dayNumber} - Session</h2>
        <div className="w-10"></div> {/* For alignment */}
      </div>
      
      <h3 className="text-lg font-medium text-gray-700 mb-6">{sessionData.sessionTitles[sessionType]}</h3>
      
      {/* Session type tabs */}
      <SessionTabs 
        currentSession={sessionType} 
        onSessionChange={setSessionType} 
      />
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
        <div 
          className="bg-blue-500 h-4 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Time and pattern information */}
      <div className="flex justify-between w-full mb-8">
        <div className="text-gray-600">
          <p>Elapsed: {formatTime(timeElapsed)}</p>
          <p>Breaths: {breathCount}</p>
        </div>
        <div className="text-gray-600">
          <p>Remaining: {formatTime(remainingTime)}</p>
          <p>Pattern: {getPatternDisplay()}</p>
        </div>
      </div>
      
      {/* Breath phase display */}
      <BreathPhaseDisplay 
        phase={breathPhase} 
        holdCount={holdCount} 
        holdDuration={breathPhase === 'holdIn' ? holdInTime : (breathPhase === 'holdOut' ? holdOutTime : 0)} 
      />
      
      {/* Audio controls */}
      <BreathingControls 
        volume={volume}
        onVolumeChange={setVolume}
        beepVolume={beepVolume}
        onBeepVolumeChange={setBeepVolume}
        binauralEnabled={binauralEnabled}
        onBinauralToggle={setBinauralEnabled}
        binauralFreq={binauralFreq}
        onBinauralFreqChange={setBinauralFreq}
        binauralVolume={binauralVolume}
        onBinauralVolumeChange={setBinauralVolume}
      />
      
      {/* Playback buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={togglePlay}
          className={`px-6 py-2 rounded-lg font-medium ${
            isPlaying 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isPlaying ? 'Pause' : 'Start'}
        </button>
        
        <button
          onClick={resetSession}
          className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg font-medium"
          disabled={isPlaying}
        >
          Reset
        </button>
      </div>
      
      {/* Instructions */}
      <div className="mt-8 text-gray-600 text-sm">
        <p>Instructions:</p>
        <ul className="list-disc pl-5 mt-2">
          {sessionData.sessionInstructions[sessionType].map((instruction, index) => (
            <li key={index} className="mb-1">{instruction}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BreathingGuideInterface;
