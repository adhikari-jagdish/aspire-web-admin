import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthRepository from '../repository/auth_repository';
import LoginView from '../view/login_view';


const AuthController = () => {
  const [username, setUsername] = useState('aspirationasia@gmail.com');
  const [password, setPassword] = useState('9ZOP35hcRhh!=WuJc9');
  const [error, setError] = useState('');
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { token, user } = await AuthRepository.login(username, password);
      console.log(user);
      AuthRepository.saveToken(token);
      AuthRepository.saveUser(user); // Save user
      
      // Navigate to dashboard on success
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <LoginView
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      error={error}
      onSubmit={handleSubmit}
    />
  );
    

}

export default AuthController;