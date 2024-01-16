import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { push } from "next/router";
import { default as api } from "@/utils/api";
import { useSnackbar } from "notistack";
import { toast } from 'react-toastify';


const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const { enqueueSnackbar  } = useSnackbar();
  const [user, setUser] = useState();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "@nextauth.token": token } = parseCookies();

    if (token) {
      api
        .get("/auth/me")
        .then((response) => {
          const { id, username, email } = response.data;

          setUser({
            id,
            username,
            email,
          });
        })
        .catch(() => {
          signOut();
        });
    } else {
      push("/login");
    }
  }, []);

  const signIn = async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);

      const { token } = response.data;

      setCookie(undefined, "@nextauth.token", token, {
        maxAge: 60 * 60 * 2,
        path: "/post",
      });

      setUser({
        username: credentials.username,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      toast.success("Login efetuado com sucesso")

      push("/post");
    } catch (err) {
      console.log("Erro ao acessar", err);
      toast.error("Erro ao acessar sua conta, verifique as credenciais")
    }
  };

  const signUp = async (credentials) => {
    try {
      console.log(credentials);
      const response = await api.post('/auth/register', credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      toast.success("Registro efetuado com sucesso")
      push("/login");
    } catch (err) {
      console.log("Erro ao cadastrar ", err);
    }
  };

  const signOut = () => {
    try {
      destroyCookie(undefined, "@nextauth.token");
      localStorage.removeItem("@nextauth.token");
      sessionStorage.removeItem("@nextauth.token");
      push("/login");
  
      setUser(null);  
      toast.success("Deslogado com sucesso")
    } catch (error) {
      console.log("Erro ao deslogar");
      toast.error("Erro ao deslogar")
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );

  
};

export { AuthContext, AuthProvider };
