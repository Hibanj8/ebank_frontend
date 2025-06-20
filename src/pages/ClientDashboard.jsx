import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function ClientDashboard() {
    const navigate = useNavigate();
    const [comptes, setComptes] = useState([]);
    const [selectedNumero, setSelectedNumero] = useState("");
    const [solde, setSolde] = useState(0);
    const [operations, setOperations] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if (!token || role !== "CLIENT") {
            navigate("/");
        } else {
            fetchComptes();
        }
    }, []);

    const fetchComptes = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:9090/dashboard/comptes", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
            setComptes(res.data);
            if (res.data.length > 0) {
                const firstCompte = res.data[0];
                setSelectedNumero(firstCompte);
                fetchDashboardInfo(firstCompte);
            }
        } catch (err) {
            alert("Erreur lors du chargement des comptes.");
            console.error(err);
        }
    };

    const fetchDashboardInfo = async (numeroCompte) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(
                `http://localhost:9090/dashboard/infos?numeroCompte=${numeroCompte}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );
            setSolde(res.data.solde);
            setOperations(res.data.operations);
        } catch (err) {
            alert("Erreur lors du chargement du tableau de bord.");
            console.error(err);
        }
    };

    const handleCompteChange = (e) => {
        const numero = e.target.value;
        setSelectedNumero(numero);
        setCurrentPage(0);
        fetchDashboardInfo(numero);
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16).replace("T", " ");
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-100 p-10">
                <div className="bg-white rounded-xl shadow p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Tableau de bord client</h1>

                    {comptes.length > 0 ? (
                        <>
                            <div className="mb-4">
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Sélectionner un compte :
                                </label>
                                <select
                                    className="w-full p-3 border rounded-lg"
                                    onChange={handleCompteChange}
                                    value={selectedNumero}
                                >
                                    {comptes.map((compte) => (
                                        <option key={compte} value={compte}>
                                            {compte}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <p className="text-gray-600">
                                    <strong>RIB :</strong> {selectedNumero}
                                </p>
                                <p className="text-gray-600">
                                    <strong>Solde :</strong> {solde} MAD
                                </p>
                            </div>

                            <div className="mt-6">
                                <h2 className="text-lg font-semibold mb-2">10 dernières opérations</h2>
                                {operations.length === 0 ? (
                                    <p className="text-gray-500">Aucune opération disponible.</p>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full table-auto text-sm text-left">
                                            <thead className="bg-gray-200 text-gray-600">
                                                <tr>
                                                    <th className="p-3">Date</th>
                                                    <th className="p-3">Type</th>
                                                    <th className="p-3">Intitulé</th>
                                                    <th className="p-3">Montant</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {operations.map((op, index) => (
                                                    <tr key={index} className="border-t">
                                                        <td className="p-3">{formatDate(op.date)}</td>
                                                        <td className="p-3">{op.type}</td>
                                                        <td className="p-3">{op.intitule}</td>
                                                        <td className="p-3">{op.montant} MAD</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8">
                                <button
                                    onClick={() => navigate("/virement")}
                                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-lg shadow"
                                >
                                    Nouveau virement
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="text-red-500">Aucun compte bancaire trouvé.</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
