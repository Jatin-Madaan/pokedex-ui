import logo from '../assets/images/pokeball.png';
import pokemonText from '../assets/images/pokemonlogo.png';

const Navbar = () => {
    return (
        <div className='flex flex-col justify-between bg-theme-colour-dark shadow-lg shadow-theme-colour-light'>
            <div className='p-2 px-28 flex  items-center'>
                <div className="mr-5"><img src={logo} width={60} height={60} alt={'logo'}/></div>
                <div><img src={pokemonText} width={150} height={30} alt={'logo'}/> </div>
            </div>
        </div>
    );
};

export default Navbar;