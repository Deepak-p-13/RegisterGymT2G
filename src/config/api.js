// API Configuration
export const API_BASE_URL = 'http://localhost:8081';

export const API_ENDPOINTS = {
  SUBSCRIPTIONS: `${API_BASE_URL}/api/members/subscriptions`,
  SUBSCRIPTION_BY_ID: (id) => `${API_BASE_URL}/api/members/subscriptions/${id}`,
  GYM_REGISTER: `${API_BASE_URL}/api/gyms/register`,
};

