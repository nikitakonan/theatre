import React, { Component } from "react";
import './react-contextmenu.css';
import PropTypes from "prop-types";

export class Seat extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.onClick && this.props.onClick({
            seat: this.props.number
        });
    }
    render() {
        const { number, actor, isBought } = this.props;
        const borderColor = actor && actor.color || '#fff';
        const backgroundColor = isBought ? borderColor : undefined;
        return (
            <div>
                <div className="seat"
                     title={actor && actor.name}
                     onClick={this.handleClick}
                     style={{ borderColor, backgroundColor }}>
                    {number}
                </div>
            </div>
        );
    }
}

Seat.propTypes = {
    number: PropTypes.any,
    actor: PropTypes.any,
    isBought: PropTypes.any,
    onClick: PropTypes.func
};
