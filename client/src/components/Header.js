import { Link } from "react-router-dom";
import { AppBar, Button, Toolbar } from "@mui/material";
import { useTranslation } from 'react-i18next';

function Header() {
  const { t, i18n } = useTranslation();
  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <Button component={Link} to="/" variant="text" color="inherit">{t ('Home')}</Button>
          <Button component={Link} to="/about" variant="text" color="inherit">{t ('About')}</Button>
          
          <Button id="fi" variant="text" color="inherit" sx={{position: "relative", left:"80px"}} onClick={() =>{
            i18n.changeLanguage('fi');
          }}>FI</Button>

          <Button id="en" variant="text" color="inherit" sx={{position: "relative", left:"80px"}} onClick={() =>{
            i18n.changeLanguage('en');
          }}>EN</Button>

          <Button component={Link} to="/login" variant="text" color="inherit" sx={{position: "relative", left:"160px"}}>{t ('Login')}</Button>

        </Toolbar>
      </AppBar>
    </header>
  );
}

export default Header;