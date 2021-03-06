import React, { Component } from 'react';
import './App.css';
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";



class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            playlistName: 'New Playlist',
            playlistTracks: [],
            searchResults: []
        };
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }

    addTrack(track){
        const add = this.state.playlistTracks.some(playListTrack => {
            return (playListTrack.id === track.id);
        });
        if (add === true){
            alert('This track is already on the playlist.');
            } else {
                return this.setState({
                playlistTracks: this.state.playlistTracks.concat([track])
            });
            }
        }
    removeTrack(track){
        const updatePlaylist = this.state.playlistTracks.filter(playListTrack => {
            return playListTrack.id !== track.id;
        });
        this.setState({
            playlistTracks: updatePlaylist
        });
    }
    updatePlaylistName(name){
        this.setState({playlistName: name});
    }
    savePlaylist(){
        const trackURIs = this.state.playlistTracks.map(track => track.uri);
        Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() =>{
            this.setState({
                playlistName: 'New Playlist',
                playlistTracks: [],
                searchResults: []
            });
        });
    }
    search(searchTerm){
        Spotify.search(searchTerm).then(
            results => {
                this.setState({searchResults: results});
            });
    }

  render() {
    return (
        <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults}
                             onAdd={this.addTrack}/>
              <Playlist playlistName={this.state.playlistName}
                        playlistTracks={this.state.playlistTracks}
                        onRemove={this.removeTrack}
                        onNameChange={this.updatePlaylistName}
                        onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
