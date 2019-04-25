// core/data library
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

// Multilingual Support
import { withLocalize } from 'react-localize-redux';
import LanguageService from '../services/LanguageService';

import Routing from './Routing';
import Loading from './Loading';

// --- Components ---
class App extends React.Component {
  constructor(props) {
    super(props);
    LanguageService.initializeAppProps(props);
  }

  render() {
    return(
      <React.Suspense fallback={ <Loading/> }>
        <CssBaseline />
        <Routing />
      </React.Suspense>
    );
  }
}

export default withLocalize(App);
