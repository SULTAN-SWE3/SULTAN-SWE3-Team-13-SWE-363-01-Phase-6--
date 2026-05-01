import { createBrowserRouter, Navigate, Outlet } from 'react-router';
import { Root } from './components/layout/Root';
import { Admin } from './components/pages/Admin';
import { Dashboard } from './components/pages/Dashboard';
import { Login } from './components/pages/Login';
import { Moderator } from './components/pages/Moderator';
import { NotFound } from './components/pages/NotFound';
import { Overview } from './components/pages/Overview';
import { Profile } from './components/pages/Profile';
import { Resources } from './components/pages/Resources';
import { Roadmap } from './components/pages/Roadmap';
import { SignUp } from './components/pages/SignUp';
import { Upload } from './components/pages/Upload';

type UserRole = 'student' | 'moderator' | 'admin';

function RequireAuth({ allowedRoles }: { allowedRoles?: UserRole[] }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = (localStorage.getItem('userRole') || 'student') as UserRole;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Overview />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    element: <RequireAuth />,
    children: [
      {
        path: '/app',
        element: <Root />,
        children: [
          { index: true, element: <Navigate to="/app/dashboard" replace /> },
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'roadmap', element: <Roadmap /> },
          { path: 'resources', element: <Resources /> },
          { path: 'library', element: <Navigate to="/app/resources" replace /> },
          { path: 'upload', element: <Upload /> },
          { path: 'profile', element: <Profile /> },
          {
            element: <RequireAuth allowedRoles={['moderator', 'admin']} />,
            children: [{ path: 'moderator', element: <Moderator /> }],
          },
          {
            element: <RequireAuth allowedRoles={['admin']} />,
            children: [{ path: 'admin', element: <Admin /> }],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
