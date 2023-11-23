import { useDispatch, useSelector } from "react-redux";
import { getIssue, getTransitions } from '../redux/actions'
import { useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../context";


export const useIncidents = () => {
    const { setIsLoading, reload, setReload } = useContext(GlobalContext)
    const dispatch = useDispatch()
    const incidents = useSelector(state => state.incients)
    const { jiraAccountId } = useSelector((state) => state.user)


    useEffect(() => {

        if (typeof window !== 'undefined') {

            (async () => {
                const key = window.location.pathname.split('/').slice(-1)
                setIsLoading(true)
                await getIssue(key[0], jiraAccountId)(dispatch).then(async res => {
                    res.length < 1 ? [] : await getTransitions(res?.issues[0].key)(dispatch)
                })
                setIsLoading(false)
                setReload(false)
            })()

        }

    }, [reload])

    return {
        incidents
    }
}