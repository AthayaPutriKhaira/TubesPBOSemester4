import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide, faMotorcycle, faSquareParking, faCar, faUser, faTriangleExclamation, faCircleInfo, faLock, faEyeSlash, faEye, faLockOpen, faHand } from '@fortawesome/free-solid-svg-icons';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  React.useEffect(() => {
    if (isLoggedIn) navigate('/', { replace: true });
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Username dan password harus diisi');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/login', { username: username.trim(), password });
      const userData = res.data.data;
      login({
        id: userData.id,
        username: userData.username,
        role: userData.role,
        nama: userData.nama,
      });
      navigate('/', { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login gagal. Periksa koneksi server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-300/30 to-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-orange-200/20 to-yellow-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-orange-100/10 to-orange-200/10 rounded-full blur-3xl"></div>
        {/* Floating parking icons */}
        <div className="absolute top-20 left-20 text-4xl opacity-10 animate-bounce" style={{ animationDuration: '3s' }}><FontAwesomeIcon icon={faCarSide} /></div>
        <div className="absolute top-40 right-32 text-3xl opacity-10 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}><FontAwesomeIcon icon={faMotorcycle} /></div>
        <div className="absolute bottom-32 left-40 text-5xl opacity-10 animate-bounce" style={{ animationDuration: '5s', animationDelay: '0.5s' }}><FontAwesomeIcon icon={faSquareParking} /></div>
        <div className="absolute bottom-20 right-20 text-3xl opacity-10 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '2s' }}><FontAwesomeIcon icon={faCar} /></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-lg shadow-orange-500/30 mb-4 transform hover:scale-105 transition-transform">
            <span className="text-white font-extrabold text-3xl">P</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Smart<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Parking</span>
          </h1>
          <p className="text-gray-500 mt-2 text-sm">Sistem Manajemen Parkir Cerdas</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-orange-500/10 border border-orange-100/50 overflow-hidden">
          {/* Header gradient bar */}
          <div className="h-1.5 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"></div>

          <div className="p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-1">Selamat Datang <FontAwesomeIcon icon={faHand} /></h2>
            <p className="text-sm text-gray-500 mb-6">Masuk untuk mengakses sistem parkir</p>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-5 border border-red-200 text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                <span><FontAwesomeIcon icon={faTriangleExclamation} /></span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FontAwesomeIcon icon={faUser} /> Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan username"
                    className="w-full px-4 py-3 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100 outline-none transition-all text-gray-800 placeholder-gray-400"
                    autoComplete="username"
                    autoFocus
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FontAwesomeIcon icon={faLock} /> Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    className="w-full px-4 py-3 pr-12 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100 outline-none transition-all text-gray-800 placeholder-gray-400"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors p-1"
                  >
                    {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <span className="animate-spin inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></span>
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <span><FontAwesomeIcon icon={faLockOpen} /></span>
                    <span>Masuk ke Sistem</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer info */}
          <div className="bg-orange-50/50 border-t border-orange-100/50 px-8 py-4">
            <div className="flex items-start gap-2 text-xs text-orange-700/70">
              <span className="mt-0.5"><FontAwesomeIcon icon={faCircleInfo} /></span>
              <span>Hubungi administrator jika mengalami masalah login atau lupa password.</span>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <p className="text-center text-xs text-gray-400 mt-6">
          © 2026 SmartParking System • v2.0
        </p>
      </div>
    </div>
  );
};

export default Login;
