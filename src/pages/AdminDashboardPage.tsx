
import React, { useState } from 'react';
import EventManagement from '../components/EventManagement';
import MessageList from '../components/MessageList';
import { BarChart3, Users, Calendar, Settings, MessageSquare } from 'lucide-react';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'events':
        return <EventManagement />;
      case 'messages':
        return <MessageList />;
      case 'overview':
        return <DashboardOverview />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        </div>
        <nav className="mt-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center px-6 py-3 text-left ${
              activeTab === 'overview' ? 'bg-primary-50 text-primary-600' : 'text-gray-600'
            }`}
          >
            <BarChart3 className="w-5 h-5 mr-3" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`w-full flex items-center px-6 py-3 text-left ${
              activeTab === 'events' ? 'bg-primary-50 text-primary-600' : 'text-gray-600'
            }`}
          >
            <Calendar className="w-5 h-5 mr-3" />
            Events
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center px-6 py-3 text-left ${
              activeTab === 'messages' ? 'bg-primary-50 text-primary-600' : 'text-gray-600'
            }`}
          >
            <MessageSquare className="w-5 h-5 mr-3" />
            Messages
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center px-6 py-3 text-left ${
              activeTab === 'settings' ? 'bg-primary-50 text-primary-600' : 'text-gray-600'
            }`}
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}

function DashboardOverview() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Events"
          value="24"
          icon={<Calendar className="w-8 h-8 text-primary-600" />}
        />
        <StatCard
          title="Active Events"
          value="8"
          icon={<Calendar className="w-8 h-8 text-green-600" />}
        />
        <StatCard
          title="Total Registrations"
          value="156"
          icon={<Users className="w-8 h-8 text-blue-600" />}
        />
        <StatCard
          title="Messages"
          value="12"
          icon={<MessageSquare className="w-8 h-8 text-purple-600" />}
        />
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        {icon}
      </div>
    </div>
  );
}
