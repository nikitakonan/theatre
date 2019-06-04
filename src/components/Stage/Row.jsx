import React, { Component } from "react";
import { Seat } from "./Seat";
import * as PropTypes from "prop-types";

export class Row extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(data) {
        const { onClick, number } = this.props;
        onClick && onClick({
            ...data,
            row: number
        });
    }
    render() {
        let { number, rightOffset, seats } = this.props;
        return (
            <div className="row">
                <div className="row-name">
                    {number} ряд
                </div>
                <div className="row-seats" style={{ marginRight: rightOffset }}>
                    {seats.map(seat => <Seat key={seat.number} onClick={this.handleClick} {...seat}/>)}
                </div>
            </div>
        )
    }
}

Row.propTypes = {
    number: PropTypes.any,
    rightOffset: PropTypes.any,
    seats: PropTypes.any,
    onClick: PropTypes.func
};
