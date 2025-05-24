import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../../context/authSlice';
import { useAuth } from '../../hooks/auth';
import { useUser } from '../../hooks/user';
import { showError } from '../../utils/messageRender';
import localStorage from '../../constants/localStorage';
import { t } from '../../helpers/i18n';

export default function Authenticate(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const { authenticateWithCode } = useAuth();
  const { fetchUserByToken } = useUser();

  useEffect(() => {
    const authCodeRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(authCodeRegex);

    if (isMatch) {
      const authCode = isMatch[1];

      const authenticate = async () => {
        const tokenResponse = await authenticateWithCode(authCode);

        if (!tokenResponse) {
          showError('Authentication failed: No token response');
          return;
        }

        window.localStorage.setItem(
          localStorage.TOKEN,
          tokenResponse.accessToken
        );

        const user = await fetchUserByToken();

        if (!user) {
          showError('Failed to fetch user data');
          return;
        }

        dispatch(
          loginAction({
            userInfo: user,
            accessToken: tokenResponse.accessToken,
            refreshAccessToken: tokenResponse.refreshToken,
          })
        );

        setIsLoggedin(true);
      };

      authenticate();
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (isLoggedin) {
      navigate('/');
    }
  }, [isLoggedin, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress />
      <Typography>{t('lbl.authenticating')}</Typography>
    </Box>
  );
}
