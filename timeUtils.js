// timeUtils.js - Utility functions for time formatting and calculations

/**
 * Formats seconds into MM:SS format
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string (MM:SS)
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Calculates the total breath cycle time in seconds
 * @param {Object} breathPattern - Object containing breath phase durations
 * @returns {number} Total cycle time in seconds
 */
export const calculateCycleTime = (breathPattern) => {
  const inhaleTime = breathPattern.inhale || 0;
  const holdInTime = breathPattern.holdIn || 0;
  const exhaleTime = breathPattern.exhale || 0;
  const holdOutTime = breathPattern.holdOut || 0;
  
  return inhaleTime + holdInTime + exhaleTime + holdOutTime;
};

/**
 * Creates a formatted string representation of a breath pattern
 * @param {Object} breathPattern - Object containing breath phase durations
 * @returns {string} Formatted breath pattern (e.g., "4-7-8-0")
 */
export const formatBreathPattern = (breathPattern) => {
  let pattern = `${breathPattern.inhale || 0}`;
  
  if (breathPattern.holdIn) {
    pattern += `-${breathPattern.holdIn}`;
  } else {
    pattern += '-0';
  }
  
  pattern += `-${breathPattern.exhale || 0}`;
  
  if (breathPattern.holdOut) {
    pattern += `-${breathPattern.holdOut}`;
  } else {
    pattern += '-0';
  }
  
  return pattern;
};

/**
 * Determines the current breath phase based on timing
 * @param {number} timeInCycle - Current time position in the breath cycle
 * @param {Object} breathPattern - Object containing breath phase durations
 * @returns {string} Current breath phase ('inhale', 'holdIn', 'exhale', or 'holdOut')
 */
export const determineBreathPhase = (timeInCycle, breathPattern) => {
  const inhaleTime = breathPattern.inhale || 0;
  const holdInTime = breathPattern.holdIn || 0;
  const exhaleTime = breathPattern.exhale || 0;
  
  if (timeInCycle < inhaleTime) {
    return 'inhale';
  } else if (timeInCycle < (inhaleTime + holdInTime)) {
    return 'holdIn';
  } else if (timeInCycle < (inhaleTime + holdInTime + exhaleTime)) {
    return 'exhale';
  } else {
    return 'holdOut';
  }
};

/**
 * Calculates the hold count for the current phase
 * @param {number} timeInCycle - Current time position in the breath cycle
 * @param {Object} breathPattern - Object containing breath phase durations
 * @param {string} currentPhase - Current breath phase
 * @returns {number} Current count in the hold phase (1-based)
 */
export const calculateHoldCount = (timeInCycle, breathPattern, currentPhase) => {
  const inhaleTime = breathPattern.inhale || 0;
  const holdInTime = breathPattern.holdIn || 0;
  const exhaleTime = breathPattern.exhale || 0;
  
  if (currentPhase === 'holdIn') {
    return Math.floor(timeInCycle - inhaleTime) + 1;
  } else if (currentPhase === 'holdOut') {
    return Math.floor(timeInCycle - (inhaleTime + holdInTime + exhaleTime)) + 1;
  }
  
  return 0;
};
