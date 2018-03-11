import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            placeholder: "Enter A Song, Album, or Artist"
        };
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }
    handleTermChange(e){
        this.setState({placeholder: e.target.value});
    }
    search(){
        this.props.onSearch(this.state.placeholder);
    }
    render() {
        return (
            <div className="SearchBar">
                <input placeholder={this.state.placeholder}
                       onChange={this.handleTermChange}/>
                <a onClick={this.search}>SEARCH</a>
            </div>
        );
    }
}

export default SearchBar;
