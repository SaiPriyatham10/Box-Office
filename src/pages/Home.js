import React, {useState} from 'react'
import ActorGrid from '../components/actor/ActorGrid';
import ShowGrid from '../components/shows/ShowGrid';
import MainPageLayout from '../components/MainPageLayout';

import {apiGet} from '../misc/config'
import { useLastQuery } from '../misc/custom.hooks';
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from './Home.styled';
import CustomRadio from '../components/CustomRadio';

const Home = () => {

    const [input,SetInput] = useLastQuery();
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
            <SearchInput type="text" placeholder="Search for something" onKeyDown={onKeyDown} onChange={onInputChange} value={input}/>
            
            <RadioInputsWrapper>
                <div>

                <CustomRadio
                    label="Shows"
                    id="shows-search" 
                    type="text" 
                    value="shows" 
                    checked={isShowSearch} 
                    onChange={onRadioChange}
                />
                </div>
                <div>

                <CustomRadio
                    label="Actors"
                    id="actors-search" 
                    type="text" 
                    value="people" 
                    checked={!isShowSearch} 
                    onChange={onRadioChange}
                />
                </div>
                
            </RadioInputsWrapper>

            <SearchButtonWrapper>

            <button type="button" onClick={onSearch}>
                Search
            </button>
            </SearchButtonWrapper>
            {renderResults()}
        </MainPageLayout>
    );
}

export default Home;