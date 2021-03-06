import { createMuiTheme } from '@material-ui/core/styles'
import WebFont from 'webfontloader'

WebFont.load({
  google: {
    families: ['Lobster Two:ital,400', 'cursive'],
  },
})

// Inject this object inside the default theme to customize it.
// https://material-ui.com/customization/theming/#createmuitheme-options-args-theme
export const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#0095f6',
      blue: '#0095f6',
      blueDark: '#00376b',
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
      fontSize: '.73rem',
      lineHeight: '1.66',
      letterSpacing: '0.03333em',
      textTransform: 'uppercase',
      fontWeight: 200,
    },
    logo: {
      fontFamily: '"Lobster Two", cursive',
      fontSize: 28,
      fontStyle: 'italic',
      letterSpacing: '.0124rem',
    },
  },
  borders: ['1px solid #dbdbdb', '1px solid #262626'],
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
    hideOnMobile: {
      '@media (max-width: 760px)': {
        display: 'none',
      },
    },
    showOnMobile: {
      '@media (min-width: 760px)': {
        display: 'none',
      },
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
    w975: {
      maxWidth: 975,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
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
  widgets: {
    buttons: {
      primary: {
        border: '1px solid transparent',
        color: '#ffffff',
        backgroundColor: '#0095f6',
        outline: 0,
        '&:hover': {
          backgroundColor: '#0095f6',
        },
      },
    },
    inputs: {
      primary: {
        border: '1px solid #dbdbdb',
        '&:focus': {
          border: '1px solid #c7c7c7',
        },
        borderRadius: 3,
      },
    },
    popover: {
      menu: {
        boxShadow: '0 0 5px 1px rgba(0,0,0,.0975)',
        borderRadius: 6,
        backgroundColor: '#ffffff',
        width: 230,
        '& ul': { padding: 0 },
        '& li': { padding: '8px 16px' },
        '& li:last-of-type': { borderTop: '1px solid #dbdbdb' },
        '& a': {
          color: 'inherit',
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          '& svg': { marginRight: 8 },
        },
      },
    },
    title: {
      fontFamily: '"Lobster Two", cursive',
      fontSize: 23,
      fontStyle: 'italic',
      letterSpacing: '.0124rem',
      marginBottom: 16,
      paddingBottom: 8,
      backgroundImage: 'linear-gradient(to right,#8e8e8e,#8e8e8e)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom left',
      backgroundSize: '40px 4px',
      textAlign: 'left',
    },
  },
})
