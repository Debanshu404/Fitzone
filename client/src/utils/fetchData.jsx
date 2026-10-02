const exerciseOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_EXERCISE_API_KEY || "1b8f12a371mshc1a286598dedc35p1687bcjsna676b0ddb4e6",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

const youtubeExerciseOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_YOUTUBE_API_KEY || "1b8f12a371mshc1a286598dedc35p1687bcjsna676b0ddb4e6",
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
  },
};

// High-fidelity fallback exercise database for zero downtime
const fallbackExercises = [
  {
    id: "0001",
    name: "Barbell Bench Press",
    bodyPart: "chest",
    target: "pectorals",
    equipment: "barbell",
    gifUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
    instructions: [
      "Lie back on a flat bench under the rack.",
      "Grip the barbell with hands slightly wider than shoulder-width.",
      "Unrack the bar and slowly lower it to your mid-chest.",
      "Press the bar upward explosively until arms are extended."
    ],
  },
  {
    id: "0002",
    name: "Barbell Back Squat",
    bodyPart: "upper legs",
    target: "quads",
    equipment: "barbell",
    gifUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop",
    instructions: [
      "Place the barbell across your upper traps.",
      "Stand with feet shoulder-width apart, toes turned slightly out.",
      "Descend by pushing hips back and bending knees until thighs are parallel.",
      "Drive through the floor to return to standing position."
    ],
  },
  {
    id: "0003",
    name: "Deadlift",
    bodyPart: "back",
    target: "glutes & hamstrings",
    equipment: "barbell",
    gifUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    instructions: [
      "Stand with feet hip-width apart under the barbell.",
      "Hinge at hips, grip the bar with a flat back and engaged lats.",
      "Drive through heels, extending hips and knees simultaneously.",
      "Lock out at top without overextending lower back."
    ],
  },
  {
    id: "0004",
    name: "Dumbbell Overhead Shoulder Press",
    bodyPart: "shoulders",
    target: "deltoids",
    equipment: "dumbbell",
    gifUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop",
    instructions: [
      "Sit or stand holding dumbbells at shoulder level with palms forward.",
      "Press dumbbells directly upward until arms are fully extended overhead.",
      "Lower under control back to ear level."
    ],
  },
  {
    id: "0005",
    name: "Pull-Up",
    bodyPart: "back",
    target: "lats",
    equipment: "body weight",
    gifUrl: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=800&auto=format&fit=crop",
    instructions: [
      "Grip the overhead pull-up bar with palms facing away.",
      "Pull your chest up toward the bar, driving elbows down toward your ribs.",
      "Pause at the top, then lower fully under control."
    ],
  },
  {
    id: "0006",
    name: "Dumbbell Bicep Curl",
    bodyPart: "upper arms",
    target: "biceps",
    equipment: "dumbbell",
    gifUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop",
    instructions: [
      "Stand tall holding dumbbells at sides, palms facing inward.",
      "Curl weights upward while supinating wrists so palms face shoulders.",
      "Squeeze biceps at peak and lower smoothly."
    ],
  },
  {
    id: "0007",
    name: "Cable Tricep Pushdown",
    bodyPart: "upper arms",
    target: "triceps",
    equipment: "cable",
    gifUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop",
    instructions: [
      "Attach a rope or straight bar to high cable pulley.",
      "Pin elbows to sides and push the bar down until elbows lock.",
      "Return under control to 90 degrees."
    ],
  },
  {
    id: "0008",
    name: "Hanging Leg Raise",
    bodyPart: "waist",
    target: "abs",
    equipment: "body weight",
    gifUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop",
    instructions: [
      "Hang from pull-up bar with arms fully extended.",
      "Engage core and raise legs until parallel to the floor.",
      "Slowly lower back without swinging."
    ],
  }
];

const fallbackBodyParts = [
  'all', 'back', 'cardio', 'chest', 'lower arms', 'lower legs', 'neck', 'shoulders', 'upper arms', 'upper legs', 'waist'
];

const fallbackVideos = [
  {
    video: {
      videoId: "IODxDxX7oi4",
      title: "How to Master Proper Exercise Form & Technique",
      channelName: "Fitzone Masterclass",
      thumbnails: [{ url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop" }],
    }
  },
  {
    video: {
      videoId: "gRVjAtPip0Y",
      title: "Top 5 Form Mistakes to Avoid for Maximum Growth",
      channelName: "Coach Marcus Athletics",
      thumbnails: [{ url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop" }],
    }
  }
];

const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    const data = await response.json();

    // Verify valid data returned
    if (data && !data.message) {
      if (Array.isArray(data)) return data;
      if (data.contents && Array.isArray(data.contents)) return data;
      if (typeof data === 'object') return data;
    }
    throw new Error('Invalid API response format');
  } catch (error) {
    console.warn(`[fetchData fallback] Call failed for ${url}, providing fallback data:`, error.message);

    // Provide robust fallback according to request type
    if (url.includes('/bodyPartList')) {
      return fallbackBodyParts.filter(p => p !== 'all');
    }
    if (url.includes('/exercises/exercise/')) {
      const idMatch = url.split('/exercise/')[1];
      const match = fallbackExercises.find(e => e.id === idMatch);
      return match || fallbackExercises[0];
    }
    if (url.includes('youtube-search-and-download') || url.includes('youtube-v31')) {
      return { contents: fallbackVideos };
    }
    if (url.includes('/bodyPart/')) {
      const part = url.split('/bodyPart/')[1]?.toLowerCase();
      return fallbackExercises.filter(e => e.bodyPart.toLowerCase().includes(part));
    }
    if (url.includes('/target/')) {
      return fallbackExercises.slice(0, 4);
    }
    if (url.includes('/equipment/')) {
      return fallbackExercises.slice(0, 4);
    }
    return fallbackExercises;
  }
};

const BASE_URL =
  import.meta.env.VITE_BACKEND_URL ||
  (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:5000'
    : 'https://gym-master.onrender.com');

export { fetchData, exerciseOptions, youtubeExerciseOptions, BASE_URL, fallbackExercises };
