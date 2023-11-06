import { useState } from "react";
import { createContext } from "react";

const GlobalContext = createContext()


const GlobalProvider = ({ children }) => {
    const [reload, setReload] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    return (
        <GlobalContext.Provider value={{
            reload,
            setReload,
            isLoading,
            setIsLoading
        }}>
            { children }
        </GlobalContext.Provider>
    )
}

export { GlobalContext, GlobalProvider }