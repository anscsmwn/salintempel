import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import Login from './pages/Login';
import { AuthContextProvider } from './context/authContext';
function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
