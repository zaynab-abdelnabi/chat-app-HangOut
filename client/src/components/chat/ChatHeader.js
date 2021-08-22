import React from 'react';
import Auth from 'Auth';
import {Avatar} from 'components';
import {Row, DropdownItem, DropdownMenu, DropdownToggle, Nav, UncontrolledDropdown} from 'reactstrap';

const ChatHeader = props => {

    const logout = () => {
        console.log(props);
        Auth.logout();
        props.history.push('/');
    };

    return (
        <Row className="heading m-0">
            <Avatar src={props.contact.avatar} />
            <div className="text-right">
                <div>{props.contact ? props.contact.name : ''}</div>
            </div>
            <Nav className="mr-auto" navbar>
                <UncontrolledDropdown>
                    <DropdownToggle tag="a" className="nav-link">
                        <i className="fa fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={logout}>تسجيل الخروج</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
        </Row>
    );
}

export default ChatHeader;