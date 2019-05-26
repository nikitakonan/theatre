import React, { Component }  from 'react';

export class AddActor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            color: '',
        };
    }
    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    handleAddClick() {
        const { onAdd } = this.props;
        typeof onAdd === 'function' && onAdd({ ...this.state });
        this.setState({
            name: '',
            color: '',
        });
    }
    render() {
        const { name, color } = this.state;
        return (
            <div>
                <label htmlFor="name">
                    name:
                    <input type="text"
                           id="name"
                           name="name"
                           value={name}
                           onChange={this.handleInputChange.bind(this)}/>
                </label>
                <label htmlFor="color">
                    color:
                    <input type="text"
                           id="color"
                           name="color"
                           value={color}
                           onChange={this.handleInputChange.bind(this)}/>
                </label>
                <button onClick={this.handleAddClick.bind(this)}>add</button>
            </div>
        );
    }
}
