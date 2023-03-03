import { Link } from "react-router-dom";
import { AppBar, Button, Grid, Toolbar, Container } from "@mui/material";
import { useTranslation } from 'react-i18next';

/**
 * This function is used to create the header of whole website and it is used in App.js
 * @returns Header of the website
 */
function Header() {
  const { t, i18n } = useTranslation();
  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Button component={Link} to="/" variant="text" color="inherit">{t ('Posts')}</Button>

          {/*
          Container if used to make the buttons stay in the same place
          The "fi" and "en" buttons are used to change the language of the page 
          */}
          <Container maxWidth="xs">
          <Button id="fi" variant="text" color="inherit" sx={{position: "relative"}} onClick={() =>{
            i18n.changeLanguage('fi');
          }}>FI</Button>

          <Button id="en" variant="text" color="inherit" sx={{position: "relative"}} onClick={() =>{
            i18n.changeLanguage('en');
          }}>EN</Button>
          </Container>

          <Button component={Link} to="/login" variant="text" color="inherit" sx={{position: "relative"}}>{t ('Login')}</Button>

          </Grid>

        </Toolbar>
      </AppBar>
    </header>
  );
}

export default Header;