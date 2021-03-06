import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
    constructor(props){
        super(props);
        this.addTrack=this.addTrack.bind(this);
        this.removeTrack=this.removeTrack.bind(this);
    }
    renderAction(isRemoval){
        return isRemoval ? "-" : "+";
    }
    clickAction(isRemoval){
        return isRemoval ? this.removeTrack : this.addTrack;
    }
    addTrack(){
        this.props.onAdd(this.props.track);
    }
    removeTrack(){
        this.props.onRemove(this.props.track);
    }
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                <a className="Track-action" onClick={this.clickAction(this.props.isRemoval)}>{this.renderAction(this.props.isRemoval)}</a>
            </div>
        );
    }
}

export default Track;
