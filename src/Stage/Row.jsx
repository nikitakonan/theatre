import React, { Component } from "react";
import { Seat } from "./Seat";
import * as PropTypes from "prop-types";

export class Row extends Component {
    constructor(props) {
        super(props);
        this.handleBuy = this.handleBuy.bind(this);
    }
    handleBuy(data) {
        const { onBuy, number } = this.props;
        onBuy && onBuy({
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
                    {seats.map(seat => <Seat key={seat.number} onBuy={this.handleBuy} {...seat}/>)}
                </div>
            </div>
        )
    }
}

Row.propTypes = {
    number: PropTypes.any,
    rightOffset: PropTypes.any,
    seats: PropTypes.any,
    onBuy: PropTypes.any
};
