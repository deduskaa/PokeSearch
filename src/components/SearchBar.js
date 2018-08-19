import React, { Component } from 'react';
import '../css/Form.css';
import FontAwesome from 'react-fontawesome';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            loading: false
        };
    }

    handleChange = event => {
        this.setState({ value: event.target.value });
    };

    sendValueToParent = event => {
        event.preventDefault();
        this.props.callbackFromParent(this.state.value);
    };

    render() {
        return (
            <form id="pokemon-search" onSubmit={this.sendValueToParent}>
                <label>
                    Name or ID:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                {this.props.loading ? (
                    <FontAwesome name="spinner" spin />
                ) : (
                    <input type="submit" value="Submit" />
                )}
            </form>
        );
    }
}

export default SearchBar;
