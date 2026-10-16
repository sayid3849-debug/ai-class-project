import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import App from './App';
import Home from './pages/Home';
import { ProgressProvider } from './progress';
import './styles.css';
const Academy = lazy(() => import('./pages/Academy').then((m) => ({ default: m.Academy })));
const LevelPage = lazy(() => import('./pages/Academy').then((m) => ({ default: m.LevelPage })));
const LessonPage = lazy(() => import('./pages/Academy').then((m) => ({ default: m.LessonPage })));
const NotFound = lazy(() => import('./pages/Academy').then((m) => ({ default: m.NotFound })));
const Quizzes = lazy(() => import('./pages/Quizzes').then((m) => ({ default: m.Quizzes })));
const QuizPage = lazy(() => import('./pages/Quizzes').then((m) => ({ default: m.QuizPage })));
const Training = lazy(() => import('./pages/Training').then((m) => ({ default: m.Training })));
const MissionPage = lazy(() =>
  import('./pages/Training').then((m) => ({ default: m.MissionPage })),
);
const Coach = lazy(() => import('./pages/Coach'));
const Progress = lazy(() => import('./pages/Progress').then((m) => ({ default: m.Progress })));
const Achievements = lazy(() =>
  import('./pages/Progress').then((m) => ({ default: m.Achievements })),
);
const Parents = lazy(() => import('./pages/Progress').then((m) => ({ default: m.Parents })));
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'academy', element: <Academy /> },
      { path: 'academy/:levelId', element: <LevelPage /> },
      { path: 'academy/:levelId/lesson/:lessonId', element: <LessonPage /> },
      { path: 'quizzes', element: <Quizzes /> },
      { path: 'quiz/:levelId', element: <QuizPage /> },
      { path: 'training', element: <Training /> },
      { path: 'training/:missionId', element: <MissionPage /> },
      { path: 'coach', element: <Coach /> },
      { path: 'progress', element: <Progress /> },
      { path: 'achievements', element: <Achievements /> },
      { path: 'parents', element: <Parents /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <ProgressProvider>
        <Suspense
          fallback={
            <div className="page-loading" role="status">
              Lacing up your next adventure…
            </div>
          }
        >
          <RouterProvider router={router} />
        </Suspense>
      </ProgressProvider>
    </MotionConfig>
  </StrictMode>,
);
