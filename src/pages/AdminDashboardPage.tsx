
import React, { useState } from 'react';
import EventManagement from '../components/EventManagement';
import MessageList from '../components/MessageList';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('events');

  return (
    <div className="space-y-8 p-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('events')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'events'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'messages'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Messages
          </button>
        </nav>
      </div>

      {activeTab === 'events' ? (
        <section>
          <h2 className="text-2xl font-bold mb-4">Event Management</h2>
          <EventManagement />
        </section>
      ) : (
        <section>
          <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>
          <MessageList />
        </section>
      )}
    </div>
  );
}
