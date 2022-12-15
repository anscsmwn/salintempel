import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import Login from './pages/Login';
import { AuthContextProvider } from './context/authContext';
import Register from './pages/Register';
function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
