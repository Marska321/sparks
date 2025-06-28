import React, { useState, useEffect, useCallback } from 'react';
import { 
  Star, Trophy, Lightbulb, Target, TrendingUp, Users, Award, Lock, 
  CheckCircle, PlayCircle, ArrowLeft, Clock, Wrench, ListChecks, 
  LogOut, DollarSign, Shield, Save, BookOpen, Send, Rocket 
} from 'lucide-react';
import { lessons, badges } from './data/lessonData';
import { useAuth, AuthProvider } from './contexts/AuthContext';
import { useModal, ModalProvider } from './contexts/ModalContext';
import { UserProgress, Lesson, Activity } from './types';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import Modal from './components/Modal';
import AdminDashboard from './components/AdminDashboard';
import ProgressView from './components/ProgressView';
import SparkFolio from './components/SparkFolio';
import { isSameDay } from './utils/helpers';

// Navigation Component
const Navigation = React.memo<{
  userProgress: UserProgress;
  handleLogout: () => void;
  setCurrentView: (view: string) => void;
}>(({ userProgress, handleLogout, setCurrentView }) => {
  const { currentUser } = useAuth();
  
  return (
    <div className="bg-white shadow-lg border-b-4 border-blue-400 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full">
              <Star className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">SparkSkill</h1>
              <p className="text-sm text-gray-600">Young Entrepreneur Academy</p>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            {userProgress.isPaid && (
              <div className="hidden sm:flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">
                <Award size={16}/>
                <span>Premium</span>
              </div>
            )}
            {userProgress.isAdmin && (
              <button 
                onClick={() => setCurrentView('admin')} 
                className="hidden sm:flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold"
              >
                <Shield size={16}/>
                <span>Admin</span>
              </button>
            )}
            <div className="hidden sm:flex items-center gap-2 bg-yellow-100 px-3 py-2 rounded-full">
              <Trophy className="text-yellow-600" size={16} />
              <span className="font-bold text-yellow-800">{userProgress.badges}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                {currentUser?.displayName?.charAt(0).toUpperCase() || 'S'}
              </div>
              <div className="hidden md:block">
                <p className="font-bold text-gray-800">{currentUser?.displayName || "Spark Star"}</p>
                <p className="text-xs text-gray-600">Level {userProgress.level} Entrepreneur</p>
              </div>
            </div>
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-500 transition-colors"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

// Lesson Card Component
const LessonCard = React.memo<{
  lesson: Lesson & { completed: boolean; current: boolean; isPaid: boolean };
  onClick: () => void;
}>(({ lesson, onClick }) => {
  const { isPaid, current, completed } = lesson;
  const isLockedByPayment = lesson.id > 1 && !isPaid;
  const isLockedByProgression = !completed && !current;
  const isLocked = isLockedByPayment || isLockedByProgression;
  const cursorStyle = isLocked ? 'cursor-not-allowed' : 'cursor-pointer';

  return (
    <div 
      onClick={isLocked ? undefined : onClick} 
      className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
        !isLocked ? 'hover:scale-105' : ''
      } ${cursorStyle} ${
        completed 
          ? 'bg-gradient-to-br from-green-50 to-blue-50 border-green-300 shadow-lg' 
          : current 
          ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-400 shadow-lg ring-2 ring-blue-300' 
          : 'bg-white border-gray-300'
      }`}
    >
      {isLocked && (
        <div className="absolute inset-0 bg-gray-200 bg-opacity-50 rounded-xl z-10"></div>
      )}
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-full text-2xl ${lesson.color || 'bg-gray-400'} text-white shadow-lg`}>
          {lesson.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-lg text-gray-800">{lesson.title}</h3>
            {completed && <CheckCircle className="text-green-500" size={20} />}
            {current && <PlayCircle className="text-blue-500" size={20} />}
            {isLockedByProgression && !isLockedByPayment && <Lock className="text-gray-400" size={20} />}
            {isLockedByPayment && <DollarSign className="text-yellow-500" size={20} />}
          </div>
          <p className="text-gray-600 text-sm mb-3">{lesson.description}</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>{lesson.sections} sections</span>
            <span>•</span>
            <span>{lesson.duration}</span>
          </div>
        </div>
      </div>
      {completed && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-2">
          <Trophy size={16} />
        </div>
      )}
    </div>
  );
});

// Lesson Detail View Component
const LessonDetailView: React.FC<{
  lesson: Lesson;
  userProgress: UserProgress;
  onBack: () => void;
  onComplete: (lessonId: number, answers: Record<string, string>) => void;
  showModal: (title: string, content: string | React.ReactNode) => void;
}> = ({ lesson, userProgress, onBack, onComplete, showModal }) => {
  const { currentUser } = useAuth();
  const [answers, setAnswers] = useState<Record<string, string>>(() => 
    userProgress?.lessonAnswers?.[`lesson${lesson.id}`] || {}
  );
  
  const handleAnswerChange = useCallback((activity: Activity, taskIndex: number, value: string) => {
    const key = activity.isReflection 
      ? `reflection_${taskIndex}` 
      : `activity${activity.id}_writeAnswer_${taskIndex}`;
    setAnswers(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleSaveProgress = useCallback(async () => {
    if (!currentUser || !userProgress) return;
    try {
      // Mock save - in production this would save to Firebase
      showModal("Progress Saved!", "Your answers have been saved successfully.");
    } catch (error) {
      console.error("Error saving progress: ", error);
      showModal("Save Error", "Could not save your answers. Please try again.");
    }
  }, [currentUser, userProgress, showModal]);

  if (!lesson.content) {
    return <div>Lesson content not available</div>;
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 animate-fade-in-up">
      <div className="flex items-center justify-between mb-8 border-b-2 pb-6 border-gray-100">
        <div className="flex items-center gap-6">
          <div className={`text-4xl p-4 rounded-full text-white ${lesson.color || 'bg-gray-400'}`}>
            {lesson.icon}
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-800">{lesson.title}</h1>
            <p className="text-gray-600 mt-1">{lesson.description}</p>
          </div>
        </div>
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 px-6 py-3 rounded-full font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all"
        >
          <ArrowLeft size={20} />
          Back
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-2">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Lesson Overview</h3>
          <p className="text-gray-700 leading-relaxed">{lesson.content.overview}</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Checklist</h3>
          <ul className="space-y-3">
            {lesson.content.checklist.map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Activities</h2>
        <div className="space-y-6">
          {lesson.content.activities.map((activity, index) => (
            <div key={activity.id} className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-blue-600 mb-4">
                Activity {index + 1}: {activity.title}
              </h3>
              <div className="flex items-center gap-8 text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-2">
                  <Clock size={16}/> {activity.time}
                </span>
                <span className="flex items-center gap-2">
                  <Wrench size={16}/> {activity.tools.join(', ')}
                </span>
              </div>
              <p className="text-gray-700 mb-4">{activity.description}</p>
              
              {activity.writeAnswers && (
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <ListChecks size={18}/> Tasks:
                  </h4>
                  <div className="space-y-4">
                    {activity.writeAnswers.map((task, i) => {
                      const answerKey = activity.isReflection 
                        ? `reflection_${i}` 
                        : `activity${activity.id}_writeAnswer_${i}`;
                      const value = answers[answerKey] || '';
                      const parts = task.split("___");
                      
                      return (
                        <div key={i} className="flex flex-col gap-2 text-gray-700">
                          <label className="font-semibold text-left">{parts[0]}</label>
                          {activity.isReflection ? (
                            <textarea 
                              value={value} 
                              onChange={(e) => handleAnswerChange(activity, i, e.target.value)} 
                              className="w-full bg-gray-100 border-2 border-gray-200 focus:border-blue-500 focus:outline-none p-2 rounded-md h-24" 
                              placeholder="Your thoughts here..." 
                            />
                          ) : (
                            <input 
                              type="text" 
                              value={value} 
                              onChange={(e) => handleAnswerChange(activity, i, e.target.value)} 
                              className="w-full bg-gray-100 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none px-2 py-1 rounded-md" 
                            />
                          )}
                          {parts[1] && <span>{parts[1]}</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {activity.tip && (
                <p className="text-sm text-purple-600 bg-purple-50 p-3 mt-4 rounded-lg">
                  <strong>Tip:</strong> {activity.tip}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t-2 flex justify-center items-center gap-4 flex-wrap">
        <button 
          onClick={handleSaveProgress} 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center gap-3">
            <Save size={24}/>
            <span>Save Progress</span>
          </div>
        </button>
        <button 
          onClick={() => onComplete(lesson.id, answers)} 
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 text-lg shadow-lg hover:shadow-xl disabled:bg-gray-400" 
          disabled={userProgress.completedLessons.includes(lesson.id)}
        >
          <div className="flex items-center gap-3">
            {userProgress.completedLessons.includes(lesson.id) ? (
              <CheckCircle size={24}/>
            ) : (
              <Trophy size={24}/>
            )}
            <span>
              {userProgress.completedLessons.includes(lesson.id) ? 'Lesson Complete!' : 'Mark as Complete'}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

// Auth Gate Component
function AuthGate() {
  const [authView, setAuthView] = useState('login');
  
  let viewComponent;
  switch(authView) {
    case 'signup': 
      viewComponent = <SignUp toggleForm={setAuthView} />; 
      break;
    case 'forgotPassword': 
      viewComponent = <ForgotPassword toggleForm={setAuthView} />; 
      break;
    default: 
      viewComponent = <Login toggleForm={setAuthView} />;
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
          <Star className="text-white" size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-800">SparkSkill</h1>
          <p className="text-lg text-gray-600">Young Entrepreneur Academy</p>
        </div>
      </div>
      {viewComponent}
    </div>
  );
}

// Main App Component
function MainApp() {
  const { currentUser } = useAuth();
  const { showModal } = useModal();
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    if (!currentUser) return;
    
    // Mock user progress - in production this would come from Firebase
    const mockProgress: UserProgress = {
      displayName: currentUser.displayName || "Demo User",
      email: currentUser.email,
      level: 1,
      badges: 1,
      streak: 3,
      ideasCreated: 2,
      completedLessons: [1],
      currentLesson: 2,
      isPaid: false,
      isAdmin: false,
      lessonAnswers: {}
    };
    
    setUserProgress(mockProgress);
  }, [currentUser]);

  const UpgradeModalContent = () => (
    <div className="text-center">
      <Rocket size={48} className="mx-auto text-green-500 mb-4" />
      <p className="text-lg text-gray-700">
        You've completed the first lesson and you're on your way to becoming a SparkStar!
      </p>
      <p className="mt-4 font-bold text-xl text-blue-600">
        Ready to unlock all 12 lessons and your full potential?
      </p>
      <div className="mt-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg">
        <p>Please ask a parent to contact us to upgrade to a Premium account and continue your journey!</p>
      </div>
    </div>
  );

  const handleCompleteLesson = useCallback(async (lessonId: number, answers: Record<string, string>) => {
    if (!userProgress || !currentUser) return;
    if (userProgress.completedLessons.includes(lessonId)) {
      showModal("Already Done!", "You've already completed this lesson.");
      return;
    }
    
    try {
      // Mock completion - in production this would update Firebase
      const newBadgesCount = userProgress.badges + (badges.some(b => b.lesson === lessonId) ? 1 : 0);
      const newCompletedLessons = [...userProgress.completedLessons, lessonId];
      const newLevel = Math.floor(newCompletedLessons.length / 3) + 1;
      
      const updatedProgress: UserProgress = { 
        ...userProgress, 
        completedLessons: newCompletedLessons, 
        currentLesson: userProgress.currentLesson + 1, 
        badges: newBadgesCount,
        level: newLevel,
        lessonAnswers: { ...userProgress.lessonAnswers, [`lesson${lessonId}`]: answers }
      };
      
      setUserProgress(updatedProgress);
      setSelectedLesson(null);
      
      if (lessonId === 1 && !userProgress.isPaid) {
        showModal("Congratulations!", <UpgradeModalContent />);
      } else {
        showModal("Lesson Complete!", "Great job! Your progress has been saved.");
      }
    } catch (error) {
      console.error("Error completing lesson: ", error);
      showModal("Save Error", "Failed to save your progress. Please try again.");
    }
  }, [currentUser, userProgress, showModal]);

  const handleLogout = async () => {
    try {
      // Mock logout - in production this would sign out from Firebase
      console.log('Logging out...');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const handleLessonClick = useCallback((lesson: Lesson) => {
    if (!userProgress) return;
    
    if (lesson.id > 1 && !userProgress.isPaid) {
      showModal("Premium Content", "This lesson is for paid members! Please contact us to upgrade and unlock the full course.");
      return;
    }
    
    const isLockedByProgression = lesson.id !== userProgress.currentLesson && !userProgress.completedLessons.includes(lesson.id);
    if (isLockedByProgression) {
      showModal("Lesson Locked", "Please complete previous lessons to unlock this one!");
      return;
    }
    
    if (lesson.content) setSelectedLesson(lesson);
  }, [userProgress, showModal]);

  if (!userProgress) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold">Loading your SparkSkill Journey...</p>
      </div>
    );
  }
  
  const Dashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => { 
            const current = lessons.find(l => l.id === userProgress.currentLesson); 
            if (current) handleLessonClick(current); 
          }} 
          className="bg-gradient-to-br from-orange-400 to-red-500 p-6 rounded-xl text-white cursor-pointer hover:scale-105 transition-all duration-300"
        >
          <h3 className="font-bold text-lg mb-2">Continue Learning</h3>
          <p className="text-orange-100 text-sm mb-4">
            {lessons.find(l => l.id === userProgress.currentLesson)?.title || 'All Done!'}
          </p>
          <div className="flex items-center gap-2">
            <PlayCircle size={20} />
            <span>Resume Lesson {userProgress.currentLesson}</span>
          </div>
        </div>
        
        <div 
          onClick={() => setCurrentView('badges')} 
          className="bg-gradient-to-br from-purple-400 to-blue-500 p-6 rounded-xl text-white cursor-pointer hover:scale-105 transition-all duration-300"
        >
          <h3 className="font-bold text-lg mb-2">View Badges</h3>
          <p className="text-purple-100 text-sm mb-4">
            {userProgress.badges} earned • {badges.length - userProgress.badges} to unlock
          </p>
          <div className="flex items-center gap-2">
            <Trophy size={20} />
            <span>Check Collection</span>
          </div>
        </div>
        
        <div 
          onClick={() => setCurrentView('progress')} 
          className="bg-gradient-to-br from-green-400 to-teal-500 p-6 rounded-xl text-white cursor-pointer hover:scale-105 transition-all duration-300"
        >
          <h3 className="font-bold text-lg mb-2">Track Progress</h3>
          <p className="text-green-100 text-sm mb-4">See your journey</p>
          <div className="flex items-center gap-2">
            <TrendingUp size={20} />
            <span>View Stats</span>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your SparkSkill Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map(lesson => (
            <LessonCard 
              key={lesson.id} 
              lesson={{
                ...lesson, 
                completed: userProgress.completedLessons.includes(lesson.id), 
                current: lesson.id === userProgress.currentLesson, 
                isPaid: userProgress.isPaid
              }} 
              onClick={() => handleLessonClick(lesson)} 
            />
          ))}
        </div>
      </div>
    </div>
  );

  const BadgeCollection = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Badge Collection 🏆</h2>
        <p className="text-gray-600">Earn badges by completing lessons and mastering entrepreneurship skills!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {badges.map(badge => { 
          const isEarned = userProgress.completedLessons.includes(badge.lesson); 
          return <Badge key={badge.id} badge={{...badge, earned: isEarned }} />; 
        })}
      </div>
    </div>
  );
    
  const Badge: React.FC<{ badge: { id: number; name: string; icon: string; lesson: number; earned?: boolean } }> = ({ badge }) => (
    <div className={`relative p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
      badge.earned 
        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300 shadow-lg' 
        : 'bg-gray-100 border-gray-300'
    }`}>
      <div className="text-center">
        <div className={`text-4xl mb-3 ${badge.earned ? 'animate-bounce' : 'grayscale opacity-50'}`}>
          {badge.earned ? badge.icon : '🔒'}
        </div>
        <h3 className={`font-bold text-lg mb-2 ${badge.earned ? 'text-gray-800' : 'text-gray-500'}`}>
          {badge.name}
        </h3>
        <p className={`text-sm ${badge.earned ? 'text-gray-600' : 'text-gray-400'}`}>
          {badge.earned ? `Completed Lesson ${badge.lesson}` : `Complete Lesson ${badge.lesson}`}
        </p>
        {badge.earned && (
          <p className="text-xs text-green-600 font-medium mt-2">Earned</p>
        )}
      </div>
      {badge.earned && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
          <CheckCircle size={16} />
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    if (selectedLesson) {
      return (
        <LessonDetailView 
          lesson={selectedLesson} 
          userProgress={userProgress}
          onBack={() => setSelectedLesson(null)} 
          onComplete={handleCompleteLesson}
          showModal={showModal}
        />
      );
    }
    
    switch (currentView) {
      case 'dashboard': 
        return <Dashboard />;
      case 'badges': 
        return <BadgeCollection />;
      case 'admin': 
        return userProgress.isAdmin ? <AdminDashboard /> : <Dashboard />;
      case 'progress': 
        return <ProgressView userProgress={userProgress} lessons={lessons} />;
      case 'sparkfolio': 
        return <SparkFolio userProgress={userProgress} />;
      default: 
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navigation 
        userProgress={userProgress} 
        handleLogout={handleLogout} 
        setCurrentView={setCurrentView} 
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {!selectedLesson && (
          <div className="flex flex-wrap gap-4 mb-8">
            <button 
              onClick={() => setCurrentView('dashboard')} 
              className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                currentView === 'dashboard' 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setCurrentView('badges')} 
              className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                currentView === 'badges' 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Badge Collection
            </button>
            <button 
              onClick={() => setCurrentView('progress')} 
              className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                currentView === 'progress' 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Track Progress
            </button>
            <button 
              onClick={() => setCurrentView('sparkfolio')} 
              className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                currentView === 'sparkfolio' 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              My SparkFolio
            </button>
          </div>
        )}
        {renderContent()}
      </div>
    </div>
  );
}

// Main App Component with Auth Logic
function App() {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <AuthGate />;
  }
  
  return (
    <>
      <MainApp />
      <Modal />
    </>
  );
}

// App Wrapper with Providers
export default function AppWrapper() {
  return (
    <AuthProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </AuthProvider>
  );
}
