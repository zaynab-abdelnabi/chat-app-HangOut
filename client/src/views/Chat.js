import React from 'react';
import {Row} from 'reactstrap';

class Chat extends React.Component {
    render() {
        return (
           <Row className="h-100">
               <div id="contacts-section" className="col-6 col-md-4">
                   contact section
               </div>
               <div id="messages-section" className="col-6 col-md-8">
                    messages section
               </div>
           </Row>
        );
    }
}

export default Chat;