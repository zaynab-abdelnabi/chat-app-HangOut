import React from 'react';
import moment from 'moment';

const Message = props => (

    <div className={props.message.outgoing ? 'message-item' : 'message-item incoming'}>
        <div className="d-flex flex-row">
            <div className="body m-1 mr-2">
                <div>{props.message.content}</div>
                {props.message.outgoing ? <span className={props.message.seen ? 'blueIcon check' : 'check'}>
                    <i className="fa fa-check" />
                </span> : <span></span>}
                <span className="small text-muted">
                    {moment(props.message.date).format("hh:mm a | MMM D")}
                </span>
            </div>
        </div>
    </div>
);

export default Message;