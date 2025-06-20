import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleUpdate = async () => {
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem("token");

            await axios.put(
                'http://localhost:9090/auth/change-password',
                {
                    oldPassword,
                    newPassword
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, withCredentials: true
                    }
                }
            );

            alert('Mot de passe mis à jour avec succès !');
            navigate('/');
        } catch (err) {
            alert(err.response?.data || 'Erreur lors de la mise à jour du mot de passe.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center items-center p-4">
            <div className="w-full max-w-md bg-white shadow sm:rounded-lg p-6">
                <div
                    className="text-4xl text-gray-600 cursor-pointer mb-4"
                    onClick={() => {
                        const role = localStorage.getItem("role");
                        if (role === "CLIENT") {
                            navigate("/client/dashboard");
                        } else if (role === "AGENT_GUICHET") {
                            navigate("/agent/dashboard");
                        } else {
                            navigate("/");
                        }
                    }}
                >
                    ←
                </div>
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl xl:text-3xl font-extrabold mb-6">Changer le mot de passe</h1>

                    <div className="w-full space-y-5">
                        <div className="relative">
                            <input
                                type={showOldPassword ? 'text' : 'password'}
                                placeholder="Ancien mot de passe"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="w-full px-8 py-4 pr-12 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                            >
                                {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <div className="relative">
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                placeholder="Nouveau mot de passe"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-8 py-4 pr-12 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <button
                            onClick={handleUpdate}
                            disabled={isSubmitting || !oldPassword || !newPassword}
                            className={`tracking-wide font-semibold bg-gradient-to-r from-orange-500 to-yellow-400 text-white w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ${!oldPassword || !newPassword || isSubmitting
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:opacity-90'
                                }`}
                        >
                            {isSubmitting ? 'Chargement...' : 'Mettre à jour'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePassword;
