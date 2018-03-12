let accessToken;

const clientId = "a5504957c04d419aa8b23e119f035216";
const redirectUri = "http://localhost:3000/";
const scope = "playlist-modify-private playlist-modify-public";

const Spotify = {
    getAccessToken(){
        let authorizeURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}`;


        if (accessToken){
            return accessToken;
        }
        let urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
        let urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

        if (urlAccessToken && urlExpiresIn){
            accessToken = urlAccessToken[1];
            window.setTimeout(() => accessToken = "",urlExpiresIn[1] * 1000);
            window.history.pushState("Access Token", null, "/");
            return accessToken;
        } else {
            return window.location = authorizeURL;
        }
    },
    search(searchTerm){
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (jsonResponse.tracks){
                return jsonResponse.tracks.items.map(track => ({
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }
                ))
            } else {
                return [];
            }
        })
    },
    savePlaylist(playlistName,trackURIs){
        if (playlistName && trackURIs){
            const accessToken = Spotify.getAccessToken();
            const headers = {Authorization: `Bearer ${accessToken}`};
            const playlistHeaders = {
                headers: headers,
                method: "POST",
                body: JSON.stringify({name: playlistName})
            };
            const trackHeaders = {
                headers: headers,
                method: "POST",
                body: JSON.stringify({uris: trackURIs})
            };

            let userId;
            let playlistId;
            return fetch(`https://api.spotify.com/v1/me`,{
                headers: headers
            }).then(response => {
                return response.json();
            }).then(jsonResponse => {
                userId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
                    playlistHeaders
            ).then(response => {
                return response.json();
            }).then(jsonResponse =>{
                playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
                    trackHeaders
                )
            })
            })
        } else;

    }
};


export default Spotify;