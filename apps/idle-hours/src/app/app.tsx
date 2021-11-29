import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';
import { IdleHoursCalendar, theme } from '@idlehours/idle-hours-scheduler';
import { RecoilRoot } from 'recoil';
import { AppBar, Theme, ThemeProvider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { createStyles } from '@material-ui/styles';
import { CssBaseline, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // app: { background: '#323337' },
    app: {},
    appBar: {},
    title: {
      color: '#FFFFFF',
    },
  })
);

export function App() {
  const styles = useStyles(theme);
  return (
    <div className={styles.app}>
      <RecoilRoot>
        <CssBaseline>
          <ThemeProvider theme={theme}>
            <AppBar position="absolute" className={styles.appBar}>
              <Box padding={3}>
                <Typography variant="h3" className={styles.title}>
                  Idle Hours
                </Typography>
              </Box>
            </AppBar>
            <Box marginTop={15}>
              <IdleHoursCalendar />
            </Box>
          </ThemeProvider>
        </CssBaseline>
      </RecoilRoot>
    </div>
  );
}

export default App;
