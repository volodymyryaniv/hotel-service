import { Box, Typography, Button, Grid } from '@mui/material';
import React, { useState } from 'react';
import 'firebase/auth';
import { useUser, useAuth } from 'reactfire';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import clearFirestoreCache from '../../../common/clearFirestoreCache';
import { UIContext } from '../UIContext/index';
import useStyles from './styles';

const settings = ['Logout'];

const AppBarComponent: React.FC = () => {
  const styles = useStyles();
  const { setAlert } = React.useContext(UIContext);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const name = useUser().data.displayName;
  const auth = useAuth();

  const setAvatar = (value?: string | null) => {
    let letters = 'U';
    if (value) {
      const firstLetters = value.match(/\b(\w)/g);
      if (firstLetters) {
        letters = firstLetters.slice(0, 2).join('');
      }
    }
    return letters;
  };

  const avatarLetters = setAvatar(name);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogOut = React.useCallback(async () => {
    try {
      await auth.signOut();
      clearFirestoreCache();
    } catch ({ message }) {
      setAlert({
        show: true,
        severity: 'error',
        message: `${message}`,
      });
    }
  }, [setAlert, auth]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      className={styles.wrapper}
    >
      <AppBar position="static">
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={false}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              />
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button color="secondary" sx={{ my: 2, display: 'block' }}>
                Scan-hotel
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                  <Avatar sx={{ bgcolor: 'secondary.light' }}>
                    {avatarLetters}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleLogOut}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Grid>
  );
};

export default AppBarComponent;
