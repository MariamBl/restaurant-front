import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">EateryNet</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/villes">Villes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/zone">Zone</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/serie">Serie</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/specialite">Specialite</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/restaurant">Restaurant</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/map">Map</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}