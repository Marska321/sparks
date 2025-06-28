import React from 'react';
import { Shield, Users, BookOpen, TrendingUp } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Admin Dashboard</h2>
        <p className="text-gray-600">Manage SparkSkill platform and users</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Total Users</h3>
              <p className="text-2xl font-bold text-blue-600">1,234</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <BookOpen className="text-green-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Lessons Completed</h3>
              <p className="text-2xl font-bold text-green-600">5,678</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <TrendingUp className="text-purple-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Active Today</h3>
              <p className="text-2xl font-bold text-purple-600">89</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <Shield className="text-yellow-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Premium Users</h3>
              <p className="text-2xl font-bold text-yellow-600">456</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">New user registration: Sarah Johnson</span>
            <span className="text-sm text-gray-500">2 minutes ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">Lesson completed: "Young Entrepreneur Mindset"</span>
            <span className="text-sm text-gray-500">5 minutes ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">Premium upgrade: Mike Chen</span>
            <span className="text-sm text-gray-500">10 minutes ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
