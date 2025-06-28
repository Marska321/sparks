import React from 'react';
import { TrendingUp, Trophy, Target, Calendar } from 'lucide-react';
import { UserProgress, Lesson } from '../types';

interface ProgressViewProps {
  userProgress: UserProgress;
  lessons: Lesson[];
}

const ProgressView: React.FC<ProgressViewProps> = ({ userProgress, lessons }) => {
  const completionPercentage = Math.round((userProgress.completedLessons.length / lessons.length) * 100);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Progress</h2>
        <p className="text-gray-600">Track your entrepreneurial journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center gap-4">
            <TrendingUp size={32} />
            <div>
              <h3 className="font-bold text-lg">Level</h3>
              <p className="text-3xl font-bold">{userProgress.level}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-teal-600 p-6 rounded-xl text-white">
          <div className="flex items-center gap-4">
            <Trophy size={32} />
            <div>
              <h3 className="font-bold text-lg">Badges</h3>
              <p className="text-3xl font-bold">{userProgress.badges}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-xl text-white">
          <div className="flex items-center gap-4">
            <Target size={32} />
            <div>
              <h3 className="font-bold text-lg">Completion</h3>
              <p className="text-3xl font-bold">{completionPercentage}%</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-xl text-white">
          <div className="flex items-center gap-4">
            <Calendar size={32} />
            <div>
              <h3 className="font-bold text-lg">Streak</h3>
              <p className="text-3xl font-bold">{userProgress.streak}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Lesson Progress</h3>
        <div className="space-y-4">
          {lessons.map((lesson) => {
            const isCompleted = userProgress.completedLessons.includes(lesson.id);
            const isCurrent = lesson.id === userProgress.currentLesson;
            
            return (
              <div key={lesson.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className={`text-2xl p-2 rounded-full ${lesson.color} text-white`}>
                  {lesson.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800">{lesson.title}</h4>
                  <p className="text-sm text-gray-600">{lesson.description}</p>
                </div>
                <div className="text-right">
                  {isCompleted && (
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                      Completed
                    </div>
                  )}
                  {isCurrent && !isCompleted && (
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                      Current
                    </div>
                  )}
                  {!isCompleted && !isCurrent && (
                    <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-bold">
                      Locked
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressView;
