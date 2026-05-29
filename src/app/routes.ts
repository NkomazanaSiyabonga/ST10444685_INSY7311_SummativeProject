import { createBrowserRouter } from 'react-router';
import { Splash } from './screens/Splash';
import { SignIn } from './screens/SignIn';
import { Register } from './screens/Register';
import { Activity } from './screens/Activity';
import { Communities } from './screens/Communities';
import { Chat } from './screens/Chat';
import { Materials } from './screens/Materials';
import { Settings } from './screens/Settings';
import { Notifications } from './screens/Notifications';
import { AddAccount } from './screens/AddAccount';
import { FAQs } from './screens/FAQs';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Splash,
  },
  {
    path: '/signin',
    Component: SignIn,
  },
  {
    path: '/register',
    Component: Register,
  },
  {
    path: '/activity',
    Component: Activity,
  },
  {
    path: '/communities',
    Component: Communities,
  },
  {
    path: '/chat/:communityId',
    Component: Chat,
  },
  {
    path: '/materials',
    Component: Materials,
  },
  {
    path: '/settings',
    Component: Settings,
  },
  {
    path: '/notifications',
    Component: Notifications,
  },
  {
    path: '/add-account',
    Component: AddAccount,
  },
  {
    path: '/faqs',
    Component: FAQs,
  },
]);