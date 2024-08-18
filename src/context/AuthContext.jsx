import React, { createContext, useReducer, useMemo } from "react";
import { AuthService } from "../components/Endpoints";

const AuthContext = createContext();

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "SIGN_IN":
          return {
            ...prevState,
            userToken: action.token,
            isSignOut: false,
            nameUser: action.name,
            emailUser: action.email,
            rol: action.rol,
            whatsapp: action.whatsapp
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            userToken: null,
            emailUser: null,
            isSignOut: true,
            whatsapp: null,
            rol: null,
          };
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        default:
          return prevState;
      }
    },
    {
      userToken: null,
      nameUser: null,
      emailUser: null,
      rol: null,
      whatsapp: null,
      isSignOut: false,
      isLoading: true,
    }
  );

  const authContext = useMemo(
    () => ({
      state,
      signIn: async (loginData) => {
        try {
          // Hacer la petición a la API
          const response = await fetch(`${AuthService}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: loginData.email,
              password: loginData.password,
            }),
          });
          if (response.ok) {
            const data = await response.json();
            // Almacenamos datos del token en localStorage
            localStorage.setItem("userToken", data.token);
            localStorage.setItem("userName", data.name);
            localStorage.setItem("userEmail", data.email);
            localStorage.setItem("rol", data.rol);
            localStorage.setItem("whatsapp",data.whatsapp)
            // Despachamos el estado cuando se cumpla el inicio de sesión según la API
            dispatch({
              type: "SIGN_IN",
              token: data.token,
              email: data.email,
              name: data.name,
              rol: data.rol,
              whatsapp: data.whatsapp
            });
            //return true;
            return data;
            
          } else {
            // const errorData = await response.json();
            // console.error("Error:", errorData.message);
            return false;
          }
        } catch (error) {
          console.error("Fetch error:", error);
          return false;
        }
      },
      signOut: async () => {
        // Logica para el cierre de sesion
        localStorage.removeItem("userToken");
        localStorage.removeItem("userName");
        localStorage.removeItem("whatsapp");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("rol")
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data) => {  //WE NEED TO CHECK THIS TO BE COMPATIBLE
        const capitalizeFirstLetter = (string) => {
          if (!string) return "";
          return string.charAt(0).toUpperCase() + string.slice(1);
        };
        try {
          const response = await fetch(`${AuthService}/signup`, {
            method: "POST", // POST ya que se hace la creación de un elemento
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: data.email,
              password: data.password,
              telefono: parseInt(data.phone),
              nombre: capitalizeFirstLetter(data.name),
            }),
          });
          if (response.ok) {
            const responseData = await response.json();
            // Almacenamos el token en localStorage
            localStorage.setItem("userToken", responseData.token);
            localStorage.setItem("userName", responseData.name);
            localStorage.setItem("userEmail", data.email);
            localStorage.setItem("rol",data.rol)
            dispatch({ // REQUIERE SETEO CON DATOS PROPORCIONADOS POR LA API
              type: "SIGN_IN",
              token: responseData.token,
              email: data.email,
              name: responseData.name,
              rol: responseData.rol
            });
            return true;
          } else {
            return false;
          }
        } catch (err) {
          return false;
        }
      },
    }),
    [state]
  );

  // Get a previous session
  React.useEffect(() => {
    const restoreToken = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const name = localStorage.getItem("userName");
        const email = localStorage.getItem("userEmail");
        const rol = localStorage.getItem('rol');
        const whatsapp = localStorage.getItem('whatsapp')
        if (token) {
          // Update the state with restored token
          dispatch({
            type: "RESTORE_TOKEN",
            token: token,
          });
          dispatch({
            type: "SIGN_IN",
            token: token,
            name: name,
            email: email,
            rol: rol,
            whatsapp: whatsapp
          });
        } else {
          throw new Error("Token not found");
        }
      } catch (error) {
        return null;
      }
    };

    restoreToken();
  }, []);

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
