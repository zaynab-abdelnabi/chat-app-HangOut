import { Avatar } from 'components';
import React from 'react';
import { Row } from 'reactstrap';

const ContactHeader = props => (
    <Row className='heading' >
        <Avatar />
        <div>جهات الإتصال</div>
        <div className="mr-auto nav-link" onClick={props.toggle}>
            <i className="fa fa-bars" />
        </div>
    </Row>
);

export default ContactHeader;