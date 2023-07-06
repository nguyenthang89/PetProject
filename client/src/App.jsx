import * as React from "react";
import { Routes, Route } from 'react-router-dom';

import { Layout } from './components/layout/Layout';
import { ProtectedScreen } from "./components/ProtectedScreen";

const Dashboard = React.lazy(() => import(/* webpackChunkName: "admin-pages" */ './views/dashboard/Dashboard'));
const User = React.lazy(() => import(/* webpackChunkName: "admin-pages" */ './views/user/User'));
const Login = React.lazy(() => import(/* webpackChunkName: "global-pages" */ './views/login/Login'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "global-pages" */ './views/not-found/NotFound'));
const Loading = () => <div>Loading js resources....</div>

export const Application = () => {
  return (
    <Routes>
      <Route path="/login" element={
        <React.Suspense fallback={<Loading />}>
          <Login />
        </React.Suspense>
      } />
      <Route path="*" element={
        <Layout>
          <Routes>
            <Route path="/" element={
              <React.Suspense fallback={<Loading />}>
                <ProtectedScreen><Dashboard /></ProtectedScreen>
              </React.Suspense>
            } />
            <Route path="/users" element={
              <React.Suspense fallback={<Loading />}>
                <ProtectedScreen><User /></ProtectedScreen>
              </React.Suspense>
            } />
            <Route path="*" element={
              <React.Suspense fallback={<Loading />}>
                <NotFound />
              </React.Suspense>
            } />
          </Routes>
        </Layout>
      } />
    </Routes>
    
  );
}

