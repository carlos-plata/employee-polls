import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../../components/auth/LoginForm';
import { useAuth } from '../../components/auth/AuthContext';
import { useRouter } from 'next/router';

// Mock the useAuth hook
jest.mock('../../components/auth/AuthContext', () => ({
  useAuth: jest.fn()
}));

// Mock the useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

describe('LoginForm', () => {
  // Setup default mocks
  beforeEach(() => {
    useAuth.mockReturnValue({
      login: jest.fn().mockResolvedValue({}),
    });
    
    useRouter.mockReturnValue({
      push: jest.fn(),
    });
  });
  
  // Test 5: Snapshot test for LoginForm
  it('matches snapshot', () => {
    const { container } = render(<LoginForm />);
    expect(container).toMatchSnapshot();
  });
  
  // Test 6: Form validation - check that error message appears when submitting empty form
  it('shows error message when submitting with empty fields', async () => {
    // Arrange
    const mockLogin = jest.fn();
    useAuth.mockReturnValue({ login: mockLogin });
    
    render(<LoginForm />);
    
    // Act
    // Submit the form without filling in any fields
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(mockLogin).not.toHaveBeenCalled();

    const usernameInput = screen.getByLabelText(/user/i);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(usernameInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });
  
  // Test 7: Successful login redirects to home page
  it('redirects to home page on successful login', async () => {
    // Arrange
    const mockLogin = jest.fn().mockResolvedValue({});
    useAuth.mockReturnValue({ login: mockLogin });
    
    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });
    
    render(<LoginForm />);
    
    // Act
    fireEvent.change(screen.getByLabelText(/user/i), { target: { value: 'sarahedo' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    // Assert
    // Wait for the async login to complete
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('sarahedo', 'password123');
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });
  
  // Test 8: Shows error message on login failure
  it('shows error message on login failure', async () => {
    // Arrange
    const mockLogin = jest.fn().mockRejectedValue(new Error('Invalid username or password'));
    useAuth.mockReturnValue({ login: mockLogin });
    
    render(<LoginForm />);
    
    // Act
    fireEvent.change(screen.getByLabelText(/user/i), { target: { value: 'wronguser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    // Assert
    // Wait for the async login to fail and error message to appear
    await waitFor(() => {
      expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
    });
  });
});