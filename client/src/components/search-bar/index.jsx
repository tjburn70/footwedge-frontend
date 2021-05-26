import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useDebounce } from '../../hooks/use-debounce';
import { useSearch } from '../../data/hooks/use-search';

const SearchBar = ({ label, index, processHits, handleSelect }) => {
    const [searchText, setSearchText] = useState("");
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = useState([]);
    const debouncedSearchText = useDebounce(searchText, 200);
    const { data: searchResults, isLoading } = useSearch(index, debouncedSearchText);
    const searchHits = searchResults ? searchResults.hits : null;

    useEffect(() => {
        if (searchHits) {
            const hits = processHits(searchHits);
            setOptions(hits);
        }
    }, [searchHits, processHits]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete 
            id="search-bar"
            style={{ width: 300 }}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            onInputChange={e => setSearchText(e.target.value)}
            onChange={handleSelect}
            filterOptions={(options) => options}
            getOptionLabel={(option) => option.golf_course_name}
            getOptionSelected={(option, value) => option.name === value.name}
            groupBy={(option) => option.golf_club_name}
            options={options}
            loading={isLoading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                        <React.Fragment>
                            {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                        </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );

}

export { SearchBar };
