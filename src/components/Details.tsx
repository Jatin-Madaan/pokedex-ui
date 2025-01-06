import {useParams} from "react-router-dom";
import backIcon from "../assets/images/back.svg";
import {Link} from "react-router-dom";
import {colorNameToLighterRGBA, lightOrDark} from "../utils/ColorCodeGenerator.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import loaderIcon from "../assets/images/pokeloader.png";
import DetailsTabView from "./DetailsTabView.tsx";


const Details = () => {
    const {id} = useParams();
    const base_url_large: any = process.env.BASE_URL_LARGE;
    const base_url_small: any = process.env.BASE_URL_SMALL;
    const poke_info_url: any = process.env.INFO_URL;
    const get_evolution_url: any = process.env.EVOLUTION_URL;
    const [pokeInfo, setPokeInfo] = useState<any>();
    const [pokeId, setPokeId] = useState<number>(0);
    const backgroundColor: any = colorNameToLighterRGBA(pokeInfo?.colour, 0.3);
    const capitalize = (str: string): string => {
        return str?.charAt(0).toUpperCase() + str?.slice(1);
    }
    const [formsData, setFormsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const onImageLoad = async (id: string) => {
        id = id.toString();
        await axios.get(poke_info_url + id).then((response) => {
            setPokeInfo(response.data);
            setPokeId(response.data.id);
        }, (error: any) => {
            setLoading(false);
            setError(error.message);
            console.log(error.message);
        });

        await axios.get(get_evolution_url + id).then((response) => {
            const out : any = [];
            if(response?.data && response?.data.length > 0) {
                response.data.forEach((element: any) => {
                    out.push({
                        ...element,
                        url: base_url_small + convertTo3DigitString(element.id) + ".png"
                    });
                })
            }

            setFormsData(out);
        }, (error: any) => {
            setLoading(false);
            setError(error.message);
            console.log(error.message);
        });

        setLoading(false);

    }
    useEffect(() => {
        if(id)
            onImageLoad(id);
    }, [id])
    const convertTo3DigitString = (num: string): string => {
        let numStr: string = num?.toString().toLowerCase();
        while (numStr.length < 3) {
            numStr = '0' + numStr;
        }
        return numStr;
    }
    return (
        <>
            <Link to="/">
                <button className="back-button">
                    <img src={backIcon} height={40} width={40} alt={"Back"} style={{filter: 'invert(70%)'}}/>
                </button>
            </Link>
            <div className=" bg-theme-colour-gray border-2 rounded-3xl border-theme-colour-dark" style={{
                width: "80vw",
                marginTop: "5vh",
                marginBottom: "5vh",
                marginLeft: "5vw",
                marginRight: "5vw"
            }}>
                {
                    loading ? (
                        <div className="loader" key={"loader"}>
                            <div className="mb-6">
                                <img className="loading" src={loaderIcon} height={40} width={40} alt={"Loading..."}/>
                            </div>
                            <div className="text-xl font-medium  text-theme-colour-text-light">
                                Loading...
                            </div>
                        </div>
                    ) : (
                        error  ? (
                            <div className="text-theme-colour-text-dark font-bold text-3xl h-52 text-center flex flex-col justify-center items-center" > 404 Not Found </div>
                        ): (
                            <div className="flex flex-row justify-between">
                                <div className="w-1/2">
                                    <div className="flex flex-row justify-between m-8">
                                        <div className="w-1/2">
                                            <div
                                                className="text-theme-colour-text-light text-3xl mb-5 font-bold">n {convertTo3DigitString(pokeId.toString())}</div>
                                            <div
                                                className="text-theme-colour-text-dark text-5xl font-bold">{capitalize(pokeInfo?.name)}</div>
                                        </div>
                                        <div className="w-1/3">
                                            {pokeInfo?.types?.map((type: any) => (
                                                <div className="rounded-sm font-bold p-1 text-center px-3 text-2xl mb-1"
                                                     style={{
                                                         backgroundColor: `${type?.color}`,
                                                         borderColor: `${type?.color}`, border: 'thin',
                                                         color: lightOrDark(type?.color) == 'light' ? 'black' : 'white'
                                                     }} key={type?.name}>
                                                    {capitalize(type?.name)}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className='card-image-container m-8  rounded-2xl' style={{
                                        backgroundColor: backgroundColor,
                                        borderColor: backgroundColor, border: 'thin',
                                        display: 'flex',
                                        flexDirection: "row",
                                        justifyContent: 'center'
                                    }}>
                                        <img
                                            className="p-3"
                                            src={base_url_large + convertTo3DigitString(pokeId.toString()) + '.png'}
                                            width={400} height={400} alt={'card img'}
                                        />

                                    </div>
                                </div>
                                <div className="w-1/2">
                                    <DetailsTabView formsData={formsData} capitalize={capitalize} id={pokeId} />
                                </div>
                            </div>
                        )
                    )
                }

            </div>
        </>
    );
};


export default Details;