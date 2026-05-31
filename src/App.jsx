import React, { useState, useEffect } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Edit2, 
  Check, 
  Flame, 
  Sparkles 
} from "lucide-react";

const getStartOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
};

const formatDateKey = (date) => {
  return date.toISOString().split("T")[0];
};

const getWeekDays = (startDate) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(startDate);
    nextDay.setDate(startDate.getDate() + i);
    days.push(nextDay);
  }
  return days;
};

const calculateStreak = (history) => {
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const checkDate = new Date(today);
  const todayStr = formatDateKey(checkDate);
  
  if (history[todayStr]) {
    streak++;
    checkDate.setDate(checkDate.getDate() - 1);
  } else {
    checkDate.setDate(checkDate.getDate() - 1);
    const yesterdayStr = formatDateKey(checkDate);
    if (!history[yesterdayStr]) {
      return 0;
    }
  }

  while (true) {
    const dateStr = formatDateKey(checkDate);
    if (history[dateStr]) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
};

export default function App() {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("dev_habits");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const start = getStartOfWeek(new Date());
    start.setHours(0, 0, 0, 0);
    return start;
  });

  const [newHabitName, setNewHabitName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    localStorage.setItem("dev_habits", JSON.stringify(habits));
  }, [habits]);

  const weekDays = getWeekDays(currentWeekStart);
  const todayStr = formatDateKey(new Date());

  const handleAddHabit = (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;

    const newHabit = {
      id: crypto.randomUUID(),
      name: newHabitName.trim(),
      history: {}
    };

    setHabits([...habits, newHabit]);
    setNewHabitName("");
  };

  const handleToggleDay = (habitId, dateStr) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(dateStr);
    
    if (targetDate > today) return;

    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        return {
          ...habit,
          history: {
            ...habit.history,
            [dateStr]: !habit.history[dateStr]
          }
        };
      }
      return habit;
    }));
  };

  const handleDeleteHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const handleStartEdit = (habit) => {
    setEditingId(habit.id);
    setEditingName(habit.name);
  };

  const handleSaveEdit = (id) => {
    if (!editingName.trim()) return;
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, name: editingName.trim() } : habit
    ));
    setEditingId(null);
  };

  const handleNavigateWeek = (direction) => {
    const nextStart = new Date(currentWeekStart);
    nextStart.setDate(currentWeekStart.getDate() + direction * 7);
    setCurrentWeekStart(nextStart);
  };

  const handleResetToCurrentWeek = () => {
    const start = getStartOfWeek(new Date());
    start.setHours(0, 0, 0, 0);
    setCurrentWeekStart(start);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Habit Tracker
            </h1>
            <p className="text-slate-400 text-sm mt-1">Track consistency, build momentum.</p>
          </div>

          <div className="flex items-center gap-3 bg-slate-800 p-1.5 rounded-xl border border-slate-700/50 self-start">
            <button 
              type="button"
              onClick={() => handleNavigateWeek(-1)}
              className="p-2 hover:bg-slate-700 rounded-lg transition"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-xs font-semibold px-2 min-w-[140px] text-center text-slate-300">
              Week of {currentWeekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
            <button 
              type="button"
              onClick={() => handleNavigateWeek(1)}
              className="p-2 hover:bg-slate-700 rounded-lg transition"
            >
              <ChevronRight size={18} />
            </button>
            <div className="h-4 w-[1px] bg-slate-700 mx-1" />
            <button 
              type="button"
              onClick={handleResetToCurrentWeek}
              className="p-2 hover:bg-slate-700 rounded-lg text-indigo-400 hover:text-indigo-300 transition"
              title="Back to current week"
            >
              <RotateCcw size={18} />
            </button>
          </div>
        </header>

        <form onSubmit={handleAddHabit} className="flex gap-2 mb-8 max-w-md">
          <input
            type="text"
            placeholder="Add a new habit (e.g., Coding for 1 hour)..."
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 text-slate-100 placeholder-slate-500 transition"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 rounded-xl flex items-center justify-center transition active:scale-95"
          >
            <Plus size={20} />
          </button>
        </form>

        {habits.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-12 bg-slate-800/40 rounded-2xl border border-dashed border-slate-700 max-w-xl mx-auto mt-12">
            <div className="p-4 bg-slate-800 rounded-full text-indigo-400 mb-4 shadow-xl">
              <Sparkles size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-200">No habits tracked yet</h3>
            <p className="text-slate-400 text-sm max-w-sm mt-1">
              Start building discipline. Type a habit above and tick the boxes as you complete them each day.
            </p>
          </div>
        ) : (
          <div className="bg-slate-800/60 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                
                <div className="grid grid-cols-[280px_repeat(7,1fr)_80px] border-b border-slate-800 bg-slate-800/40 py-3 px-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <div>Habit</div>
                  {weekDays.map((day, idx) => {
                    const formatted = formatDateKey(day);
                    const isToday = formatted === todayStr;
                    return (
                      <div 
                        key={idx} 
                        className={`text-center py-1 rounded-md transition ${isToday ? "bg-indigo-500/10 text-indigo-400 font-extrabold border border-indigo-500/20" : ""}`}
                      >
                        <div>{day.toLocaleDateString("en-US", { weekday: "short" })}</div>
                        <div className="text-base mt-0.5">{day.getDate()}</div>
                      </div>
                    );
                  })}
                  <div className="text-center flex items-center justify-center gap-1">
                    <Flame size={14} className="text-orange-500" /> Streak
                  </div>
                </div>

                <div className="divide-y divide-slate-800/60">
                  {habits.map((habit) => {
                    const currentStreak = calculateStreak(habit.history);
                    return (
                      <div 
                        key={habit.id} 
                        className="grid grid-cols-[280px_repeat(7,1fr)_80px] items-center px-4 py-3.5 hover:bg-slate-800/30 transition group"
                      >
                        <div className="pr-4 flex items-center justify-between">
                          {editingId === habit.id ? (
                            <div className="flex items-center gap-2 w-full">
                              <input
                                type="text"
                                value={editingName}
                                onChange={(e) => setEditingName(e.target.value)}
                                className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 w-full"
                                autoFocus
                              />
                              <button 
                                type="button"
                                onClick={() => handleSaveEdit(habit.id)}
                                className="p-1 text-emerald-400 hover:bg-slate-700 rounded transition"
                              >
                                <Check size={16} />
                              </button>
                            </div>
                          ) : (
                            <>
                              <span className="text-sm font-medium text-slate-200 truncate">{habit.name}</span>
                              <div className="flex items-center opacity-0 group-hover:opacity-100 transition gap-1 ml-2">
                                <button
                                  type="button"
                                  onClick={() => handleStartEdit(habit)}
                                  className="p-1 text-slate-400 hover:text-indigo-400 hover:bg-slate-700/50 rounded transition"
                                >
                                  <Edit2 size={14} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteHabit(habit.id)}
                                  className="p-1 text-slate-400 hover:text-rose-400 hover:bg-slate-700/50 rounded transition"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </>
                          )}
                        </div>

                        {weekDays.map((day, idx) => {
                          const formatted = formatDateKey(day);
                          const isChecked = !!habit.history[formatted];
                          const isToday = formatted === todayStr;
                          const isFuture = day > new Date();

                          return (
                            <div 
                              key={idx} 
                              className={`flex justify-center items-center h-full py-1 ${isToday ? "bg-indigo-500/5" : ""}`}
                            >
                              <button
                                type="button"
                                disabled={isFuture}
                                onClick={() => handleToggleDay(habit.id, formatted)}
                                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${
                                  isChecked 
                                    ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20 scale-100" 
                                    : isFuture
                                      ? "bg-slate-800/20 border border-slate-800/40 cursor-not-allowed opacity-30"
                                      : "bg-slate-800 hover:bg-slate-700 border border-slate-700/60 active:scale-90"
                                }`}
                              >
                                {isChecked && <Check size={16} strokeWidth={3} />}
                              </button>
                            </div>
                          );
                        })}

                        <div className="flex items-center justify-center">
                          <span className={`text-sm font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                            currentStreak > 0 
                              ? "bg-orange-500/10 text-orange-400 font-extrabold" 
                              : "bg-slate-800 text-slate-500"
                          }`}>
                            {currentStreak}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}