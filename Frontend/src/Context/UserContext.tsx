import React, { createContext, useState, useEffect, Children } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext({});

const UserProvider = ({ Children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false); // New State To Track Loading

  useEffect(() => {
    if (user) return;

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data);
      } catch (error) {
        console.error("User Not Authenticated", error);
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const updateUser = (userData: any) => {
    setUser(userData);
    localStorage.setItem("token", userData.token); // Save Token
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {Children}
    </UserContext.Provider>
  );
};

export default UserProvider;
