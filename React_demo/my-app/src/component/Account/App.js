import { Component } from 'react';
import MenuLeft from './MenuLeft'

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <MenuLeft />
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default App;
