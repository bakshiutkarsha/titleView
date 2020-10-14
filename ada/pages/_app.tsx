import * as React from "react";
import { default as App } from "next/app";

import { Provider } from "react-redux";
import { Store } from "redux";
import store from "@redux/Store";

import withRedux from 'next-redux-wrapper';

interface IProps extends React.Props<{}> {
  isMobileFromSSR: boolean;
  store: Store;
}

class GlobalApp extends App<IProps, {}, {}> {
  constructor(props) {
    super(props);
  }

  // public static async getInitialProps() {
  //   return {
  //     pageProps: {}
  //   };
  // }

  public render(): JSX.Element {
    const { Component, pageProps, store } = this.props;

    return (
      <>
        <Provider store={store}>
          <Component {...pageProps} />
      </Provider>
      </>
    );
  }
}

export default withRedux(store)(GlobalApp);