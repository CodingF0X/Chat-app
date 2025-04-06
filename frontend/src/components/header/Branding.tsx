import DraftsIcon from '@mui/icons-material/Drafts';
import { Typography } from '@mui/material';
import Routes from '../Routes';
import { authenticatedVar } from '../../constants/authenticated';
const Branding = () => {
  const isAuthenticated = authenticatedVar();
  const handleClick = () => {
    if (isAuthenticated) {
      Routes.navigate('/');
    } else {
      Routes.navigate('/login');
    }
  }
  return (
    <>
      <DraftsIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        onClick={()=> handleClick()}
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Foxie
      </Typography>
    </>
  );
};

export default Branding;
