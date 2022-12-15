import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import Login from './pages/Login';
import { AuthContextProvider } from './context/authContext';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
      <AuthContextProvider>
        <main className="mx-auto max-w-md bg-white min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </AuthContextProvider>
      <Toaster />
    </>
  );
}

export default App;
