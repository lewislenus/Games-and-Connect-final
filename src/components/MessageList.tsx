
import React, { useState, useEffect } from 'react';
import { contactService } from '../api/services/contactService';

export default function MessageList() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const data = await contactService.getMessages();
      setMessages(data);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      {messages.map(message => (
        <div key={message.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold">{message.name}</h3>
              <p className="text-gray-600">{message.email}</p>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(message.created_at).toLocaleDateString()}
            </span>
          </div>
          <p className="mt-2">{message.message}</p>
        </div>
      ))}
    </div>
  );
}
