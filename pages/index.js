import React from 'react';
import StockInfo from '../components/stockinfo/StockInfo';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';//applied Tmon font

//applied Tmon font
const theme = createMuiTheme({
  typography: {
    fontFamily: 'TmonMonsori',
  },
});

export default function Index() {
  return (
    <MuiThemeProvider theme={theme}> {/*applied Tmon font*/}
      <StockInfo />
    </MuiThemeProvider>
  );
}
