import logo from './logo.svg';
import './App.css';
import LoginPage from './Login';
import { useState } from 'react';
import ChatPage from './Chat';

function App() {
  const [pageNum, setPageNum] = useState(0);
  const [userName, setUserName] = useState("");

  const LoginDone = () => {
    setPageNum(1);
  }

  return (
    <div className = "WebPage">
      {pageNum == 0 && <LoginPage UserNameSetter = {setUserName} Info = "Login" LoggedIn = {LoginDone}/>}
      {pageNum == 1 && <ChatPage userName = {userName}/> }
    </div>
  );
}

export default App;
