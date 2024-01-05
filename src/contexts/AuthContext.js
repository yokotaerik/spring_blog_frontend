const { createContext, useEffect, useState } = require("react");
const { destroyCookie, setCookie, parseCookies } = require("nookies");
const Router = require("next/router");
const { toast } = require("react-toastify");
const { default: api } = require("@/utils/api");

const AuthContext = createContext({});

const signOut = () => {
  try {
    destroyCookie(null, "@nextauth.token");
    localStorage.removeItem("@nextauth.token");
    sessionStorage.removeItem("@nextauth.token");
    Router.push("/login");
  } catch (error) {
    console.log("Erro ao deslogar", error);
  }
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "@nextauth.token": token } = parseCookies();

    if (token == null || token == "") {
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
          Router.push("/login");
        });
    } else {
      Router.push("/login");
    }
  }, []);

  const signIn = async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);

      const { token } = response.data;

      setCookie(undefined, "@nextauth.token", token, {
        maxAge: 60 * 60 * 2,
        path: "/",
      });

      setUser({
        username: credentials.username,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      toast.success("Logado com sucesso");

      Router.push("/post");
    } catch (err) {
      toast.error("Erro ao acessar");
      console.log("Erro ao acessar", err);
    }
  };

  const signUp = async (credentials) => {
    try {
      console.log(credentials);
      const response = await api.post("/auth/register", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Cadastrado com sucesso");

      Router.push("/post");
    } catch (err) {
      toast.error("Erro ao cadastrar");
      console.log("Erro ao cadastrar ", err);
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

module.exports = { AuthContext, AuthProvider, signOut };
