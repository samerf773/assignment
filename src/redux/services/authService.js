// services/authService.js

import { users } from "../../data/users";

  export const authenticate = (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          resolve(user);
        } else {
          reject(new Error('Invalid username or password'));
        }
      }, 1000); 
    });
  };
  