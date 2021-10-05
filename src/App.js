import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlbumList from './components/AlbumList/AlbumList';
import Album from './components/Album/Album';
import { Container, Nav } from 'react-bootstrap';
import { SpotifyApiContext } from 'react-spotify-api'
import Cookies from 'js-cookie'

import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css'
import React from 'react'
import { Row, Col, Card } from 'react-bootstrap';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";




function App() {
    
   return (
      <Router>
        <Container>
        <Nav
            activeKey="/home"
            
            >
            <Nav.Item>
            <Nav.Link href="/home">Home</Nav.Link>
            </Nav.Item>
            </Nav>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
              <Route path="/album/:id">
                <DisplayAlbum />
              </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Container>
      </Router>
);
  
}


function DisplayAlbum() {
    let { id } = useParams();
    return (
        <Album ids={id}/>
    )
    
}


function Home() {
    
    const [token, setToken] = React.useState(Cookies.get("spotifyAuthToken"));
    const [searchAlbum, setSearchAlbum] = React.useState("");
    
    const handleOnChange = (e) => {
        e.preventDefault()
        setSearchAlbum(e.target.value)
   }
    return (
        <div>
         <Row>
          <input
             className="SearchInput"
             type="text"
             onChange={(e) => handleOnChange(e)}
             placeholder="Search album"
           />
           </Row>
          <AlbumList searchAlbum={searchAlbum}/>
          {token ? (
          <SpotifyApiContext.Provider value={token}>
            {/* Your Spotify Code here */}
            <p>You are authorized with token: {token}</p>
          </SpotifyApiContext.Provider>
          
        ) : (
          // Display the login page
          <SpotifyAuth
            redirectUri='http://localhost:3000/callback'
            clientID='1a70ba777fec4ffd9633c0c418bdcf39'
            scopes={[Scopes.userReadPrivate, 'user-read-email']} // either style will work
            onAccessToken={(token) => setToken(token)}
          />
        )}
        </div>
    );
}

export default App;
