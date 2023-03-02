import { Link } from "react-router-dom";
import { AppBar, Button, Toolbar } from "@mui/material";
import { useTranslation } from 'react-i18next';

function Header() {
  const { t, i18n } = useTranslation();
  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <Button variant="contained"><Link to="/">{t ('Home')}</Link></Button>
          <Button variant="contained"><Link to="/about">{t ('About')}</Link></Button>
          
          <Button id="fi" variant="contained" onClick={() =>{
            i18n.changeLanguage('fi');
          }}>fi</Button>

          <Button id="en" variant="contained" onClick={() =>{
            i18n.changeLanguage('en');
          }}>en</Button>

        </Toolbar>
      </AppBar>
    </header>
  );
}

export default Header;