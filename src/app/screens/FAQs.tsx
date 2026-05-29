import { useState } from 'react';
import { Menu, ArrowLeft, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { BottomNav } from '../components/BottomNav';
import { Sidebar } from '../components/Sidebar';
import { useNavigate } from 'react-router';
import { Input } from '../components/ui/input';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    id: '1',
    category: 'Account',
    question: 'How do I reset my password?',
    answer:
      'To reset your password, go to Settings > Account Security > Change Password. You will need to enter your current password and then create a new one.',
  },
  {
    id: '2',
    category: 'Account',
    question: 'Can I have multiple accounts?',
    answer:
      'Yes! You can add multiple accounts by going to the sidebar menu and selecting "Add Account". This allows you to switch between different student profiles.',
  },
  {
    id: '3',
    category: 'Communities',
    question: 'How do I join a community?',
    answer:
      'Go to the Chats tab and tap the "+" button. You can then search for communities by course name or code and tap "Join" to become a member.',
  },
  {
    id: '4',
    category: 'Communities',
    question: 'How do I create a custom group?',
    answer:
      'In the Chats tab, tap the "+" button and select "Create Group". Enter a group name and add members by searching for their usernames.',
  },
  {
    id: '5',
    category: 'Materials',
    question: 'How do I upload files?',
    answer:
      'Go to the Materials tab and tap the "Upload File" button in the header. Select the community folder, choose your file, and provide a name before uploading.',
  },
  {
    id: '6',
    category: 'Materials',
    question: 'Can I rate documents?',
    answer:
      'Yes! When viewing files in the Materials tab, you can rate them using the star rating system. This helps other students find the most helpful resources.',
  },
  {
    id: '7',
    category: 'Notifications',
    question: 'What types of notifications will I receive?',
    answer:
      'You will receive notifications for @mentions, document ratings, replies to your comments, and upcoming assessment deadlines.',
  },
  {
    id: '8',
    category: 'Notifications',
    question: 'How do I manage notification settings?',
    answer:
      'Go to Settings > Notifications to customize which types of notifications you want to receive and how you want to be notified.',
  },
];

export function FAQs() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = Array.from(new Set(faqs.map((faq) => faq.category)));

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-black text-white border-b border-gray-800 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/activity')}
                className="text-white hover:text-gray-300"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-semibold">FAQs</h1>
            </div>

            <button
              onClick={() => setSidebarOpen(true)}
              className="text-white hover:text-gray-300"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-black mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 mb-4">
            Find answers to common questions about Uni Connect+
          </p>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              className="pl-10 border-gray-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* FAQs by Category */}
        {categories.map((category) => {
          const categoryFaqs = filteredFaqs.filter(
            (faq) => faq.category === category
          );

          if (categoryFaqs.length === 0) return null;

          return (
            <div key={category} className="mb-6">
              <h3 className="text-lg font-semibold text-black mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                {category}
              </h3>

              <div className="space-y-3">
                {categoryFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() =>
                        setExpandedId(expandedId === faq.id ? null : faq.id)
                      }
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-black pr-4">
                        {faq.question}
                      </span>
                      {expandedId === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                      )}
                    </button>

                    {expandedId === faq.id && (
                      <div className="px-4 pb-4 text-gray-600 border-t border-gray-100 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {filteredFaqs.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No results found
            </h3>
            <p className="text-gray-600">
              Try searching with different keywords
            </p>
          </div>
        )}

        {/* Contact Support */}
        <div className="bg-indigo-50 rounded-xl border border-indigo-200 p-6 mt-8">
          <h3 className="text-lg font-semibold text-black mb-2">
            Still need help?
          </h3>
          <p className="text-gray-600 mb-4">
            Can't find the answer you're looking for? Our support team is here to
            help.
          </p>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Contact Support
          </Button>
        </div>
      </main>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <BottomNav />
    </div>
  );
}
