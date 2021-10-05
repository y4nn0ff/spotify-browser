import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'




function SpotifyService (props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [token, setToken] = React.useState(Cookies.get("spotifyAuthToken"))
    

    useEffect(() => {
        console.log("la",props.searchAlbum);
        if(props.searchAlbum.length > 0) {
            
        
            fetch(`https://api.spotify.com/v1/search?q=${props.searchAlbum}&type=album`, {
                headers: { 'Authorization': 'Bearer ' + token },
            })
              .then(res => res.json())
              .then(
                (items) => {
                    console.log(items);
                  setIsLoaded(true);
                  if(items.error) {
                      if(items.error.status == 401) {
                          console.log("refresh token");
                      }
                  } else {
                      setItems(items.albums.items);
                  }
                },
                (error) => {
                  setIsLoaded(true);
                  setError(error);
                }
              )
              
          }
              
          }, [props.searchAlbum])
      
          
    
      if (error) {
        return [{id:1, title:error.message}];
      } else if (!isLoaded) {
        return [{id:1, title:'chargement', images:[{url:''},{url:''},{url:''}]}];
      } else {
         console.log(items);
        return (
           items
        );
      }
}

export default SpotifyService