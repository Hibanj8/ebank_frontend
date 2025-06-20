import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateClient() {
    const [modalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        dateAnniversaire: "",
        numeroIdentite: "",
        adresse: "",
        email: "",
        telephone: ""
    });

    const navigate = useNavigate();

    const commonInputClass =
        "w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#7474BF] px-8 py-4 font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            console.log("📦 Token lu depuis localStorage :", token);
            await axios.post("http://localhost:9090/client/ajouter", formData, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });
            setModalVisible(true);
            setTimeout(() => {
                setModalVisible(false);
                navigate("/agent/dashboard");
            }, 2000);
        } catch (err) {
            console.log("err.response?.data:", err.response?.data);
            alert(err.response?.data || "Erreur lors de la création du client");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center items-center p-14 relative">
            {modalVisible && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50">
                    ✅ Client créé avec succès !
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl space-y-5"
            >
                <div className="text-4xl text-gray-600 cursor-pointer" onClick={() => navigate("/agent/dashboard")}>
                    ←
                </div>
                <h2 className="text-2xl font-semibold text-center text-gray-700">
                    Créer un client
                </h2>

                <input
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    type="text"
                    placeholder="Nom"
                    required
                    className={commonInputClass}
                />
                <input
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    type="text"
                    placeholder="Prénom"
                    required
                    className={commonInputClass}
                />
                <input
                    name="dateAnniversaire"
                    value={formData.dateAnniversaire}
                    onChange={handleChange}
                    type="date"
                    required
                    className={commonInputClass}
                />
                <input
                    name="numeroIdentite"
                    value={formData.numeroIdentite}
                    onChange={handleChange}
                    type="text"
                    placeholder="Numéro d'identité"
                    required
                    className={commonInputClass}
                />
                <input
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleChange}
                    type="text"
                    placeholder="Adresse postale"
                    required
                    className={commonInputClass}
                />
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Email"
                    required
                    className={commonInputClass}
                />
                <input
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    type="text"
                    placeholder="Téléphone"
                    className={commonInputClass}
                />

                <button
                    type="submit"
                    className="block w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white py-3 rounded-xl font-semibold text-center"
                >
                    Créer le client
                </button>
            </form>
        </div>
    );
}
