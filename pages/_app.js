
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'next-auth/client';
import theme from '../themes/theme';
import { composeWrappers } from 'lib/composeWrappers';

const App = ({ Component, pageProps, apollo }) => {
  const Providers = composeWrappers([
    props => <ThemeProvider theme={theme}>{props.children}</ThemeProvider>,
    props => <Provider session={pageProps.session}>{props.children}</Provider>,
  ])

  return (
    <>
      <Head>
        <title>Juslang</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </>
  )
}

export default App;


App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
