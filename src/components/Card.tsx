import axios from "axios";
import {useState} from "react";
import {colorNameToLighterRGBA, lightOrDark} from "../utils/ColorCodeGenerator.ts";
import {Link} from "react-router-dom";

const Card = ({data}: any) => {

    const base_url_small: any = process.env.BASE_URL_SMALL;
    const poke_info_url: any = process.env.INFO_URL;
    const [pokeInfo, setPokeInfo] = useState<any>();
    const backgroundColor: any = colorNameToLighterRGBA(pokeInfo?.colour, 0.3);
    const convertTo3DigitString = (num: number): string => {
        let numStr: string = num?.toString();
        while (numStr.length < 3) {
            numStr = '0' + numStr;
        }
        return numStr;
    }
    const capitalize = (str: string): string => {
        return str?.charAt(0).toUpperCase() + str?.slice(1);
    }
    const onImageLoad = async (id: number) => {
        await axios.get(poke_info_url + id).then((response) => {
            setPokeInfo(response.data);
        });
    }
    return (
        <>
            {
                <div>
                    <Link to={`/pokemon/${data?.id}`}>
                        <div className='card-image-container m-8  rounded-2xl' style={{
                            backgroundColor: backgroundColor,
                            borderColor: backgroundColor, border: 'thin'
                        }}>
                            <img
                                className="p-3"
                                src={base_url_small + convertTo3DigitString(data?.id) + '.png'}
                                width={200} height={200} alt={'card img'}
                                onLoad={() => onImageLoad(data?.id)}
                            />

                        </div>
                    </Link>
                    <div className="flex flex-row justify-between m-8">
                        <div>
                            <div
                                className="text-theme-colour-text-light text-lg font-bold">n {convertTo3DigitString(data.id)}</div>
                            <div
                                className="text-theme-colour-text-dark text-2xl font-bold">{capitalize(pokeInfo?.name)}</div>
                        </div>
                        <div>
                            {pokeInfo?.types?.map((type: any) => (
                                <div className="rounded-md font-bold p-1 px-3 mb-1" style={{ backgroundColor: `${type?.color}`,
                                    borderColor: `${type?.color}`, border: 'thin',
                                    color: lightOrDark(type?.color) == 'light' ? 'black' : 'white'
                                }}>
                                    {capitalize(type?.name)}
                                </div>
                            )) }
                        </div>
                    </div>
                </div>

            }
        </>
    );
};

export default Card;