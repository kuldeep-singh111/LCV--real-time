import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Task from './pages/Task';
import CreateTask from './pages/CreateTask';
import ProtectedRoute from './components/ProtectedRoute';


const queryClient = new QueryClient();

const App = () => {


  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-task"
            element={
              <ProtectedRoute> <CreateTask /> </ProtectedRoute>} />

          <Route
            path="/tasks"
            element={
              <ProtectedRoute> <Task /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>

      </Router>
    </QueryClientProvider>
  );
};

export default App;