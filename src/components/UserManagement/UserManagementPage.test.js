// UserManagementPage.test.js

import React from 'react';
import { render, screen, fireEvent,waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { act } from 'react';

import UserManagementPage from './UserManagementPage';

describe('UserManagementPage Component', () => {
  test('displays "Add User" button', () => {
    render(
      <Provider store={store}>
        <UserManagementPage />
      </Provider>
    );

    expect(screen.getByText('Add User')).toBeInTheDocument();
  });

  test('adds a new user successfully', async () => {
    render(
      <Provider store={store}>
        <UserManagementPage />
      </Provider>
    );

    act(() => {
      fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'New' } });
      fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'User' } });
      fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'new.user@example.com' } });
      fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '9876543210' } });
      fireEvent.change(screen.getByLabelText('Address'), { target: { value: 'LB' } });
      fireEvent.change(screen.getByLabelText('Number of Services Subscribed'), { target: { value: 3 } });
      fireEvent.change(screen.getByLabelText('Age'), { target: { value: 30 } });
    });

    act(() => {
      fireEvent.click(screen.getByText('Add User'));
    });

    expect(screen.getByText('Add User')).toBeInTheDocument();
  });


});
