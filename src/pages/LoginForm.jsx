import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

const LoginForm = () => {
    const [LoginData, setLoginData] = useState({
        login: "",
        password: "",
    });

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:9090/auth/login", LoginData);
            const { token, role, nom } = res.data;

            
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            localStorage.setItem("nom", nom);
            localStorage.setItem("token_expiration", Date.now() + 3600 * 1000);

            if (role === "CLIENT") {
                navigate("/client/dashboard");
            } else if (role === "AGENT_GUICHET") {
                navigate("/agent/dashboard");
            } else {
                alert("Unknown role");
            }
        } catch (error) {
            alert("Login or password incorrect");
            console.error("Login failed:", error);
        }
    };



    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center items-center p-4">
            <div className="w-full max-w-md bg-white shadow sm:rounded-lg p-6">
                <div className="flex flex-col items-center">
                    <h1 className="my-6 text-4xl font-bold bg-gradient-to-r from-[#FF7800] to-yellow-400 bg-clip-text text-transparent">
                        Ebank
                    </h1>
                    <div className="w-full flex-1 mt-8">
                        <div className="mx-auto max-w-xs">
                            
                            <input
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                type="login"
                                placeholder="login"
                                value={LoginData.login}
                                onChange={(e) => setLoginData({ ...LoginData, login: e.target.value })}
                            />

                            
                            <div className="relative mt-5">
                                <input
                                    className="w-full px-8 py-4 pr-12 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    value={LoginData.password}
                                    onChange={(e) => setLoginData({ ...LoginData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            <button onClick={handleLogin} className="mt-5 tracking-wide font-semibold bg-gradient-to-r from-orange-500 to-yellow-400 text-white w-full py-4 rounded-lg hover:opacity-90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                    />
                                </svg>
                                <span className="ml-3">Log In</span>
                            </button>


                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
