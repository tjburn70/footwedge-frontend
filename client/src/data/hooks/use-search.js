import { useQuery } from 'react-query'; 

import { searchApi } from '../search-api-config';

const searchIndexByName = async (index, searchText) => {
    const path = `/${index}?q=${searchText.toLowerCase()}&query_type=wildcard&field=name`
    const { data } = await searchApi.get(path);
    return data;
}

const useSearch = (index, searchText) => {
    return useQuery(
        ['search', index, searchText],
        async () => searchIndexByName(index, searchText),
        { enabled: !!searchText }
    );
}

export { useSearch};