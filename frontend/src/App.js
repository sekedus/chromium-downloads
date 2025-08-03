import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { osKeys, channelKeys } from './util';
import Header from './Header';
import Footer from './Footer';
import NotFound from './NotFound';
import ReleaseTable from './ReleaseTable';
import ReleaseDownloads from './ReleaseDownloads';

const channelRegex = channelKeys.join('|')
const osRegex = osKeys.join('|')
const versionRegex = "\\d+\\.\\d+\\.\\d+\\.\\d+"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDark: window.matchMedia &&
              window.matchMedia('(prefers-color-scheme: dark)').matches
    };
  }

  componentDidMount() {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    this.listener = (e) => {
      this.setDarkMode(e.matches)
    };

    this.setDarkMode(this.state.isDark);

    if (media.addEventListener) {
      media.addEventListener('change', this.listener);
    } else {
      media.addListener(this.listener); // For older browsers
    }
  }

  componentWillUnmount() {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    if (media.removeEventListener) {
      media.removeEventListener('change', this.listener);
    } else {
      media.removeListener(this.listener); // For older browsers
    }
  }

  setDarkMode = (isDark) => {
    this.setState({ isDark });
    document.body.classList.toggle('bp3-dark', isDark);
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header/>
          <Switch>
            <Route path={`/:releaseOs(${osRegex})/:releaseChannel(${channelRegex})/:releaseVersion(${versionRegex})`} component={ReleaseDownloads}/>
            <Route path={`/:releaseVersion(${versionRegex})/`} component={ReleaseTable}/>
            <Route path={`/:releaseOs(${osRegex})/`} component={ReleaseTable}/>
            <Route path="/" component={ReleaseTable}/>
            <Route component={NotFound}/>
          </Switch>
          <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
