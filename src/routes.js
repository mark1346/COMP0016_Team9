import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import GenerateView from 'src/views/generate/GenerateView';
import NotFoundView from 'src/views/errors/NotFoundView';
import TrainView from 'src/views/train/TrainView';
import Home from 'src/views/home';
import SelectModel from 'src/views/selectModel';
import SelectPreference from 'src/views/selectPreference';
import FinalPage from 'src/views/finalPage';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'generate', element: <GenerateView /> },
      { path: 'home', element: <Home /> },
      { path: 'train', element: <TrainView /> },
      { path: 'selectModel', element: <SelectModel /> },
      { path: 'selectPreference', element: <SelectPreference /> },
      { path: 'finalPage', element: <FinalPage /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/home" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
