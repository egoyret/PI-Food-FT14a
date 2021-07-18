import React from 'react'

function Nav() {
    return(
        <div className="navbar navbar-fixed-top navbar-inverse" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#nav-items">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/">Henry Blog</a>
          </div>
          <div id="nav-items" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li><a href="/pages/add">ADD PAGE</a></li>
              <li><a href="/users">USERS</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
}
export default Nav