import '@testing-library/jest-dom';

jest.mock('react-markdown', () => {
  return function MockMarkdown({ children }) {
    return <div>{children}</div>;
  };
});

jest.mock('@react-oauth/google', () => ({
  GoogleOAuthProvider: ({ children }) => <div>{children}</div>,
  GoogleLogin: () => <div>Google Login Mock</div>,
}));
