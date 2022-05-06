import { createTheme } from '@material-ui/core/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#3e498c',
        },
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                html: {
                    WebkitFontSmoothing: 'auto',
                    height: '100%',
                },
                body: {
                    height: '100%',
                },
                '#root': {
                    height: '100%',
                },
            },
        },
    },
});
