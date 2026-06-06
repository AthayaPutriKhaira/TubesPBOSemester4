import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ParkingIn from './pages/ParkingIn';
import ParkingOut from './pages/ParkingOut';
import History from './pages/History';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/masuk" element={<ParkingIn />} />
        <Route path="/keluar" element={<ParkingOut />} />
        <Route path="/riwayat" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
