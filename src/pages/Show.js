import React from 'react'
import { useParams } from 'react-router-dom'
import Cast from '../components/shows/Cast';
import Details from '../components/shows/Details';
import Seasons from '../components/shows/Seasons';
import { InfoBlock, ShowPageWrapper } from '../components/shows/Show.styled';
import ShowMainData from '../components/shows/ShowMainData';
import {useShow} from '../misc/custom.hooks'




const Show = () => {

    const {id} = useParams();

    const {show,isLoading,error} = useShow(id);


    if(isLoading){
        return <div>Data is being loaded</div>
    }

    if(error){
        return <div>Error occurred : (error)</div>
    }

    return (
        <ShowPageWrapper>
            <ShowMainData image={show.image} name={show.name} rating ={show.rating} summary={show.summary} tags={show.genres}/>

            <InfoBlock>
                <h2>
                    Details
                </h2>
                <div>
                    <Details status={show.status} network={show.network} premierred={show.premierred}/>
                </div>
            </InfoBlock>

            <InfoBlock>
                <h2>
                    Seasons
                </h2>
                <div>
                    <Seasons seasons = {show._embedded.seasons}/>
                </div>
            </InfoBlock>

            <InfoBlock>
                <h2>
                    Cast
                </h2>
                <div>
                    <Cast cast={show._embedded.cast}/>
                </div>
            </InfoBlock>

        </ShowPageWrapper>




    );
}

export default Show;