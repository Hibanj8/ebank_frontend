import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleChangePassword = () => {
    navigate("/changer-mot-de-passe");
  };

  return (
    <header className="bg-white shadow-md">
      <div className="w-full px-20 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#FF7800]">Ebank</h1>

        <div className="flex gap-12">
          <button
            onClick={handleChangePassword}
            className="text-base font-medium text-gray-700 hover:font-bold hover:underline"
          >
            Changer mot de passe
          </button>
          <button
            onClick={handleLogout}
            className="text-[#FF7800] border-2 border-[#FF7800] hover:text-white hover:bg-[#FF7800] py-2 px-4 rounded-lg  font-medium mr-8  whitespace-nowrap"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </header>
  );
}
