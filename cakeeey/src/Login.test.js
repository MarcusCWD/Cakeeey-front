import { fireEvent, render, screen } from '@testing-library/react';
import Login from './pages/Login';
import Profile from './pages/Profile';
import {BrowserRouter as Router} from 'react-router-dom';
import userEvent from "@testing-library/user-event";
// Imported Context
import UserToken from "./pages/UserToken.js";

// email placeholder text test
test('email should render', () => {
    render(
    <Router>
        <Login />
    </Router>
    
    );
    const userElement = screen.getByPlaceholderText(/email/i);
    expect(userElement).toBeInTheDocument();
  });

  // password placeholder text test
  test('password should render', () => {
    render(
    <Router>
        <Login />
    </Router>
    
    );
    const passElement = screen.getByPlaceholderText(/password/i);
    expect(passElement).toBeInTheDocument();
  });

  // button exist test
  test('button should render', () => {
    render(
    <Router>
        <Login />
    </Router>
    
    );
    const buttonElement = screen.getByTestId('login-button')
    expect(buttonElement).toBeInTheDocument();
  });
  

// email value should be empty upon initalisation
test('email should be empty', () => {
    render(
    <Router>
        <Login />
    </Router>
    
    );
    const userElement = screen.getByPlaceholderText(/email/i);
    expect(userElement.value).toBe("");
  });

// password value should be empty upon initalisation
test('password should be empty', () => {
    render(
    <Router>
        <Login />
    </Router>
    
    );
    const userElement = screen.getByPlaceholderText(/password/i);
    expect(userElement.value).toBe("");
  });

  // login error flash message should not be visible upon initalisation
  test('error message should not be visible', () => {
    render(
    <Router>
        <Login />
    </Router>
    
    );
    const errorElement = screen.queryByText(/Login Error/i)
    expect(errorElement).not.toBeInTheDocument();
  });

  // Test login formField email "test123"
test('email should render', () => {
  render(
  <Router>
      <Login />
  </Router>
  
  );
  const userElement = screen.getByPlaceholderText(/email/i);
  const testValue = "test123"

  fireEvent.change(userElement, {target: {value:testValue}})
  expect(userElement.value).toBe(testValue);
});

  // Test login formField email "pass123"
test('password should render', () => {
  render(
  <Router>
    <Login />
  </Router> 
  
  );
  const passElement = screen.getByPlaceholderText(/password/i);
  const testValue = "pass123"

  fireEvent.change(passElement, {target: {value:testValue}})
  expect(passElement.value).toBe(testValue);
});

  // Test login email and password
  test('navigate to profile route', () => {
    render(
      <Router>
      <UserToken>
        <Login />
        <Profile />
      </UserToken>
    </Router>
    
    );

    const buttonElement = screen.getByTestId('login-button')
    const userElement = screen.getByPlaceholderText(/email/i);
    const passElement = screen.getByPlaceholderText(/password/i);
    const testValue1 = "admintest@gmail.com"
    const testValue2 = "password"
  
    fireEvent.change(userElement, {target: {value:testValue1}})
    fireEvent.change(passElement, {target: {value:testValue2}})
    fireEvent.click(buttonElement);

    const navProfElement = screen.getByText(/default/i);
    expect(navProfElement).toBeInTheDocument(testValue1);

  });

