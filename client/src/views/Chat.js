import Auth from 'Auth';
import { ChatHeader, ContactHeader, Contacts, Messages, MessageForm } from 'components';
import React from 'react';
import { Row, Spinner } from 'reactstrap';
import socketIO from 'socket.io-client';

class Chat extends React.Component {

    state = {}

    componentDidMount() {
        this.initSocketConnection();
    }

    initSocketConnection = () => {

        let socket = socketIO(process.env.React_APP_SOCKET, {
            query: 'token=' + Auth.getToken()
        });
        socket.on('connect', () => this.setState({ connected: true }));
        socket.on('disconnect', () => this.setState({ connected: false }));
        socket.on('data', (user, contacts, messages) => {
            let contact = contacts[0] || {};
            this.setState({ messages, contacts, user, contact });
        });
        socket.on('new_user', this.onNewUser);
        socket.on('message', this.onNewMessage);
        socket.on('error', err => {
            if (err === 'auth_error') {
                Auth.logout();
                this.props.history.push('/login');
            }
        });
        this.setState({socket});
    }

    onNewUser = user => {
        let contacts = this.state.contacts.concat(user);
        this.setState({ contacts });
    }

    onNewMessage= message => {
        let messages = this.state.messages.concat(message);
        this.setState({ messages });
    }

    sendMessage = message => {
        if (!this.state.contact._id) return;
        message.receiver = this.state.contact._id;
        let messages = this.state.messages.concat(message);
        this.setState({ messages });
        this.state.socket.emit('message', message);
    }

    onChatNavigate = contact => {
        this.setState({ contact });
    }

    render() {
        if (!this.state.connected || !this.state.contacts || !this.state.messages) {
            return (
                <Spinner id="loader" color="success" />
            );
        }
        return (
            <Row className="h-100">
                <div id="contacts-section" className="col-6 col-md-4">
                    <ContactHeader />
                    <Contacts
                        contacts={this.state.contacts}
                        messages={this.state.messages}
                        onChatNavigate={this.onChatNavigate}
                    />
                </div>
                <div id="messages-section" className="col-6 col-md-8">
                    <ChatHeader contact={this.state.contact} />
                    {this.renderChat()}
                    <MessageForm sender={this.sendMessage} />
                </div>
            </Row>
        );
    }

    renderChat = () => {
        const { contact, user } = this.state;
        if (!contact) return;
        let messages = this.state.messages.filter(e => e.sender === contact._id || e.receiver === contact._id);
        return <Messages user={user} messages={messages} />;
    }
}

export default Chat;