import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({children}) =>{
    return (
        <Box className="header">
            <Link  to="/">
            <Box className="logo">
                <img src="/Logo.svg" alt="XFLIX"></img>
            </Box>
            </Link>
            {children}
        </Box>
    );
}

export default Header;