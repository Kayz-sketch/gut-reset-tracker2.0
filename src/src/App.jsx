import React, { useState, useEffect } from 'react';
import { AlertCircle, Check, Search, Droplets, Leaf, Coffee, Ban, Heart, Info, X, RefreshCw, ChevronRight, Award } from 'lucide-react';

// --- DATA: FOOD DATABASE ---
const foodDatabase = [
  { name: 'White Rice', category: 'Carbs', status: 'avoid', reason: 'High glycemic index, low nutrient density.', swaps: ['Cauliflower Rice', 'Roasted Sweet Potato', 'Quinoa (rinsed)'] },
  { name: 'Cauliflower Rice', category: 'Carbs', status: 'good', reason: 'Great for detox (sulforaphane) and fiber.', swaps: [] },
  { name: 'Sweet Potato', category: 'Carbs', status: 'good', reason: 'Safe starch, high Vitamin A. Cook & cool for resistant starch.', swaps: [] },
  { name: 'Bread (Wheat)', category: 'Grains', status: 'avoid', reason: 'Contains Gluten (Core 4 inflammatory).', swaps: ['Lettuce Wraps', 'Coconut Wraps', 'Sweet Potato Toast'] },
  { name: 'Canola Oil', category: 'Fats', status: 'avoid', reason: 'Industrial seed oil, highly inflammatory.', swaps: ['Olive Oil', 'Avocado Oil', 'Ghee', 'Coconut Oil'] },
  { name: 'Avocado', category: 'Fats', status: 'good', reason: 'Healthy fats, high fiber, anti-inflammatory.', swaps: [] },
  { name: 'Cow Milk', category: 'Dairy', status: 'avoid', reason: 'A1 Casein can trigger inflammation.', swaps: ['Almond Milk (Unsweetened)', 'Coconut Milk', 'A2 Milk', 'Goat Milk'] },
  { name: 'Green Tea', category: 'Beverage', status: 'good', reason: 'EGCG heals leaky gut. Drink away from meals.', swaps: [] },
  { name: 'Soda', category: 'Beverage', status: 'avoid', reason: 'Liquid sugar bomb.', swaps: ['Sparkling Water with Lime', 'Iced Hibiscus Tea'] },
  { name: 'Salmon', category: 'Protein', status: 'good', reason: 'High Omega-3s to lower inflammation.', swaps: [] },
  { name: 'Bone Broth', category: 'Superfood', status: 'good', reason: 'Collagen heals gut lining.', swaps: [] },
  { name: 'Sauerkraut', category: 'Superfood', status: 'good', reason: 'Natural probiotics.', swaps: [] },
];

// --- COMPONENTS ---

