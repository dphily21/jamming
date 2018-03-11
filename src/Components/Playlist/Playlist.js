import React, { Component } from 'react';
import './Playlist.css';
import TrackList from "../TrackList/TrackList";

class Playlist extends Component {
    constructor(props){
        super(props);
        this.state = {isRemoval: true};
    }
    handleNameChange(e){
        this.setState({name: e.target.value});
    }
    render() {
        return (
            <div className="Playlist">
                <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
                <TrackList tracks={this.props.playlistTracks}
                           isRemoval={this.state.isRemoval}
                           onRemove={this.props.onRemove}/>
                <a className="Playlist-save">SAVE TO SPOTIFY</a>
            </div>
        );
    }
}

export default Playlist;
