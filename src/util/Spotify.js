let accessToken;

const clientId = "a5504957c04d419aa8b23e119f035216";
const redirectUri = "http://localhost:3000/";

const Spotify = {
    getAccessToken(){
        const authorizeURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}`;
        const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

        if (accessToken){
            return accessToken;
        } else if (urlAccessToken && urlExpiresIn){
            accessToken = urlAccessToken;
            window.setTimeout(accessToken = "",urlExpiresIn * 1000);
            window.history.pushState("Access Token", null, "/");
            return accessToken;
        } else {
            return window.location = authorizeURL;
        }
    },
    search(searchTerm){
        const accessToken = this.getAccessToken();
        console.log(accessToken);
        return fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`,{
            headers: {
                'Authorization': `Bearer ${accessToken}`
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
    savePlaylist(playListName,trackURIs){
        if (playListName && trackURIs){
            let accessToken = this.getAccessToken;
            let headers = {Authorization: `Bearer ${accessToken}`};
            let userId;

        } else {
            return;
        }
    }
};


export default Spotify;