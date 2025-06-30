import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Login  as LoginForm} from "../../Redux/Slices/Common/commonSlice"
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {login}  = useSelector((state)=>state.common);
//   console.log(login);
  

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = () => {
    let data = {
        email,
        password
    }
    dispatch(LoginForm(data)).then((res)=>{
        if(res.payload){
            const {validUser} = res.payload;

          setTimeout(() => {
            if(validUser.role == "cook"){
                 navigate("/cook")
            }else if(validUser.role == "admin"){
                navigate("/admin")
            }else{
                navigate("/owner")
            }
          }, 1000);
        }
    })
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-500 to-pink-600">
        <div className="absolute inset-0 bg-gradient-to-tl from-yellow-400 via-orange-500 to-red-600 opacity-70"></div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white bg-opacity-10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-yellow-300 bg-opacity-20 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-orange-400 bg-opacity-15 rounded-full blur-2xl animate-ping"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-red-400 bg-opacity-20 rounded-full blur-xl animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <header className={`mb-12 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative">
            <h1 className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-200 bg-clip-text text-transparent drop-shadow-2xl">
                RESTO
              </span>
              <br />
              <span className="text-white drop-shadow-2xl">
                MANAGER
              </span>
            </h1>
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-30 blur-xl rounded-full"></div>
          </div>
          <p className="text-xl text-white/90 mt-6 font-medium tracking-wide drop-shadow-lg">
            ✨ Revolutionary Restaurant Management Experience ✨
          </p>
          <div className="flex justify-center mt-4 space-x-8 text-white/80">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Orders</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Tables</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Staff</span>
            </div>
          </div>
        </header>

        <button
          onClick={() => setShowLogin(true)}
          className={`group relative px-12 py-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          style={{ transitionDelay: '0.5s' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center space-x-2">
            <span>🚀 Launch Dashboard</span>
          </div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 transition-all duration-700"></div>
        </button>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl w-full max-w-md shadow-2xl relative transform animate-in fade-in zoom-in duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-red-50 to-pink-100 rounded-3xl opacity-50"></div>
            
            <div className="relative">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Welcome Back!</h2>
              <p className="text-gray-600 text-center mb-8">Enter your credentials to continue</p>
              
              <div className="space-y-6">
                <div className="relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                
                <div className="relative group">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                
                <button
                  onClick={handleSubmit}
                  className="w-full group relative py-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center space-x-2">
                    <span>🔐 Sign In</span>
                  </div>
                </button>
              </div>
              
              <div className="mt-6 text-center">
                <a href="#" className="text-orange-600 hover:text-orange-700 font-medium transition-colors">
                  Forgot your password?
                </a>
              </div>
            </div>
            
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <span className="text-xl">×</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;