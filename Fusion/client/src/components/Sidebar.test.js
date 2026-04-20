import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from './Sidebar';
import { GoogleOAuthProvider } from '@react-oauth/google';

const mockToggleSidebar = jest.fn();
const mockOnLogout = jest.fn();
const mockOnSelectHistory = jest.fn();

const defaultProps = {
  user: null,
  history: [],
  onLogout: mockOnLogout,
  onLoginSuccess: jest.fn(),
  onLoginError: jest.fn(),
  onSelectHistory: mockOnSelectHistory,
  isOpen: true,
  toggleSidebar: mockToggleSidebar,
};

test('renders Sidebar with login message when no user', () => {
  render(
    <GoogleOAuthProvider clientId="mock-id">
      <Sidebar {...defaultProps} />
    </GoogleOAuthProvider>
  );
  expect(screen.getByText(/Log in to save history/i)).toBeInTheDocument();
  expect(screen.getByText(/Google Login Mock/i)).toBeInTheDocument();
});

test('renders Sidebar with user info when user is provided', () => {
  const user = { name: 'Test User', picture: 'test.jpg' };
  render(
    <GoogleOAuthProvider clientId="mock-id">
      <Sidebar {...defaultProps} user={user} />
    </GoogleOAuthProvider>
  );
  expect(screen.getByText('Test User')).toBeInTheDocument();
  expect(screen.getByText(/Logout/i)).toBeInTheDocument();
});

test('renders Sidebar with history items', () => {
  const history = [
    { id: 1, prompt: 'Test Prompt 1', createdAt: new Date().toISOString() },
  ];
  render(
    <GoogleOAuthProvider clientId="mock-id">
      <Sidebar {...defaultProps} history={history} />
    </GoogleOAuthProvider>
  );
  expect(screen.getByText('Test Prompt 1')).toBeInTheDocument();
});

test('calls toggleSidebar when toggle button is clicked', () => {
  render(
    <GoogleOAuthProvider clientId="mock-id">
      <Sidebar {...defaultProps} />
    </GoogleOAuthProvider>
  );
  const toggleBtn = screen.getByText('◀');
  fireEvent.click(toggleBtn);
  expect(mockToggleSidebar).toHaveBeenCalled();
});
