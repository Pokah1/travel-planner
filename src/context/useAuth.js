// src/context/useAuth.js
import { useContext } from 'react';
import { AuthContext } from './AuthContext'; // Import the context object

export const useAuth = () => {
  return useContext(AuthContext);
};