import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NouveauVirement() {
    const [modalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState({
        numeroSource: "",
        numeroDestination: "",
        montant: "",
        motif: ""
    });
    const [comptes, setComptes] = useState([]);
    const navigate = useNavigate();

    const commonInputClass =
        "w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#7474BF] px-8 py-4 font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white";

    useEffect(() => {
        const fetchComptes = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await axios.get("http://localhost:9090/dashboard/comptes", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setComptes(res.data);
                if (res.data.length > 0) {
                    setFormData((prev) => ({ ...prev, numeroSource: res.data[0] }));
                }
            } catch (err) {
                alert("Erreur lors du chargement des comptes");
            }
        };

        fetchComptes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:9090/virement/effectuer", formData, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });

            setModalVisible(true);

            setFormData({
                numeroSource: comptes[0] || "",
                numeroDestination: "",
                montant: "",
                motif: ""
            });

            setTimeout(() => {
                setModalVisible(false);
                navigate("/client/dashboard");
            }, 2000);
        } catch (err) {
            alert(err.response?.data || "Erreur lors du virement");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center items-center p-14 relative">
            {modalVisible && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50">
                    ✅ Virement effectué avec succès !
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl space-y-5"
            >
                <div className="text-4xl text-gray-600 cursor-pointer" onClick={() => navigate("/client/dashboard")}>
                    ←
                </div>


                <h2 className="text-2xl font-semibold text-center text-gray-700">
                    Nouveau Virement
                </h2>

                {comptes.length > 1 ? (
                    <select
                        name="numeroSource"
                        value={formData.numeroSource}
                        onChange={handleChange}
                        className={commonInputClass}
                    >
                        {comptes.map((rib, index) => (
                            <option key={index} value={rib}>
                                {rib}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        name="numeroSource"
                        value={formData.numeroSource}
                        readOnly
                        className={`${commonInputClass} bg-gray-200 cursor-not-allowed`}
                    />
                )}

                <input
                    name="numeroDestination"
                    value={formData.numeroDestination}
                    onChange={handleChange}
                    type="text"
                    placeholder="RIB du destinataire"
                    required
                    className={commonInputClass}
                />
                <input
                    name="montant"
                    value={formData.montant}
                    onChange={handleChange}
                    type="number"
                    placeholder="Montant en MAD"
                    required
                    className={commonInputClass}
                />
                <input
                    name="motif"
                    value={formData.motif}
                    onChange={handleChange}
                    type="text"
                    placeholder="Motif du virement"
                    className={commonInputClass}
                />

                <button
                    type="submit"
                    className="block w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white py-3 rounded-xl font-semibold text-center"
                >
                    Valider le virement
                </button>

            </form>
        </div>
    );
}
