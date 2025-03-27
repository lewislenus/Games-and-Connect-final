import React from 'react';
import EventManagement from '../components/EventManagement';
import MessageList from '../components/MessageList';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 p-6">
      <section>
        <h2 className="text-2xl font-bold mb-4">Event Management</h2>
        <EventManagement />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>
        <MessageList />
      </section>
    </div>
  );
}