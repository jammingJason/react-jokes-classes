import React, { Component } from 'react';
import JokeList from './JokeList';
import HookJokeList from './HookJokeList';
import Van from './Van';
import HookJL from './HookJL';
/** App component. Renders list of jokes. */

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <JokeList /> */}
        <HookJL numJokesToGet={5} />
        {/* <Van /> */}
      </div>
    );
  }
}

export default App;
