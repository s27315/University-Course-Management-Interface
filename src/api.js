const BASE_URL = 'https://student-management-system-backend.up.railway.app';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export const login = (email, password) =>
  fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then((r) => r.json());

export const getCourses = () =>
  fetch(`${BASE_URL}/api/courses`, { headers: getHeaders() }).then((r) => r.json());

export const getCourseById = (id) =>
  fetch(`${BASE_URL}/api/courses/${id}`, { headers: getHeaders() }).then((r) => r.json());

export const createCourse = (data) =>
  fetch(`${BASE_URL}/api/courses`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const updateCourse = (id, data) =>
  fetch(`${BASE_URL}/api/courses/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const deleteCourse = (id) =>
  fetch(`${BASE_URL}/api/courses/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  }).then((r) => (r.status === 204 ? {} : r.json()));
