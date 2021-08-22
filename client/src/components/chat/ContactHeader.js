import {Avatar} from 'components';
import React from 'react';
import { Row } from 'reactstrap';

const ContactHeader = props => (
    <Row className='heading' >
        <Avatar />
        <div>جهات الإتصال</div>
    </Row>
);

export default ContactHeader;