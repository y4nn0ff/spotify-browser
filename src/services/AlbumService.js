import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'




function AlbumService (props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItem] = useState({});
    const [token, setToken] = React.useState(Cookies.get("spotifyAuthToken"))
    const [ids, setIds] = useState(null);
    
    
    useEffect(() => {
        
        if(props.ids.length > 0) {
            
        
            fetch(`https://api.spotify.com/v1/albums?ids=${props.ids}`, {
                headers: { 'Authorization': 'Bearer ' + token },
            })
              .then(res => res.json())
              .then(
                (items) => {
                  if(items.error) {
                      console.log(items.albums[0]);
                      if(items.error.status == 401) {
                          console.log("refresh token");
                      }
                  } else {
                      console.log(items.albums[0]);
                      setItem(items.albums[0]);
                  }
                   setIsLoaded(true);
                },
                (error) => {
                  setIsLoaded(true);
                  setError(error);
                }
              )
              
          }
              
      }, [props.ids])
      
          
     
      if (error) {
        return {id:1, title:error.message};
      } else if (!isLoaded) {
        return {id:1, title:'chargement', images:[{url:''},{url:''},{url:''}]};
      } else {
         console.log("la",item);
        return (
           item
        );
      }
}

export default AlbumService