import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateCompte() {
    const [formData, setFormData] = useState({
        rib: "",
        numeroIdentite: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();
    const commonInputClass = "w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#7474BF] px-8 py-4 font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white";

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post(" http://localhost:9090/compte/creer", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    withCredentials: true
                }
            });
            setModalVisible(true);
            setTimeout(() => {
                setModalVisible(false);
                navigate("/agent/dashboard");
            }, 2000);
        } catch (err) {
            alert(err.response?.data);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center items-center p-14">
            {modalVisible && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50">
                    ✅ Compte créé avec succès !
                </div>
            )}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl space-y-5"
            >
                 <div className="text-4xl text-gray-600 cursor-pointer" onClick={() => navigate("/agent/dashboard")}>
                    ←
                </div>
                <h2 className="text-2xl font-semibold text-center text-gray-700">
                    Créer un compte
                </h2>

                <input
                    name="rib"
                    value={formData.rib}
                    onChange={handleChange}
                    type="text"
                    placeholder="RIB (24 chiffres)"
                    required
                    className={commonInputClass}
                />

                <input
                    name="numeroIdentite"
                    value={formData.numeroIdentite}
                    onChange={handleChange}
                    type="text"
                    placeholder="Numéro d'identité du client"
                    required
                    className={commonInputClass}
                />

                <button
                    type="submit"
                    className="block w-full bg-gradient-to-r from-[#7474BF] to-[#348AC7] text-white py-3 rounded-xl font-semibold text-center"
                >
                    Créer le compte
                </button>
            </form>
        </div>
    );
}
