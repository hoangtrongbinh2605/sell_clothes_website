// resources/assets/js/components/App.js

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class App extends Component {
  render () {
    return (
      <div>
        <nav className='navbar navbar-default navbar-static-top'>
          <div className='container'>
            <div className='navbar-header'>
              <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#app-navbar-collapse' aria-expanded='false'>
                <span className='sr-only'>Toggle Navigation</span>
                <span className='icon-bar' />
                <span className='icon-bar' />
                <span className='icon-bar' />
              </button>
              <Link className='navbar-brand' to='/'>
                Laravel ReactJS Example
              </Link>
            </div>
            <div className='collapse navbar-collapse' id='app-navbar-collapse'>
              <ul className='nav navbar-nav'>
                <li><Link to='/testapi'>Users</Link></li>
                <li><Link to='/testapi/create'>Add Test Api</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
export default App