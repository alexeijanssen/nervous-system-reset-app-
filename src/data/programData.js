// programData.js - Contains all data for the 14-day nervous system reset protocol

const programData = {
  1: {
    title: "Foundation - Diaphragmatic Breathing",
    breathPatterns: {
      morning: {
        inhale: 4,
        exhale: 6
      },
      afternoon: {
        inhale: 4,
        exhale: 6
      },
      evening: {
        inhale: 4,
        exhale: 8
      }
    },
    sessionDurations: {
      morning: 30 * 60, // 30 minutes in seconds
      afternoon: 20 * 60, // 20 minutes
      evening: 25 * 60 // 25 minutes
    },
    sessionTitles: {
      morning: "Morning: Basic Diaphragmatic Breathing",
      afternoon: "Afternoon: Diaphragmatic Breathing with Rib Expansion",
      evening: "Evening: Extended Exhale Breathing"
    },
    sessionInstructions: {
      morning: [
        "Sit comfortably with an upright spine",
        "Place one hand on your chest and one on your abdomen",
        "Breathe in through your nose for 4 seconds, directing the breath to your abdomen",
        "Exhale through slightly pursed lips for 6 seconds",
        "Focus on breathing deeply into your diaphragm rather than shallowly into your chest"
      ],
      afternoon: [
        "Place your hands on the sides of your lower ribs",
        "As you inhale, focus on expanding your ribs outward into your hands",
        "Maintain the abdominal movement while engaging the intercostal muscles",
        "Exhale completely through pursed lips",
        "This technique increases lung capacity and enhances diaphragmatic breathing"
      ],
      evening: [
        "Inhale through your nose for 4 seconds",
        "Exhale slowly through slightly pursed lips for 8 seconds",
        "Focus on emptying your lungs completely with each exhale",
        "This 1:2 ratio of inhale-to-exhale activates the parasympathetic nervous system",
        "Allow your body to become increasingly relaxed with each breath"
      ]
    },
    description: {
      morning: "Introduction to diaphragmatic breathing with body scan and conscious relaxation.",
      afternoon: "Focus on expanding the lower ribs during inhalation.",
      evening: "Body scan with extended exhale practice for enhanced relaxation."
    }
  },
  2: {
    title: "Extending the Exhale",
    breathPatterns: {
      morning: {
        inhale: 4,
        holdIn: 7,
        exhale: 8
      },
      afternoon: {
        inhale: 4,
        holdIn: 8,
        exhale: 12
      },
      evening: {
        inhale: 4,
        exhale: 8
      }
    },
    sessionDurations: {
      morning: 35 * 60, // 35 minutes
      afternoon: 20 * 60, // 20 minutes
      evening: 30 * 60 // 30 minutes
    },
    sessionTitles: {
      morning: "Morning: 4-7-8 Breathing",
      afternoon: "Afternoon: Extended 4-8-12 Breathing",
      evening: "Evening: Extended Exhale Breathing"
    },
    sessionInstructions: {
      morning: [
        "Inhale quietly through your nose for 4 counts",
        "Hold your breath for 7 counts",
        "Exhale completely through your mouth, making a whoosh sound, for 8 counts",
        "Keep the tip of your tongue against the ridge behind your upper front teeth",
        "This pattern particularly activates the parasympathetic nervous system"
      ],
      afternoon: [
        "Inhale through your nose for 4 counts, filling first your abdomen, then chest",
        "Hold your breath for 8 counts without tensing",
        "Exhale through slightly pursed lips for 12 counts, emptying completely",
        "Allow your exhalation to be slow and controlled",
        "The extended exhale phase creates a deeper parasympathetic response"
      ],
      evening: [
        "Find a comfortable inhale length (between 3-5 seconds)",
        "Double that length for your exhale",
        "For example: inhale for 4 seconds, exhale for 8 seconds",
        "Maintain diaphragmatic breathing throughout",
        "The extended exhale activates the vagus nerve more effectively than equal inhale-exhale ratios"
      ]
    },
    description: {
      morning: "Classic 4-7-8 breathing technique with awareness practice.",
      afternoon: "Extended breath cycle with longer exhale phase.",
      evening: "1:2 inhale:exhale ratio breathing for evening relaxation."
    }
  },
  3: {
    title: "Box Breathing & Coherence",
    breathPatterns: {
      morning: {
        inhale: 4,
        holdIn: 4,
        exhale: 4,
        holdOut: 4
      },
      afternoon: {
        inhale: 5,
        exhale: 5
      },
      evening: {
        inhale: 5,
        holdIn: 5,
        exhale: 7,
        holdOut: 3
      }
    },
    sessionDurations: {
      morning: 40 * 60, // 40 minutes
      afternoon: 25 * 60, // 25 minutes
      evening: 30 * 60 // 30 minutes
    },
    sessionTitles: {
      morning: "Morning: Box Breathing",
      afternoon: "Afternoon: Cardiac Coherence Breathing",
      evening: "Evening: Extended Box Breathing"
    },
    sessionInstructions: {
      morning: [
        "Inhale through your nose for 4 counts, expanding your abdomen",
        "Hold your breath for 4 counts without tensing",
        "Exhale completely through your nose or mouth for 4 counts",
        "Hold the empty lungs state for 4 counts without straining",
        "Visualize tracing the four sides of a square as you practice"
      ],
      afternoon: [
        "Breathe in through your nose for 5 seconds",
        "Breathe out through your mouth for 5 seconds",
        "This creates a 6 breaths per minute rhythm",
        "Place your attention on the area of your heart",
        "Imagine the breath flowing in and out through your heart area"
      ],
      evening: [
        "Inhale through your nose for 5 counts",
        "Hold the breath for 5 counts",
        "Exhale through your mouth for 7 counts (extending the exhale phase)",
        "Hold the empty lungs for 3 counts",
        "This modified box pattern increases parasympathetic activation"
      ]
    },
    description: {
      morning: "Box breathing with equal phases followed by natural breath rest.",
      afternoon: "Breathing at resonant frequency for heart-brain coherence.",
      evening: "Modified box breathing with longer exhale phase."
    }
  },
  4: {
    title: "Breath Retention Introduction",
    breathPatterns: {
      morning: {
        inhale: 4,
        exhale: 6,
        holdOut: 3
      },
      afternoon: {
        inhale: 4,
        holdIn: 2,
        exhale: 4
      },
      evening: {
        inhale: 4,
        exhale: 8,
        holdOut: 4
      }
    },
    sessionDurations: {
      morning: 40 * 60, // 40 minutes
      afternoon: 30 * 60, // 30 minutes
      evening: 35 * 60 // 35 minutes
    },
    sessionTitles: {
      morning: "Morning: Gentle Breath Retention After Exhale",
      afternoon: "Afternoon: Alternate Nostril Breathing with Short Retentions",
      evening: "Evening: Extended Exhale with Longer Retention"
    },
    sessionInstructions: {
      morning: [
        "Inhale through your nose for 4 counts",
        "Exhale completely through your mouth for 6 counts",
        "After the exhale, hold your breath (with empty lungs) for 2-4 counts",
        "Start with 2 and increase as comfortable",
        "The post-exhale retention should be comfortable - reduce hold time if you feel strain"
      ],
      afternoon: [
        "Sit comfortably with an upright spine",
        "Use your right thumb to close your right nostril",
        "Inhale through your left nostril for 4 counts",
        "Close your left nostril with your ring finger, release your thumb",
        "Exhale through your right nostril for 4 counts"
      ],
      evening: [
        "Inhale through your nose for 4 counts",
        "Exhale slowly through pursed lips for 8 counts",
        "Hold the breath out (empty lungs) for 4 counts",
        "This combines the extended exhale with empty-lung retention",
        "Focus on complete relaxation during the empty-lung hold"
      ]
    },
    description: {
      morning: "Introduction to post-exhale breath retention.",
      afternoon: "Nadi Shodhana with brief retentions after inhalation.",
      evening: "Extended exhale with post-exhale retention."
    }
  },
  5: {
    title: "Pranayama Introduction",
    breathPatterns: {
      morning: {
        inhale: 4,
        exhale: 8
      },
      afternoon: {
        inhale: 4,
        exhale: 6
      },
      evening: {
        inhale: 4,
        exhale: 8
      }
    },
    sessionDurations: {
      morning: 45 * 60, // 45 minutes
      afternoon: 30 * 60, // 30 minutes
      evening: 35 * 60 // 35 minutes
    },
    sessionTitles: {
      morning: "Morning: Nadi Shodhana",
      afternoon: "Afternoon: Sitali Cooling Breath",
      evening: "Evening: Brahmari (Humming Bee Breath)"
    },
    sessionInstructions: {
      morning: [
        "Sit with spine erect. Rest your left hand on your left knee",
        "Raise your right hand and curl your index and middle fingers toward your palm",
        "Use your right thumb to close your right nostril",
        "Inhale slowly through your left nostril for 4 counts",
        "Close your left nostril with your ring finger, release your thumb"
      ],
      afternoon: [
        "Sit comfortably",
        "Extend your tongue slightly outside your mouth and curl the sides up to form a tube",
        "Inhale slowly through this tongue tube for 4 counts, feeling the cool air",
        "Retract your tongue, close your mouth, and exhale through your nose for 6 counts",
        "This cooling breath activates parasympathetic response"
      ],
      evening: [
        "Sit comfortably with eyes closed",
        "Place your index fingers on the tragus cartilage that partially covers your ear canal",
        "Inhale deeply through your nose for 4 counts",
        "As you exhale through your nose for 8 counts, press your tragus cartilage gently inward",
        "Make a smooth, steady humming sound like a bee during exhalation"
      ]
    },
    description: {
      morning: "Alternate nostril breathing with extended exhale.",
      afternoon: "Cooling breath technique for relaxation.",
      evening: "Vibration-based breathing for deep nervous system calming."
    }
  }
};

