const API_URL = 'http://localhost:5000';

const getToken = () => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    console.warn('JWT token not found in localStorage');
  }
  return token;
};

const getRole = () => {
  const role = localStorage.getItem('userRole');
  if (!role) {
    console.error('Role not found in localStorage');
    throw new Error('Role not found in localStorage');
  }
  return role;
};

const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  try {
    const token = getToken();
    const role = getRole();
    headers['Authorization'] = `Bearer ${token}`;
    headers['Role'] = role;
    return headers;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const getVacations = async () => {
  const response = await fetch(`${API_URL}/vacations`, {
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch vacations');
  }
  return await response.json();
};

export const createVacation = async (vacationData) => {
  const response = await fetch(`${API_URL}/vacations`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(vacationData),
  });
  if (!response.ok) {
    throw new Error('Failed to create vacation');
  }
  return await response.json();
};

export const updateVacation = async (vacationId, vacationData) => {
  const response = await fetch(`${API_URL}/vacations/${vacationId}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(vacationData),
  });
  if (!response.ok) {
    throw new Error('Failed to update vacation');
  }
  return await response.json();
};

export const deleteVacation = async (vacationId) => {
  const response = await fetch(`${API_URL}/vacations/${vacationId}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to delete vacation');
  }
  return await response.json();
};
