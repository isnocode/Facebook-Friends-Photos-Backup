import React, { Component } from 'react';

class ListSenders extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.senderName}</td>
                <td>{this.props.messengerTime}</td>
            </tr>
        );
    }
}

export default ListSenders;