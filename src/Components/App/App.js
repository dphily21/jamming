import React, { Component } from 'react';
import './App.css';
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

const playlist = [{
    id: 0,
    name: 'Land of Time',
    artist: 'Excision',
    album: '2017 Lost Land Mix'
}];

const results = [{
    id: 0,
    name: 'Land of Time',
    artist: 'Excision',
    album: '2017 Lost Land Mix'
},{
    id: 1,
    name: 'Pursuit of Happiness',
    artist: 'Kid Cudi',
    album: 'Man on the Moon'
}];

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            playlistName: 'Playlist 1',
            playlistTracks: playlist,
            searchResults: results
        };
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
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

  render() {
    return (
        <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar/>
          <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults}
                             onAdd={this.addTrack}/>
              <Playlist playListName={this.state.playlistName}
                        playlistTracks={this.state.playlistTracks}
                        onRemove={this.removeTrack}
                        onNameChange={this.updatePlaylistName}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
