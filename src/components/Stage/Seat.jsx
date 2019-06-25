import React from "react";
import PropTypes from "prop-types";

const Seat = ({ id, row, seat, x, y, svgId, fontColor, borderColor, backgroundColor, onClick }) => {
    const handleClick = () => {
        onClick && onClick({ id, row, seat });
    }
    return (
        <g style={{ cursor: 'pointer' }} onClick={handleClick}>
            <rect x={x} y={y} width="40" height="40" fill={backgroundColor} stroke={borderColor} strokeWidth="3" />
            <use href={`#${svgId}`} x={x} y={y} fill={fontColor}></use>
        </g>
    );
};

Seat.propTypes = {
    id: PropTypes.string.isRequired,
    row: PropTypes.number.isRequired,
    seat: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    svgId: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    fontColor: PropTypes.string.isRequired,
    borderColor: PropTypes.string,
    onClick: PropTypes.func
}

Seat.defaultProps = {
    borderColor: '#828282'
}

export { Seat };
