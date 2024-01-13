// components/Layout.js
import React, { useContext, useState } from "react";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthContext";
import { LogOut, User } from "react-feather"; // Ícones da biblioteca Feather
import CustomBlueButton from "./CustomBlueButton";
import api from "@/utils/api";

const Layout = ({ children }) => {
  const { isAuthenticated, signOut } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSignOut = () => {
    signOut();
  };

  const handleSearch = async () => {
    try {
      const response = await api.get(`/user/find/${searchTerm}`);
      setSearchResult(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white py-4 md:py-6 shadow-md">
        <div className="flex flex-col md:flex-row justify-around items-center">
          <Link href="/post">
            <h1 className="text-2xl md:text-3xl font-bold cursor-pointer hover:text-blue-500 transition duration-300">
              Yomaik
            </h1>
          </Link>

          {isAuthenticated && (
            <div>
              <input
                type="text"
                placeholder="Buscar usuários"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 text-blue-500"
              />
              <CustomBlueButton onClick={handleSearch}>
                {" "}
                Buscar{" "}
              </CustomBlueButton>
              <div />

              {searchResult.length > 0 ? (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-slate-800 p-3 max-w-xs w-full shadow-lg">
                    <ul className="list-none p-0">
                      {searchResult.map((user, index) => (
                        <li key={index} className="bg-slate-700 p-2 m-[1px] shadow-md flex">
                          <Link
                            href={`/user/${user}`}
                            onClick={() => setSearchResult([])}
                          >
                            <label className="text-white hover:underline">
                              {user}
                            </label>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="flex mt-2 justify-center">
                    <CustomBlueButton 
                      onClick={() => setSearchResult([])}
                    >
                      Fechar
                    </CustomBlueButton>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {isAuthenticated && (
            <nav className="flex gap-8 mt-4 md:mt-0">
              <Link href="/me">
                <button className="text-blue-500 hover:underline">
                  <User size={20} />
                </button>
              </Link>
              <button
                className="text-blue-500 hover:underline"
                onClick={handleSignOut}
              >
                <LogOut size={20} />
              </button>
            </nav>
          )}
        </div>
      </header>

      <main className="flex-grow container mx-auto flex flex-col items-center py-4 md:py-8">
        {children}
      </main>

      <footer className="bg-gray-800 text-white py-4 md:py-6 text-center border-t border-gray-700">
        <p className="text-sm">&copy; {new Date().getFullYear()} Meu Site</p>
      </footer>
    </div>
  );
};

export default Layout;
