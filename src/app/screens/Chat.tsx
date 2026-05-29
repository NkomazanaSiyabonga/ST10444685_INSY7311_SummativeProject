import { useState } from 'react';
import { ArrowLeft, Send, MoreVertical } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

interface Message {
  id: number;
  sender: string;
  content: string;
  time: string;
  isOwn: boolean;
}

const mockMessages: Message[] = [
  {
    id: 1,
    sender: 'John Smith',
    content: 'Hey everyone! Has anyone started the project yet?',
    time: '10:30 AM',
    isOwn: false,
  },
  {
    id: 2,
    sender: 'Sarah Chen',
    content: 'I have! Working on the research phase right now.',
    time: '10:32 AM',
    isOwn: false,
  },
  {
    id: 3,
    sender: 'You',
    content: 'Same here. Should we set up a meeting to discuss our approach?',
    time: '10:35 AM',
    isOwn: true,
  },
  {
    id: 4,
    sender: 'Mike Johnson',
    content: 'Good idea! I\'m free tomorrow afternoon.',
    time: '10:37 AM',
    isOwn: false,
  },
  {
    id: 5,
    sender: 'Sarah Chen',
    content: 'Works for me. What time?',
    time: '10:38 AM',
    isOwn: false,
  },
];

export function Chat() {
  const navigate = useNavigate();
  const location = useLocation();
  const community = location.state?.community;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'You',
      content: message,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-black text-white border-b border-gray-800">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/communities')}
              className="text-gray-300 hover:text-white"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="font-semibold">{community?.name || 'Community Chat'}</h1>
              <p className="text-xs text-gray-400">{community?.memberCount || 0} members</p>
            </div>
          </div>
          <button className="text-gray-300 hover:text-white">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[75%] ${msg.isOwn ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
              {!msg.isOwn && (
                <span className="text-xs font-medium text-gray-700 px-1">{msg.sender}</span>
              )}
              <div
                className={`rounded-2xl px-4 py-2 ${
                  msg.isOwn
                    ? 'bg-indigo-600 text-white rounded-br-sm'
                    : 'bg-gray-100 text-black rounded-bl-sm'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
              <span className="text-xs text-gray-500 px-1">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border-gray-300"
          />
          <Button
            type="submit"
            size="icon"
            className="bg-indigo-600 hover:bg-indigo-700 text-white shrink-0"
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
