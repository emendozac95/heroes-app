import React, { useMemo } from 'react'
import queryString from 'query-string';

import { useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { heroes } from '../data/heroes'
import { HeroCard } from '../heroes/HeroCard';
import { getHeroesByName } from '../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {

    const location = useLocation();

    const { q = ''} =  queryString.parse( location.search);

    const [ values , handleInputChange] = useForm({ findHero: q});

    const { findHero } = values;

    const heroesFiltered = useMemo(() => getHeroesByName( q ), [q])
    // const heroesFiltered = getHeroesByName( findHero );

    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${findHero}`);
        console.log(findHero);
    }

    return (
        <div>
            <h1>Search Screen</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr />

                    <form onSubmit={ handleSearch }>
                        <input
                            name="findHero"
                            type="search"
                            placeholder="Find your hero"
                            className="form-control"
                            value={ findHero }
                            onChange={ handleInputChange }
                        />

                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search...
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4> Results </h4>
                    <hr />

                    {
                        heroesFiltered.map(
                            hero => (
                                <HeroCard
                                    key={hero.id}
                                    {...hero}
                                />
                            )
                        )
                    }

                </div>
            </div>
        </div>
    )
}
