import React from 'react';
import { Briefcase, Lightbulb, Star, Award } from 'lucide-react';
import { UserProgress } from '../types';

interface SparkFolioProps {
  userProgress: UserProgress;
}

const SparkFolio: React.FC<SparkFolioProps> = ({ userProgress }) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">My SparkFolio</h2>
        <p className="text-gray-600">Your entrepreneurial portfolio and achievements</p>
      </div>

      <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-8 rounded-2xl text-white">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-4xl font-bold">
            {userProgress.displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-3xl font-bold">{userProgress.displayName}</h3>
            <p className="text-xl opacity-90">Level {userProgress.level} Entrepreneur</p>
            <p className="opacity-75">{userProgress.email}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="text-blue-600" size={24} />
            <h3 className="text-xl font-bold text-gray-800">My Projects</h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-bold text-gray-700">School Supply Organizer</h4>
              <p className="text-sm text-gray-600">A solution to help students organize their supplies</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-bold text-gray-700">Pet Walking Service</h4>
              <p className="text-sm text-gray-600">Helping busy neighbors with their pets</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="text-yellow-600" size={24} />
            <h3 className="text-xl font-bold text-gray-800">Ideas Generated</h3>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-600 mb-2">{userProgress.ideasCreated}</div>
            <p className="text-gray-600">Business ideas created</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <Award className="text-purple-600" size={24} />
          <h3 className="text-xl font-bold text-gray-800">Achievements</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
            <div className="text-2xl mb-2">🧠</div>
            <p className="text-sm font-bold text-gray-700">Mindset Master</p>
          </div>
          <div className="text-center p-4 bg-gray-100 rounded-lg opacity-50">
            <div className="text-2xl mb-2">🔍</div>
            <p className="text-sm font-bold text-gray-500">Opportunity Spotter</p>
          </div>
          <div className="text-center p-4 bg-gray-100 rounded-lg opacity-50">
            <div className="text-2xl mb-2">💡</div>
            <p className="text-sm font-bold text-gray-500">Idea Generator</p>
          </div>
          <div className="text-center p-4 bg-gray-100 rounded-lg opacity-50">
            <div className="text-2xl mb-2">📊</div>
            <p className="text-sm font-bold text-gray-500">Market Researcher</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SparkFolio;