// Add days 6-14 (simplified)
for (let i = 6; i <= 14; i++) {
  programData[i] = {
    title: `Day ${i} - Advanced Practice`,
    breathPatterns: {
      morning: {
        inhale: 4,
        holdIn: 4,
        exhale: 8,
        holdOut: 4
      },
      afternoon: {
        inhale: 4,
        holdIn: 4,
        exhale: 6,
        holdOut: 2
      },
      evening: {
        inhale: 4,
        exhale: 8,
        holdOut: 4
      }
    },
    sessionDurations: {
      morning: 45 * 60, // 45 minutes
      afternoon: 30 * 60, // 30 minutes
      evening: 40 * 60 // 40 minutes
    },
    sessionTitles: {
      morning: `Day ${i} - Morning Practice`,
      afternoon: `Day ${i} - Afternoon Practice`,
      evening: `Day ${i} - Evening Practice`
    },
    sessionInstructions: {
      morning: [
        "Follow the breath pattern shown on screen",
        "Focus on deep, diaphragmatic breathing",
        "Maintain a relaxed posture throughout",
        "Adjust timings to your comfort level if needed",
        "Notice how your nervous system responds to the practice"
      ],
      afternoon: [
        "Find a comfortable seated position",
        "Follow the breath pattern shown on screen",
        "Keep your shoulders and face relaxed",
        "Focus on the transition between breath phases",
        "Adjust timings to your comfort level if needed"
      ],
      evening: [
        "Create a quiet, comfortable environment",
        "Follow the breath pattern shown on screen",
        "Allow your body to become increasingly relaxed with each breath",
        "Focus particularly on the extended exhale phase",
        "This practice prepares your nervous system for restful sleep"
      ]
    },
    description: {
      morning: "Advanced morning practice with breath retention.",
      afternoon: "Midday balancing practice.",
      evening: "Evening relaxation with extended exhale."
    }
  };
}

export default programData;
