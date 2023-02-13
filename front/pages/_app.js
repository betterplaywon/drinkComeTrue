import '../styles/globals.css';
import '../styles/userSign.module.css';
import '../styles/homeCompAnimation.module.css';
import '../styles/drinkTestMain.module.css';
import '../styles/drinkTestQna.module.css';
import '../styles/drinkTestResult.module.css';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';
import wrapper from '../store/configureStore';

function DrinkComeTrue({ Component }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>DrinkComeTrue</title>
      </Head>

      <Component />
    </>
  );
}

DrinkComeTrue.prototypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(DrinkComeTrue);
