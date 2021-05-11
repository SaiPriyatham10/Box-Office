import React, {useState} from 'react'
import ActorGrid from '../components/actor/ActorGrid';
import ShowGrid from '../components/shows/ShowGrid';
import MainPageLayout from '../components/MainPageLayout';

import {apiGet} from '../misc/config'

const Home = () => {

    const [input,SetInput] = useState('');
    const [result,UpdateResult] = useState(null);
    const [searchOptions, setSearchOptions] = useState('shows');

    const isShowSearch = searchOptions==='shows';

    const onInputChange = (env) =>{
        SetInput(env.target.value);
    }

    const onSearch = () => {
        apiGet(`/search/${searchOptions}?q=${input}`).then(result => {
            UpdateResult(result);
        });
    }

    const onKeyDown = (ev) => {
        if(ev.keyCode === 13 ){
            onSearch();
        }
    }

    const onRadioChange = (ev) =>{
        setSearchOptions(ev.target.value)
    }

    const renderResults = () =>{
        if(result && result.length ===0){
            return <div>No Result</div>
        }

        if(result && result.length>0){
            return result[0].show ? 
            (<ShowGrid data={result}/>)
            : (<ActorGrid data={result}/>);
        }

    }

    return(
        <MainPageLayout>
            <input type="text" placeholder="Search for something" onKeyDown={onKeyDown} onChange={onInputChange} value={input}/>
            
            <div>
                <label htmlFor ="shows-search">
                    Shows
                    <input id="shows-search" type="radio" value="shows" checked={isShowSearch} onChange={onRadioChange}/>
                </label>

                <label htmlFor="actors-search">
                    Actors
                    <input id="actors-search" type="radio" value="people" checked={!isShowSearch} onChange={onRadioChange}/>
                </label>
                
            </div>


            <button type="button" onClick={onSearch}>
                Search
            </button>
            {renderResults()}
        </MainPageLayout>
    );
}

export default Home;