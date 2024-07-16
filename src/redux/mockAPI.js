import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios, { delayResponse: 500 }); // Simulate a small delay for more realistic behavior

let users = [
  { id: 1, firstName: 'Samer', lastName: 'Farhat', email: 'Samer@example.com', phone: '+1111111' },
  { id: 2, firstName: 'Samer', lastName: 'Farhat', email: 'Samer@example.com', phone: '+1111111' },
  { id: 3, firstName: 'Samer', lastName: 'Farhat', email: 'Samer@example.com', phone: '+1111111' },
];

// Mock GET request to fetch users
mock.onGet('/api/users').reply(200, { users });

// Mock POST request to add a user
mock.onPost('/api/users').reply((config) => {
  const newUser = JSON.parse(config.data);
  newUser.id = users.length + 1;
  users.push(newUser);
  return [200, newUser];
});

// Mock PUT request to edit a user
mock.onPut(/\/api\/users\/\d+/).reply((config) => {
  const userId = parseInt(config.url.split('/').pop(), 10);
  const updatedUser = JSON.parse(config.data);
  users = users.map(user => (user.id === userId ? { ...user, ...updatedUser } : user));
  return [200, updatedUser];
});

// Mock DELETE request to delete a user
mock.onDelete(/\/api\/users\/\d+/).reply((config) => {
  const userId = parseInt(config.url.split('/').pop(), 10);
  users = users.filter(user => user.id !== userId);
  return [200];
});

export default axios;