// 1. WELCOME & QUIZ COMPONENT
const Quiz = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    { text: "Do you experience bloating or gas after meals?", weight: 20 },
    { text: "Do you eat gluten (bread, pasta) daily?", weight: 20 },
    { text: "How are your stress levels? (High?)", weight: 15 },
    { text: "Do you rely on caffeine or sugar for energy?", weight: 15 },
    { text: "Do you consume conventional dairy regularily?", weight: 15 },
    { text: "Do you drink alcohol more than twice a week?", weight: 15 },
  ];

  const handleAnswer = (isYes) => {
    if (isYes) setScore(s => s + questions[step].weight);
    if (step < questions.length - 1) {
      setStep(s => s + 1);
    } else {
      onComplete(score + (isYes ? questions[step].weight : 0));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-emerald-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-emerald-800 mb-2">The Bucket Quiz</h1>
        <p className="text-gray-500 mb-6">Let's check your inflammation load.</p>
        
        <div className="mb-8">
          <div className="h-32 w-24 mx-auto border-4 border-emerald-200 rounded-b-2xl relative overflow-hidden bg-white">
            <div 
              className="absolute bottom-0 w-full bg-blue-400 transition-all duration-500 ease-out opacity-80"
              style={{ height: `${(step / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <h3 className="text-xl font-medium text-gray-800 mb-8 min-h-[60px]">
          {questions[step].text}
        </h3>

        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => handleAnswer(false)}
            className="px-6 py-3 rounded-lg border-2 border-emerald-600 text-emerald-700 font-semibold hover:bg-emerald-50 transition"
          >
            No
          </button>
          <button 
            onClick={() => handleAnswer(true)}
            className="px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition shadow-lg"
          >
            Yes
          </button>
        </div>
        <p className="mt-6 text-sm text-gray-400">Question {step + 1} of {questions.length}</p>
      </div>
    </div>
  );
};

// 2. PANIC BUTTON COMPONENT
const PanicModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl animation-fade-in">
      <div className="mx-auto bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
        <Heart className="w-8 h-8 text-rose-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Deep Breath.</h2>
      <p className="text-gray-600 mb-6">
        Guilt causes more inflammation than the food you just ate. This is about resilience, not perfection.
      </p>
      <div className="bg-emerald-50 p-4 rounded-xl mb-6 text-left">
        <h4 className="font-semibold text-emerald-800 text-sm uppercase mb-2">Recovery Protocol:</h4>
        <ul className="text-sm text-emerald-700 space-y-2">
          <li className="flex items-center gap-2"><Check size={14}/> Drink a large glass of water.</li>
          <li className="flex items-center gap-2"><Check size={14}/> Take a short walk (10 mins).</li>
          <li className="flex items-center gap-2"><Check size={14}/> Start fresh at the very next meal.</li>
        </ul>
      </div>
      <button 
        onClick={onClose}
        className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition"
      >
        I'm Okay Now
      </button>
    </div>
  </div>
);

// 3. MAIN DASHBOARD
export default function App() {
  const [view, setView] = useState('loading'); // loading, quiz, dashboard
  const [bucketScore, setBucketScore] = useState(0);
  const [activeTab, setActiveTab] = useState('tracker');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPanic, setShowPanic] = useState(false);
  
  // Tracker State: Array of 21 days
  const [tracker, setTracker] = useState(Array(21).fill({
    noGluten: false,
    noSugar: false,
    noSeedOils: false,
    greenTea: false,
    mood: null // null, 'bad', 'ok', 'good'
  }));

  // Load state from local storage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('gutResetData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setBucketScore(parsed.bucketScore);
      setTracker(parsed.tracker);
      setView('dashboard');
    } else {
      setView('quiz');
    }
  }, []);

  // Save state whenever it changes
  useEffect(() => {
    if (view === 'dashboard') {
      localStorage.setItem('gutResetData', JSON.stringify({ bucketScore, tracker }));
    }
  }, [bucketScore, tracker, view]);

  const handleQuizComplete = (finalScore) => {
    setBucketScore(finalScore);
    setView('dashboard');
  };

  const updateTracker = (dayIndex, field, value) => {
    const newTracker = [...tracker];
    newTracker[dayIndex] = { ...newTracker[dayIndex], [field]: value };
    setTracker(newTracker);
  };

  const calculateDay = () => {
    // Find the first incomplete day
    const idx = tracker.findIndex(d => !d.mood);
    return idx === -1 ? 21 : idx + 1;
  };

  const currentDay = calculateDay();

  if (view === 'loading') return null;
  if (view === 'quiz') return <Quiz onComplete={handleQuizComplete} />;

  // --- DASHBOARD RENDER ---
  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      {/* HEADER */}
      <header className="bg-emerald-700 text-white p-6 pb-12 rounded-b-[2.5rem] shadow-lg relative">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold">Gut Reset</h1>
            <p className="text-emerald-100 opacity-90">Day {currentDay} of 21</p>
          </div>
          <button 
            onClick={() => setShowPanic(true)}
            className="bg-rose-500/20 hover:bg-rose-500/40 text-white p-2 px-3 rounded-full text-xs font-bold border border-rose-400/50 flex items-center gap-1 transition"
          >
            <AlertCircle size={14} /> SOS
          </button>
        </div>

        {/* BUCKET VISUALIZATION */}
        <div className="bg-emerald-800/50 rounded-xl p-4 flex items-center gap-4 backdrop-blur-sm">
          <div className="h-16 w-12 bg-white/10 rounded-b-lg border-2 border-white/30 relative overflow-hidden">
            <div 
              className={`absolute bottom-0 w-full transition-all duration-1000 ${bucketScore > 70 ? 'bg-rose-400' : 'bg-blue-400'}`}
              style={{ height: `${bucketScore}%` }}
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-emerald-100">Inflammation Bucket</span>
              <span className="font-bold">{bucketScore}% Full</span>
            </div>
            <p className="text-xs text-emerald-200 leading-tight">
              {bucketScore > 70 ? "Your bucket is nearly overflowing. The 21-day reset is crucial." : "You have some wiggle room, but let's build resilience."}
            </p>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="px-4 -mt-8 relative z-10 max-w-xl mx-auto">
        
        {/* TABS */}
        <div className="flex bg-white rounded-xl shadow-sm p-1 mb-6">
          {['tracker', 'food', 'guide'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition ${
                activeTab === tab ? 'bg-emerald-100 text-emerald-800' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* TAB 1: TRACKER */}
        {activeTab === 'tracker' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Check className="text-emerald-500" size={20} /> Daily Checklist
              </h2>
              
              <div className="space-y-4">
                {[
                  { id: 'noGluten', label: 'Avoided Gluten', icon: <Ban size={16} /> },
                  { id: 'noSugar', label: 'Avoided Added Sugar', icon: <Ban size={16} /> },
                  { id: 'noSeedOils', label: 'Avoided Seed Oils', icon: <Droplets size={16} /> },
                  { id: 'greenTea', label: 'Drank Green Tea (Correctly)', icon: <Leaf size={16} /> },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-emerald-50/50 cursor-pointer transition">
                    <input 
                      type="checkbox"
                      checked={tracker[currentDay - 1]?.[item.id]}
                      onChange={(e) => updateTracker(currentDay - 1, item.id, e.target.checked)}
                      className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300"
                    />
                    <div className="text-gray-400">{item.icon}</div>
                    <span className="text-gray-700 font-medium">{item.label}</span>
                  </label>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Mood Check-in</h3>
                <div className="flex justify-between gap-2">
                  {['😫', '😐', '🙂', '🤩'].map((emoji, idx) => {
                    const moodVal = ['bad', 'meh', 'good', 'great'][idx];
                    const isSelected = tracker[currentDay - 1]?.mood === moodVal;
                    return (
                      <button
                        key={moodVal}
                        onClick={() => updateTracker(currentDay - 1, 'mood', moodVal)}
                        className={`text-2xl p-4 rounded-xl flex-1 transition ${isSelected ? 'bg-emerald-100 ring-2 ring-emerald-500' : 'bg-gray-50 grayscale hover:grayscale-0'}`}
                      >
                        {emoji}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* PROGRESS STRIP */}
            <div className="bg-white rounded-xl shadow-sm p-4 overflow-x-auto">
              <h3 className="text-xs font-bold text-gray-400 mb-2 uppercase">Your 21-Day Streak</h3>
              <div className="flex gap-1">
                {tracker.map((day, i) => (
                  <div 
                    key={i}
                    className={`h-8 w-2 flex-shrink-0 rounded-full ${
                      day.mood ? 'bg-emerald-500' : (i + 1 === currentDay ? 'bg-emerald-200 animate-pulse' : 'bg-gray-200')
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FOOD SWAPPER */}
        {activeTab === 'food' && (
          <div className="bg-white rounded-xl shadow-sm min-h-[500px] flex flex-col">
            <div className="p-4 border-b border-gray-100 sticky top-0 bg-white z-10 rounded-t-xl">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search food (e.g. Rice, Milk)..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-700"
                  onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                />
              </div>
            </div>
            
            <div className="p-2 flex-1 overflow-y-auto">
              {foodDatabase
                .filter(f => f.name.toLowerCase().includes(searchQuery))
                .map((food, idx) => (
                <div key={idx} className="p-4 mb-2 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800 text-lg">{food.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                      food.status === 'avoid' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {food.status === 'avoid' ? 'Avoid' : 'Eat'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{food.reason}</p>
                  
                  {food.swaps.length > 0 && (
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-xs text-gray-400 uppercase font-bold mb-2">Better Alternatives:</p>
                      <div className="flex flex-wrap gap-2">
                        {food.swaps.map(swap => (
                          <span key={swap} className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-md font-medium border border-emerald-100">
                            {swap}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {foodDatabase.filter(f => f.name.toLowerCase().includes(searchQuery)).length === 0 && (
                <div className="text-center py-10 text-gray-400">
                  <p>No foods found. Try "Rice" or "Milk"</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: GUIDE */}
        {activeTab === 'guide' && (
          <div className="space-y-4">
            <div className="bg-indigo-600 text-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold mb-2">The 3-Week Protocol</h2>
              <p className="opacity-90 text-sm">Based on Dr. Will Cole's "Gut Feelings". Eliminate the triggers to calm the inflammation.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-100">
              <div className="p-4">
                <div className="flex items-center gap-3 mb-2 text-rose-600 font-bold">
                  <Ban size={20} />
                  <h3>Strictly Avoid (The Core 4)</h3>
                </div>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 ml-2">
                  <li>Gluten (Wheat, Barley, Rye)</li>
                  <li>Industrial Seed Oils (Canola, Corn, Soy)</li>
                  <li>Conventional Dairy (Milk, Cheese)</li>
                  <li>Added Sugar & Alcohol</li>
                </ul>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-3 mb-2 text-emerald-600 font-bold">
                  <Check size={20} />
                  <h3>Eat Freely</h3>
                </div>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 ml-2">
                  <li>Healthy Fats (Avocado, Olive Oil, Ghee)</li>
                  <li>Clean Protein (Salmon, Grass-fed Beef, Eggs)</li>
                  <li>Gut Healers (Bone Broth, Sauerkraut)</li>
                  <li>Safe Starches (Sweet Potato, White Rice cooled 12hrs)</li>
                </ul>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-3 mb-2 text-blue-600 font-bold">
                  <Coffee size={20} />
                  <h3>Green Tea Protocol</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">Drink 1-2 cups daily for the EGCG benefits.</p>
                <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-800">
                  <strong>Rule:</strong> Drink 30 mins <em>after</em> a meal. Never on an empty stomach (causes nausea). No milk/sugar.
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODALS */}
      {showPanic && <PanicModal onClose={() => setShowPanic(false)} />}
    </div>
  );
}
