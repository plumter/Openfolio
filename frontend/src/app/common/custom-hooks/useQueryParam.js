import { useMemo } from "react";
import { useLocation } from "react-router-dom";


const useQueryParam = key => {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search).get(key), [search, key]);
}

export default useQueryParam;