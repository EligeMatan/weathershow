import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Погода</Link></li>
                <li><Link to="/forecast">Прогноз</Link></li>
                <li><Link to="/weathermap">Карта</Link></li>
                <li><Link to="/weather/Kharkiv">Погода у Харкові</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
