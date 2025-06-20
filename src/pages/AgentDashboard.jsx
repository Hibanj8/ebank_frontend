import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AgentDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if (!token || role !== "AGENT_GUICHET") {
            navigate("/");
        }
    }, []);

    return (
        <div className="bg-[#F7F7F7] text-gray-800">
            <Header />

            <section className="bg-[#FF7800] text-white py-20 px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Bienvenue sur votre espace Agent eBank</h2>
                <p className="max-w-xl mx-auto text-lg">
                    Gérez les clients et leurs comptes rapidement et facilement depuis votre tableau de bord.
                </p>
            </section>

             <section className="py-12 px-4 container mx-auto flex-1">
                <h3 className="text-2xl font-bold text-center mb-8">Fonctionnalités</h3>
                <div className="flex flex-wrap justify-center gap-6">
                    <div
                        onClick={() => navigate("/create-client")}
                        className="bg-white p-6 rounded-lg shadow hover:shadow-md transition cursor-pointer w-full max-w-sm"
                    >
                        <h4 className="text-xl font-semibold mb-2">Ajouter un client</h4>
                        <p>Créez un nouveau profil client et envoyez automatiquement ses identifiants par email.</p>
                    </div>

                    <div
                        onClick={() => navigate("/create-compte")}
                        className="bg-white p-6 rounded-lg shadow hover:shadow-md transition cursor-pointer w-full max-w-sm"
                    >
                        <h4 className="text-xl font-semibold mb-2">Créer un compte</h4>
                        <p>Générez un nouveau compte bancaire pour un client existant avec un RIB unique.</p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
