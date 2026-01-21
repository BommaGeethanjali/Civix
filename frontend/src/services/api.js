// // frontend/src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const signup = (userData) => api.post('/auth/signup', userData);
export const verifyOTP = (otpData) => api.post('/auth/verify-otp', otpData);
export const login = (credentials) => api.post('/auth/login', credentials);
export const resendOTP = (email) => api.post('/auth/resend-otp', { email });
export const getProfile = () => api.get('/auth/profile');

// Forgot Password APIs
export const forgotPassword = (data) => api.post('/auth/forgot-password', data);
export const verifyResetOTP = (data) => api.post('/auth/verify-reset-otp', data);
export const resetPassword = (data) => api.post('/auth/reset-password', data);

// ---------- PETITIONS ----------
export const createPetition = (petitionData) => api.post('/petitions', petitionData);
export const getPetitions = (filters = {}) => api.get('/petitions', { params: filters });
export const getPetitionById = (id) => api.get(`/petitions/${id}`);
export const editPetition = (id, data) => api.put(`/petitions/${id}`, data);
export const signPetition = (id) => api.post(`/petitions/${id}/sign`);
export const updatePetitionStatus = (id, statusData) => api.patch(`/petitions/${id}/status`, statusData);
export const deletePetition = (id) => api.delete(`/petitions/${id}`);

// Officer – Petitions
export const getOfficerPetitions = (filters = {}) =>
  api.get('/officer/petitions', { params: filters });

export const officerUpdatePetitionStatus = (id, status) =>
  api.patch(`/officer/petitions/${id}/status`, { status });

export const officerSetPetitionResponse = (id, response) =>
  api.patch(`/officer/petitions/${id}/response`, { response });

// ---------- POLLS ----------

export const getPolls = (filters = {}) => api.get('/polls', { params: filters });
export const createPoll = (data) => api.post('/polls', data);
export const votePoll = (pollId, optionId) => api.post(`/polls/${pollId}/vote/${optionId}`);
export const deletePoll = (pollId) => api.delete(`/polls/${pollId}`);

// submit poll feedback  <-- ADD THIS
export const submitPollFeedback = (pollId, data) =>
  api.post(`/polls/${pollId}/feedback`, data);

// Officer – Polls
export const getOfficerPolls = (filters = {}) =>
  api.get('/officer/polls', { params: filters });

export const officerUpdatePollStatus = (id, status) =>
  api.patch(`/officer/polls/${id}/status`, { status });

// Officer Dashboard
export const getOfficerDashboard = () => api.get('/officer/dashboard');

// Unified Reports (auto-detects user role)
export const getReports = (filters = {}) =>
  api.get('/reports', { params: filters });

// Citizen Dashboard
export const getCitizenDashboard = () => api.get('/citizen/dashboard');

export default api;
