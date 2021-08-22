import { ChatHeader, ContactHeader, Contacts, Messages ,MessageForm } from 'components';
import React from 'react';
import { Row } from 'reactstrap';

class Chat extends React.Component {

    state = {

        user: { id: "1", name:"ibrahim" },
        messages: [
            { sender: "1", recevier: "2", content: "from 1 to 2" },

            { sender: "3", recevier: "2", content: "from 3 to 2" },

            { sender: "3", recevier: "1", content: "from 3 to 1" },
            
            { sender: "1", recevier: "2", content: "from 1 to 2" },
            
            { sender: "3", recevier: "1", content: "from 3 to 1" },
            
            { sender: "1", recevier: "3", content: "from 1 to 3" },
            
            { sender: "2", recevier: "1", content: "from 2 to 1" },
            
            { sender: "1", recevier: "2", content: "from 1 to 2" },
            
            { sender: "3", recevier: "2", content: "from 3 to 2" }
        ],
        contacts: [
            {id:"2", name:"mohammad"},
            {id:"3", name:"mahmoud"},
        ],
        contact: {id:"2", name:"mohammad"},
    }

    onChatNavigate = contact => {
        this.setState({contact});
    }

    render() {
        
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
                    <MessageForm />
                </div>
            </Row>
        );
    }

    renderChat = () => {
        const {contact, user } = this.state;
        if(!contact) return;
        let messages = this.state.messages.filter(e => (e.sender === contact.id && e.recevier === user.id) || (e.recevier === contact.id && e.sender === user.id));
        return <Messages user={user} messages={messages} /> ;
    }
}

export default Chat;