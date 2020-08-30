import { createMuiTheme } from '@material-ui/core/styles'

// Inject this object inside the default theme to customize it.
// https://material-ui.com/customization/theming/#createmuitheme-options-args-theme
export const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#0095f6',
      blue: '#0095f6',
      greyDark: '#8e8e8e',
      grey: '#c7c7c7',
      greyLight: '#dbdbdb',
      black: '#262626',
      red: '#ed4956',
      radialGradient:
        'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)',
    },
  },
  typography: {
    body1: {
      fontFamily:
        "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
    },
    caption: {
      fontFamily:
        "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
      fontSize: '.85rem',
    },
    smallCaps: {
      fontSize: '.7rem',
      lineHeight: '1.66',
      letterSpacing: '0.03333em',
      textTransform: 'uppercase',
      fontWeight: 200,
    },
  },
  borders: ['1px solid #dbdbdb'],
  displays: {
    flexCenter: {
      display: 'flex',
      justifyContent: 'center',
    },
    flexColumn: {
      display: 'flex',
      flexDirection: 'column',
    },
    flexAlignCenter: {
      display: 'flex',
      alignItems: 'center',
    },
    flexWrap: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  },
  spaces: {
    horizontal: {
      xs: {
        paddingLeft: 4,
        paddingRight: 4,
      },
      sm: {
        paddingLeft: 8,
        paddingRight: 8,
      },
      md: {
        paddingLeft: 16,
        paddingRight: 16,
      },
      lg: {
        paddingLeft: 32,
        paddingRight: 32,
      },
      xl: {
        paddingLeft: 48,
        paddingRight: 48,
      },
    },
    vertical: {
      xs: {
        marginTop: 4,
        marginBottom: 4,
      },
      sm: {
        marginTop: 8,
        marginBottom: 8,
      },
      md: {
        marginTop: 16,
        marginBottom: 16,
      },
      lg: {
        marginTop: 32,
        marginBottom: 32,
      },
      xl: {
        marginTop: 48,
        marginBottom: 48,
      },
    },
  },

  wrappers: {
    w1280: {
      maxWidth: 1280,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    w11366: {
      maxWidth: 1366,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    w1480: {
      maxWidth: 1440,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
})
