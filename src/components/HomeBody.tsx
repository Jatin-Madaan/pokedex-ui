import axios from "axios";
import {useEffect, useState} from "react";
import Card from "./Card.tsx";
import Pagination from "./Pagination.tsx";
import loaderIcon from '../assets/images/pokeloader.png';

const HomeBody = () => {
    const [ cards, setCards ] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCards(0, 12).then(r => r);
    }, []);

    const loadCards = async (offset: number, limit: number) => {
        setLoading(true);
        await axios.get(`http://localhost:8080/v1/pokemon/limit/offset=${offset}&limit=${limit}`).then((response) => {
            setCards(response.data);
            setLoading(false);
        })
    }

    return (
        <>
            <div className=" bg-theme-colour-gray border-2 rounded-3xl border-theme-colour-dark" style={{
                width: "80vw",
                marginTop: "5vh",
                marginBottom: "5vh",
                marginLeft: "5vw",
                marginRight: "5vw"
            }}>
                <>
                    {loading ? (
                        <div className="loader" key={"loader"}>
                            <div className="mb-6">
                                <img className="loading" src={loaderIcon} height={40} width={40} alt={"Loading..."}/>
                            </div>
                            <div className="text-xl font-medium  text-theme-colour-text-light">
                                Loading...
                            </div>
                        </div>

                    ) : (
                        <div className="text-center mb-6" key={"card container"}>
                            <div className="flex flex-row flex-wrap" key={"card div"} style={{height: "100%"}}>
                                {
                                    cards?.map((card: any, index: number) => (
                                        <div key={index} style={{marginLeft: '5rem'}}>
                                            <Card data={card}/>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )}
                </>
            </div>
            <Pagination loadCards={loadCards} />
        </>
    );
};

export default HomeBody;