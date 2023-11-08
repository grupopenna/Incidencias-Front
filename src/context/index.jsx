import { useState } from "react";
import { createContext } from "react";

const GlobalContext = createContext()


const GlobalProvider = ({ children }) => {
    const [reload, setReload] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [modalShow, setModalShow] = useState(false)


    return (
        <GlobalContext.Provider value={{
            reload,
            setReload,
            isLoading,
            setIsLoading,
            modalShow,
            setModalShow
        }}>
            { children }
        </GlobalContext.Provider>
    )
}

export { GlobalContext, GlobalProvider }