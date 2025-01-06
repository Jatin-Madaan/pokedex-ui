import searchButtonImg from '../assets/images/searchclick.svg';
import searchIcon from '../assets/images/search.svg';
import React, {useState} from "react";
import { Link } from "react-router-dom";

const HomeHeader = () => {
    const [ pokemonName, setPokemonName ] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPokemonName(e.target.value);
    }

    return (
        <div className="home-header">
            <div className="text-theme-colour-text-dark text-5xl font-bold text-center mb-7">Pokédex</div>
            <div className="text-theme-colour-text-light text-2xl font-medium text-center mb-5">Search for a Pokémon by
                its name or its National Pokédex Number
            </div>

            <div className="flex flex-row justify-center">
                <div style={style.searchBar}>
                    <img src={searchIcon} width={28} height={28} style={style.searchIcon}/>
                    <input type="text" placeholder="Name or number" className="search-input" value={pokemonName} onChange={handleChange} style={style.searchInput}/>
                </div>
                <Link className="search-button" style={style.searchButton} to={`/pokemon/${pokemonName}`}>
                    <button>
                        <img style={style.searchButtonImg} src={searchButtonImg} alt="Filter"/>
                    </button>
                </Link>
            </div>
        </div>
    );
};
const style = {
    searchBar: {
        display: 'flex',
        marginRight: 15,
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
        width: '100%',
        maxWidth: '38vw',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
    },
    searchInput: {
        display: 'flex',
        border: 'none',
        outline: 'none',
        fontSize: '16px',
        color: '#555',
        background: 'transparent',
        padding: '5px 10px'
    },
    searchButton: {
        backgroundColor: '#665d9e',
        border: 'none',
        borderRadius: '8px',
        width: '70px',
        padding: '10px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchButtonImg: {
        width: '16px',
        height: '16px',
        filter: 'invert(100%)'
    },
    searchIcon: {
        cursor: 'pointer',
        filter: 'invert(50%)',
    }

}
export default HomeHeader;