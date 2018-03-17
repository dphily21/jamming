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
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    handleTermChange(e){
        this.setState({placeholder: e.target.value});
    }
    search(){
        this.props.onSearch(this.state.placeholder);
    }
    handleKeyPress(e){
        if(e.keyCode === 13){
            console.log(e.keyCode);
            this.props.onSearch(this.state.placeholder);;
        }
    }
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
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
