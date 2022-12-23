import React, { useState } from "react";
import {Box, Chip, MenuItem, Select, FormControl} from "@mui/material";
import "./FilterPanel.css";
// import {StyledSlider} from "./CSSComponents.js";
import { styled } from '@mui/material/styles';
import ImportExportIcon from '@mui/icons-material/ImportExport';

//local storage functionality
function getFiltersFromLocalStorage() {
    let filter = JSON.parse(localStorage.getItem("filters"));
    if(filter !== null){
    return filter;
    }
    else return null;
  }
let filters = getFiltersFromLocalStorage() !== null ? getFiltersFromLocalStorage() : {sortBy:"releaseDate",ageRating:'Anyone',genres:['All']};
const persistSortOption = (eventValue) => {
    filters["sortBy"] = eventValue;
    localStorage.setItem("filters",JSON.stringify(filters));
}
const persistAgeRating = (value) => {
    filters["ageRating"] =value;
    localStorage.setItem("filters",JSON.stringify(filters));
}
const persistGenre = (value) => {
    filters["genres"] = value;
    localStorage.setItem("filters",JSON.stringify(filters));
}

const FilterPanel = ({handleSort, handleContentRating, handleGenres}) =>{
    const StyledChip = styled(Chip)(({ variant}) => ({
        backgroundColor:"#202020",
        color: "#FFFFFF",
        //   '& .MuiSlider-thumb': {
            [`&:hover`]: {
                backgroundColor:"#FFFFFF",
                color: "#586069",
            },
            [`&:active`]: {
                backgroundColor:"#FFFFFF",
                color: "#586069",
            },
            ...(variant === "selected" && {
                backgroundColor:"#FFFFFF",
                color: "#586069",
            })
        //   }, 
      }));

const genreData = [
    { key: 'All', label: 'All Genre' },
    { key: 'Education', label: 'Education' },
    { key: 'Sports', label: 'Sports' },
    { key: 'Movies', label: 'Movies'},
    { key: 'Comedy', label: 'Comedy' },
    { key: 'Lifestyle', label: 'Lifestyle' },];

const ageData = [
        { key: 'Anyone', label: 'Any age group' },
        { key: '7+', label: '7+' },
        { key: '12+', label: '12+' },
        { key: '16+', label: '16+' },
        { key: '18+', label: '18+' },];

const getGenreFromLocalStorage = () =>{
            let lsFilters = JSON.parse(localStorage.getItem("filters"));
            if(lsFilters !== null)
                return lsFilters["genres"];
            else//first time
                return ['All'];
        }
const [selectedGenre, setGenreData] = useState(getGenreFromLocalStorage());

const getAgeFromLocalStorage = () =>{
    let lsFilters = JSON.parse(localStorage.getItem("filters"));
    if(lsFilters !== null)
        return lsFilters["ageRating"];
    else//first time
        return "Anyone";
}
const [selectedAge, setAgeData] = useState(getAgeFromLocalStorage());
// const [sort, setSorting] = useState('releaseDate');
// let [sortLocalStorage,getSortLS] = useState(localStorage.getItem("filters"));
const getSortFromLocalStorage = () =>{
    let lsFilters = JSON.parse(localStorage.getItem("filters"));
    if(lsFilters !== null)
        return lsFilters["sortBy"];
    else//first time
        return "releaseDate";
    }
const [sort, setSorting] = useState(getSortFromLocalStorage());


const handleGenreSelection = (value) =>{

   let alreadySelected = selectedGenre.find(genre => genre === value);

   if(selectedGenre[0] === 'All'){
    persistGenre([]);
    setGenreData(selectedGenre.pop());
   }
    if(!alreadySelected){
        if(value === 'All'){
            persistGenre([value]);
            setGenreData(['All']);  
        }
        else{
            persistGenre([
                ...selectedGenre,value
            ]);
            setGenreData([
                ...selectedGenre,value
            ]);
        } 
    }
    else{
        let selectedFilters = [...selectedGenre].filter(genre => genre !== alreadySelected);

        if(selectedFilters.length === 0){
            persistGenre(['All']);
            setGenreData(['All']);     
        }
        else{
            persistGenre([...selectedFilters]);
            setGenreData([...selectedFilters]);  
        }
        
    }
    handleGenres();
}
const handleAgeSelection = (value) =>{
    persistAgeRating(value);
    setAgeData(value);
    handleContentRating();
}
const handleSortChange = (event) => {
    persistSortOption(event.target.value);
    setSorting(event.target.value);
    handleSort();
};
  
    return (
        <div>
            <Box className="panel">
                <Box>
                <Box className="genre">
                    { genreData.map((genre) =>(
                        <StyledChip clickable label={genre.label}
                        key={genre.key}
                        onClick={async() => handleGenreSelection(genre.key)}
                        variant={selectedGenre.find(g => g === genre.key) ? "selected" : "default"}
                        />
                    ))}
                </Box>
                <Box className="age">
                    { ageData.map((age) =>(
                        <StyledChip clickable label={age.label}
                        value={selectedAge}
                        key={age.key}
                        onClick={async() => handleAgeSelection(age.key)}
                        variant={(selectedAge===age.key) ? "selected" : "default"}/>
                    ))}
                </Box>
                </Box>
                <Box className="sort">
                <FormControl sx={{ m: 1, minWidth: 120}} className="sortForm">
                <Select
                className="sortOptions"
                value={sort}
                onChange={handleSortChange}
                displayEmpty
                variant="standard"
                disableUnderline={true} 
                dir="rtl"
                IconComponent={() => (
                    <ImportExportIcon className="updownIcon"/>
                  )}
                >
          <MenuItem className="li" value="releaseDate">Release Date</MenuItem>
          <MenuItem className="li" value="viewCount">View Count</MenuItem>
        </Select></FormControl>
                </Box>
            </Box>
        </div>
    );
}

export default FilterPanel;