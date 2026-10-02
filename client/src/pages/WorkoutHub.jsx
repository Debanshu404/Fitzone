import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { ScrollWheel } from '../components';
import toast from 'react-hot-toast';

const WorkoutHub = () => {
  const { auth } = useAuth();
  const userName = auth?.user?.name || 'Athlete';

  // State for planner
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [customExerciseName, setCustomExerciseName] = useState('');
  const [customSets, setCustomSets] = useState('3');
  const [customReps, setCustomReps] = useState('10-12');
  const [showAddModal, setShowAddModal] = useState(false);

  // AI Assistant interactive state
  const [aiInput, setAiInput] = useState('');
  const [aiChat, setAiChat] = useState([
    {
      sender: 'ai',
      text: `Hey ${userName}! I am your Fitzone Neural Coach. Need an instant workout adjustment, form check tip, or macro breakdown? Ask below!`,
    },
  ]);

  // Day schedules with checkable exercises
  const [schedules, setSchedules] = useState({
    Monday: {
      split: 'Push Power • Chest, Delts & Triceps',
      duration: '55 Mins',
      calories: '520 kcal',
      exercises: [
        { id: 'm1', name: 'Barbell Flat Bench Press', sets: '4 Sets', reps: '6-8 Reps', completed: true },
        { id: 'm2', name: 'Incline Dumbbell Press', sets: '3 Sets', reps: '8-10 Reps', completed: true },
        { id: 'm3', name: 'Standing Overhead Barbell Press', sets: '3 Sets', reps: '8 Reps', completed: false },
        { id: 'm4', name: 'Cable Tricep Pushdown', sets: '3 Sets', reps: '12-15 Reps', completed: false },
      ],
    },
    Tuesday: {
      split: 'Pull Strength • Back & Biceps',
      duration: '60 Mins',
      calories: '560 kcal',
      exercises: [
        { id: 't1', name: 'Conventional Deadlift', sets: '4 Sets', reps: '5 Reps', completed: false },
        { id: 't2', name: 'Weighted Pull-Ups', sets: '3 Sets', reps: '8 Reps', completed: false },
        { id: 't3', name: 'Chest-Supported Row', sets: '3 Sets', reps: '10-12 Reps', completed: false },
        { id: 't4', name: 'Incline Dumbbell Curl', sets: '3 Sets', reps: '12 Reps', completed: false },
      ],
    },
    Wednesday: {
      split: 'Leg Hypertrophy & Core Stability',
      duration: '65 Mins',
      calories: '610 kcal',
      exercises: [
        { id: 'w1', name: 'Barbell Back Squat', sets: '4 Sets', reps: '6-8 Reps', completed: false },
        { id: 'w2', name: 'Romanian Deadlift (RDL)', sets: '3 Sets', reps: '8-10 Reps', completed: false },
        { id: 'w3', name: 'Bulgarian Split Squats', sets: '3 Sets', reps: '10 Reps/leg', completed: false },
        { id: 'w4', name: 'Hanging Leg Raises', sets: '3 Sets', reps: '15 Reps', completed: false },
      ],
    },
    Thursday: {
      split: 'Active Recovery & Zone 2 Cardio',
      duration: '40 Mins',
      calories: '340 kcal',
      exercises: [
        { id: 'th1', name: 'Incline Treadmill Walk', sets: '1 Round', reps: '30 Mins', completed: false },
        { id: 'th2', name: 'Thoracic Spine Foam Rolling', sets: '2 Sets', reps: '5 Mins', completed: false },
        { id: 'th3', name: 'Hip Flexor Mobility Flow', sets: '2 Sets', reps: '10 Mins', completed: false },
      ],
    },
    Friday: {
      split: 'Upper Body Pump & Conditioning',
      duration: '50 Mins',
      calories: '490 kcal',
      exercises: [
        { id: 'f1', name: 'Dumbbell Arnold Press', sets: '3 Sets', reps: '10 Reps', completed: false },
        { id: 'f2', name: 'Lat Pulldown', sets: '3 Sets', reps: '10-12 Reps', completed: false },
        { id: 'f3', name: 'Dips / Push-Ups', sets: '3 Sets', reps: 'To Failure', completed: false },
      ],
    },
    Saturday: {
      split: 'Fitzone Run Club & Functional HIIT',
      duration: '45 Mins',
      calories: '550 kcal',
      exercises: [
        { id: 's1', name: '5K Interval Tempo Run', sets: '1 Round', reps: '25 Mins', completed: false },
        { id: 's2', name: 'Kettlebell Swings', sets: '4 Sets', reps: '20 Reps', completed: false },
        { id: 's3', name: 'Assault Bike Sprint Intervals', sets: '5 Rounds', reps: '30s On / 30s Off', completed: false },
      ],
    },
    Sunday: {
      split: 'Total Rest & Deep Recovery',
      duration: '20 Mins',
      calories: '120 kcal',
      exercises: [
        { id: 'su1', name: 'Full Body Static Stretch', sets: '1 Round', reps: '15 Mins', completed: false },
        { id: 'su2', name: 'Guided Diaphragmatic Breathwork', sets: '1 Round', reps: '10 Mins', completed: false },
      ],
    },
  });

  const toggleExercise = (day, id) => {
    setSchedules((prev) => {
      const dayData = prev[day];
      const updated = dayData.exercises.map((ex) =>
        ex.id === id ? { ...ex, completed: !ex.completed } : ex
      );
      return {
        ...prev,
        [day]: { ...dayData, exercises: updated },
      };
    });
  };

  const handleAddExercise = (e) => {
    e.preventDefault();
    if (!customExerciseName.trim()) {
      toast.error('Please enter an exercise name');
      return;
    }

    const newEx = {
      id: 'custom-' + Date.now(),
      name: customExerciseName,
      sets: `${customSets} Sets`,
      reps: `${customReps} Reps`,
      completed: false,
    };

    setSchedules((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        exercises: [...prev[selectedDay].exercises, newEx],
      },
    }));

    setCustomExerciseName('');
    setShowAddModal(false);
    toast.success(`Added ${newEx.name} to ${selectedDay}!`);
  };

  const handleAiSend = (promptText) => {
    const q = promptText || aiInput;
    if (!q.trim()) return;

    const userMsg = { sender: 'user', text: q };
    setAiChat((prev) => [...prev, userMsg]);
    setAiInput('');

    // Simulate instant intelligent coaching response
    setTimeout(() => {
      let reply = `Solid question, ${userName}! For this, focus on a 2-second eccentric lowering phase and 1-second explosive concentric contraction. Aim for 3 sets of 8-10 reps at RPE 8. Make sure to hydrate with electrolytes!`;
      if (q.toLowerCase().includes('macro') || q.toLowerCase().includes('protein')) {
        reply = `For your current phase, target 2.0g to 2.2g of protein per kg of bodyweight, paired with 45-55g of complex carbs 90 minutes pre-workout to fuel glycogen stores.`;
      } else if (q.toLowerCase().includes('shoulder') || q.toLowerCase().includes('burner')) {
        reply = `Here is your 20-min shoulder finisher: 1) DB Lateral Raises 4x15 (drop set on last), 2) Face Pulls 3x15, 3) Overhead Dumbbell Holds 3x45s. Rest 45s between sets.`;
      }

      setAiChat((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  const currentDayPlan = schedules[selectedDay];
  const completedCount = currentDayPlan.exercises.filter((e) => e.completed).length;
  const totalCount = currentDayPlan.exercises.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#faf8f5] noise-bg text-neutral-900 pb-24 relative overflow-x-hidden">
      {/* Scroll indicator top right */}
      <ScrollWheel label="ATHLETE • PLANNER •" />

      {/* Hero Welcome Banner */}
      <section className="pt-12 sm:pt-16 pb-12 max-w-6xl mx-auto px-5 sm:px-8 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-200">
          <div>
            <div className="flex items-center justify-center sm:justify-start space-x-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                ACTIVE MEMBER • GOLD TIER
              </span>
            </div>

            <h1 className="font-condensed-heading text-5xl sm:text-7xl lg:text-8xl tracking-tight uppercase text-ef-black leading-none">
              HELLO, <span className="text-ef-blue">{userName}</span>
            </h1>

            <p className="font-serif italic text-xl sm:text-2xl text-neutral-600 mt-2">
              Your personal training matrix, exercise scheduler &amp; membership perks
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 shrink-0">
            <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm text-center">
              <span className="block text-2xl sm:text-3xl font-condensed-heading text-ef-blue">18</span>
              <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500">Sessions This Mo</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm text-center">
              <span className="block text-2xl sm:text-3xl font-condensed-heading text-ef-pink">1,250</span>
              <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500">FZ Loyalty Pts</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: INTERACTIVE EXERCISE PLANNER */}
        <div className="mt-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="brand-script text-2xl text-ef-blue font-bold">Daily Programming</span>
              <h2 className="font-condensed-heading text-3xl sm:text-5xl uppercase tracking-tight text-neutral-900">
                EXERCISE PLANNER
              </h2>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="btn-wave-action inline-flex items-center space-x-2 bg-ef-blue text-white px-5 py-2.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-ef-dark-blue shadow-md transition-all group"
            >
              <span className="relative z-10">+ ADD EXERCISE</span>
            </button>
          </div>

          {/* Weekday Switcher Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
            {Object.keys(schedules).map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all shrink-0 ${
                  selectedDay === day
                    ? 'bg-ef-black text-white shadow-lg scale-105'
                    : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-400'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Daily Schedule Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-neutral-200/80 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-ef-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                  {selectedDay}'s Focus
                </span>
                <h3 className="font-condensed-heading text-2xl sm:text-3xl uppercase tracking-wide text-neutral-900 mt-2">
                  {currentDayPlan.split}
                </h3>
              </div>

              <div className="flex items-center gap-4 text-xs font-black uppercase text-neutral-500">
                <span className="flex items-center gap-1">⏱️ {currentDayPlan.duration}</span>
                <span className="flex items-center gap-1">🔥 {currentDayPlan.calories}</span>
              </div>
            </div>

            {/* Daily Progress Tracker */}
            <div className="py-4">
              <div className="flex items-center justify-between text-xs font-black uppercase text-neutral-500 mb-1.5">
                <span>Workout Completion</span>
                <span className="text-ef-blue">{completedCount} of {totalCount} Completed ({progressPercent}%)</span>
              </div>
              <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-ef-blue h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Exercise Checklist */}
            <div className="space-y-3 mt-4">
              {currentDayPlan.exercises.map((ex) => (
                <div
                  key={ex.id}
                  onClick={() => toggleExercise(selectedDay, ex.id)}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    ex.completed
                      ? 'bg-emerald-50/50 border-emerald-300 opacity-90'
                      : 'bg-neutral-50 border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={ex.completed}
                      onChange={() => {}} // handled by parent div
                      className="w-5 h-5 rounded text-ef-blue focus:ring-ef-blue cursor-pointer"
                    />
                    <div>
                      <h4 className={`text-base font-bold uppercase tracking-tight ${ex.completed ? 'line-through text-neutral-400' : 'text-neutral-900'}`}>
                        {ex.name}
                      </h4>
                      <p className="text-xs text-neutral-500 font-medium">
                        {ex.sets} • {ex.reps}
                      </p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md ${
                    ex.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-white border border-neutral-200 text-neutral-600'
                  }`}>
                    {ex.completed ? 'DONE ✓' : 'LOG REP'}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-100">
              <Link
                to="/exercise"
                className="text-xs font-black uppercase tracking-widest text-ef-blue hover:underline flex items-center gap-1"
              >
                <span>Browse 1,300+ Exercise Videos for Technique</span> →
              </Link>
              <span className="text-[11px] font-bold text-neutral-400">
                Click any exercise to mark as completed
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 2: COMING SOON - WEARABLE CONNECTIVITY & HEALTH MONITORING */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card A: Wearable Sync */}
          <div className="bg-white rounded-3xl p-7 sm:p-8 border-2 border-neutral-200/80 shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-6 right-6">
              <span className="bg-ef-pink text-white font-black text-[10px] tracking-widest uppercase px-3 py-1 rounded-full shadow-sm animate-pulse">
                COMING SOON • Q4
              </span>
            </div>

            <div>
              <span className="brand-script text-2xl text-ef-pink font-bold">Hardware Sync</span>
              <h3 className="font-condensed-heading text-3xl sm:text-4xl uppercase tracking-tight text-neutral-900 mb-2">
                WEARABLE CONNECTIVITY
              </h3>
              <p className="text-sm font-medium text-neutral-600 mb-6 leading-relaxed">
                Direct biometric streaming from your favorite athletic wearables. Real-time heart rate zones, daily exertion strain, and GPS tracking synced seamlessly.
              </p>

              {/* Supported Devices Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {['Apple Watch Ultra', 'WHOOP 4.0', 'Garmin Fenix', 'Fitbit Sense', 'Oura Ring'].map((dev) => (
                  <span key={dev} className="bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-bold px-3 py-1 rounded-lg">
                    {dev}
                  </span>
                ))}
              </div>

              {/* Live Mock Vitals Display */}
              <div className="bg-neutral-900 text-white rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400">LIVE HR MONITOR</span>
                  <span className="text-rose-400 flex items-center gap-1 animate-pulse">❤️ 142 BPM</span>
                </div>
                <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full w-[72%]"></div>
                </div>
                <div className="flex justify-between text-[11px] font-bold text-neutral-400 uppercase">
                  <span>Target: Anaerobic Zone</span>
                  <span className="text-white">Strain: 14.8 / 21</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => toast('Wearable connectivity is launching in Q4 2026! Stay tuned.', { icon: '⌚' })}
              className="mt-6 w-full py-3.5 rounded-xl border border-neutral-300 font-black text-xs uppercase tracking-widest text-neutral-700 hover:border-ef-pink hover:text-ef-pink transition-colors"
            >
              PRE-REGISTER DEVICE SYNC
            </button>
          </div>

          {/* Card B: Biometric & Health Monitoring */}
          <div className="bg-white rounded-3xl p-7 sm:p-8 border-2 border-neutral-200/80 shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-6 right-6">
              <span className="bg-ef-blue text-white font-black text-[10px] tracking-widest uppercase px-3 py-1 rounded-full shadow-sm">
                LABS • COMING SOON
              </span>
            </div>

            <div>
              <span className="brand-script text-2xl text-ef-blue font-bold">Biometrics</span>
              <h3 className="font-condensed-heading text-3xl sm:text-4xl uppercase tracking-tight text-neutral-900 mb-2">
                HEALTH MONITORING
              </h3>
              <p className="text-sm font-medium text-neutral-600 mb-6 leading-relaxed">
                Advanced physiological telemetry measuring central nervous system readiness, deep sleep recovery phases, and daily hydration compliance.
              </p>

              {/* Vitals Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-blue-50/60 border border-blue-200 p-3.5 rounded-2xl">
                  <span className="text-[10px] font-black uppercase text-blue-600">Recovery Index</span>
                  <p className="text-2xl font-condensed-heading text-blue-900 mt-1">94% GREEN</p>
                  <span className="text-[10px] font-bold text-neutral-500">Ready for Heavy Squats</span>
                </div>
                <div className="bg-emerald-50/60 border border-emerald-200 p-3.5 rounded-2xl">
                  <span className="text-[10px] font-black uppercase text-emerald-600">Sleep Score</span>
                  <p className="text-2xl font-condensed-heading text-emerald-900 mt-1">88% RESTED</p>
                  <span className="text-[10px] font-bold text-neutral-500">7h 45m Restorative</span>
                </div>
                <div className="bg-purple-50/60 border border-purple-200 p-3.5 rounded-2xl">
                  <span className="text-[10px] font-black uppercase text-purple-600">VO2 Max Est.</span>
                  <p className="text-2xl font-condensed-heading text-purple-900 mt-1">51.2 ML/KG</p>
                  <span className="text-[10px] font-bold text-neutral-500">Superior Category</span>
                </div>
                <div className="bg-amber-50/60 border border-amber-200 p-3.5 rounded-2xl">
                  <span className="text-[10px] font-black uppercase text-amber-600">Hydration Log</span>
                  <p className="text-2xl font-condensed-heading text-amber-900 mt-1">3.2L / 4.0L</p>
                  <span className="text-[10px] font-bold text-neutral-500">80% Daily Goal</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => toast('Biometric telemetry module is in private beta.', { icon: '🔬' })}
              className="w-full py-3.5 rounded-xl border border-neutral-300 font-black text-xs uppercase tracking-widest text-neutral-700 hover:border-ef-blue hover:text-ef-blue transition-colors"
            >
              JOIN HEALTH MONITORING BETA
            </button>
          </div>
        </div>

        {/* SECTION 3: COMING SOON - FITNESS AI ASSISTANT */}
        <div className="mt-16 bg-white rounded-3xl p-7 sm:p-10 border-2 border-neutral-200/80 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-neutral-100">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-ef-blue animate-pulse"></span>
                <span className="brand-script text-2xl text-ef-blue font-bold">Neural Engine</span>
              </div>
              <h3 className="font-condensed-heading text-3xl sm:text-5xl uppercase tracking-tight text-neutral-900">
                FITNESS AI ASSISTANT
              </h3>
            </div>
            <span className="bg-ef-yellow text-ef-black font-black text-xs uppercase px-3 py-1.5 rounded-lg border-2 border-black shadow-sm">
              AI COACH BETA ACCESS
            </span>
          </div>

          <p className="text-sm sm:text-base font-medium text-neutral-600 mb-6 max-w-2xl">
            Ask for instant superset substitutions, customized meal macro calculations, or biomechanical cues for compound lifts.
          </p>

          {/* Quick Prompt Suggestion Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              'Generate a 20-min shoulder burner',
              'Calculate protein targets for lean bulking',
              'How to prevent lower back rounding on deadlifts?',
              'Best post-workout recovery smoothie recipe',
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => handleAiSend(chip)}
                className="text-xs font-bold bg-neutral-100 hover:bg-ef-blue hover:text-white transition-all px-3 py-1.5 rounded-full border border-neutral-200 text-neutral-700"
              >
                ✦ {chip}
              </button>
            ))}
          </div>

          {/* Chat Window */}
          <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-200 mb-4 max-h-72 overflow-y-auto space-y-3">
            {aiChat.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-ef-blue text-white rounded-br-none shadow-md'
                      : 'bg-white text-neutral-800 border border-neutral-200 rounded-bl-none shadow-sm font-medium'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="flex gap-2">
            <input
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAiSend()}
              placeholder="Ask Fitzone AI Coach anything about your workout or nutrition..."
              className="flex-1 px-4 py-3 rounded-xl border border-neutral-300 focus:border-ef-blue focus:ring-2 focus:ring-ef-blue/20 outline-none text-sm font-medium text-neutral-900"
            />
            <button
              onClick={() => handleAiSend()}
              className="btn-wave-action bg-ef-blue text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-ef-dark-blue shadow-md transition-all group"
            >
              <span className="relative z-10">ASK AI</span>
            </button>
          </div>
        </div>

        {/* SECTION 4: MEMBERSHIP LOYALTIES & REWARDS */}
        <div className="mt-16 bg-white rounded-3xl p-7 sm:p-10 border-2 border-neutral-200/80 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-neutral-100">
            <div>
              <span className="brand-script text-2xl text-ef-orange font-bold">Perks &amp; Rewards</span>
              <h3 className="font-condensed-heading text-3xl sm:text-5xl uppercase tracking-tight text-neutral-900">
                MEMBERSHIP LOYALTY VAULT
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs font-black uppercase text-neutral-400 block">Available Balance</span>
              <span className="text-3xl font-condensed-heading text-ef-blue">1,250 FZ POINTS</span>
            </div>
          </div>

          {/* Tier XP Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-xs font-black uppercase text-neutral-500 mb-1.5">
              <span>Current Status: GOLD ATHLETE</span>
              <span className="text-ef-orange">850 / 1000 XP to PLATINUM LEGEND</span>
            </div>
            <div className="w-full bg-neutral-100 h-3 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-ef-yellow via-ef-orange to-ef-pink h-full w-[85%] rounded-full"></div>
            </div>
          </div>

          {/* Loyalty Perks Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Post-Workout Shake', cost: '200 PTS', icon: '🥤', tag: 'SMOOTHIE BAR', unlocked: true },
              { title: 'Fitzone Merch Hoodie', cost: '650 PTS', icon: '👕', tag: 'OFFICIAL MERCH', unlocked: true },
              { title: '1-on-1 Form Check', cost: '1,000 PTS', icon: '🏋️', tag: 'COACH SESSION', unlocked: true },
              { title: 'VIP Sauna & Hydro Pass', cost: '400 PTS', icon: '🧖', tag: 'SPA RECOVERY', unlocked: true },
            ].map((perk, idx) => (
              <div key={idx} className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 text-center flex flex-col justify-between hover-lift">
                <div>
                  <span className="text-3xl mb-2 block">{perk.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-ef-blue block mb-1">
                    {perk.tag}
                  </span>
                  <h4 className="font-condensed-heading text-lg uppercase text-neutral-900">
                    {perk.title}
                  </h4>
                  <span className="text-xs font-mono font-bold text-neutral-500 block mt-1">
                    {perk.cost}
                  </span>
                </div>

                <button
                  onClick={() => toast.success(`Redeemed voucher for: ${perk.title}! Check your email.`)}
                  className="mt-4 w-full py-2 rounded-xl bg-ef-black text-white font-black text-[11px] uppercase tracking-wider hover:bg-ef-blue transition-colors"
                >
                  REDEEM PERK
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add Custom Exercise Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border-2 border-neutral-200">
            <h3 className="font-condensed-heading text-2xl uppercase tracking-tight text-neutral-900 mb-1">
              ADD EXERCISE TO {selectedDay.toUpperCase()}
            </h3>
            <p className="text-xs font-semibold text-neutral-500 mb-5">
              Customize your sets, reps, and target movement.
            </p>

            <form onSubmit={handleAddExercise} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-black uppercase text-neutral-600 mb-1">
                  Exercise Name
                </label>
                <input
                  type="text"
                  required
                  value={customExerciseName}
                  onChange={(e) => setCustomExerciseName(e.target.value)}
                  placeholder="e.g. Incline Dumbbell Hammer Curl"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-ef-blue outline-none text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase text-neutral-600 mb-1">
                    Sets
                  </label>
                  <input
                    type="text"
                    value={customSets}
                    onChange={(e) => setCustomSets(e.target.value)}
                    placeholder="3"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-ef-blue outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-neutral-600 mb-1">
                    Reps / Time
                  </label>
                  <input
                    type="text"
                    value={customReps}
                    onChange={(e) => setCustomReps(e.target.value)}
                    placeholder="10-12"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-ef-blue outline-none text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 py-3 rounded-xl border border-neutral-300 font-black text-xs uppercase tracking-wider text-neutral-600"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 rounded-xl bg-ef-blue text-white font-black text-xs uppercase tracking-wider hover:bg-ef-dark-blue shadow-md"
                >
                  SAVE EXERCISE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutHub;
