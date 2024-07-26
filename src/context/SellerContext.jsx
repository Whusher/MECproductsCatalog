import { useContext, createContext, useMemo, useReducer, useEffect } from "react";
import { AuthService } from "../components/Endpoints";

const SellContext = createContext();

export const useBrands = () => useContext(SellContext);

export default function SellerContext({ children }) {
  const [state, dispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case "CHANGE":
        return {
          ...prevState,
          currentBrand: action.newBrand,
        };
      case "CHARGE":
        return {
          ...prevState,
          availableBrands: action.brands,
        };
      default:
        return prevState;
    }
  }, {
    currentBrand: null,
    availableBrands: [], // Asegúrate de que el valor inicial es un array vacío
  });

  const sellingContext = useMemo(() => ({
    state,
    getBrands: async () => state.availableBrands,
    changeBrand: async (newBrand) => {
      dispatch({
        type: 'CHANGE',
        newBrand: newBrand,
      });
    },
  }), [state]);

  useEffect(() => {
    const getBrandsAPI = async () => {
      try {
        const response = await fetch(`${AuthService}/getBrands`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          dispatch({
            type: 'CHARGE',
            brands: data || [], // Asegúrate de que siempre sea un array
          });
        }
      } catch (e) {
        console.log(e);
      }
    };
    getBrandsAPI();
  }, []);

  return (
    <SellContext.Provider value={sellingContext}>
      {children}
    </SellContext.Provider>
  );
}
