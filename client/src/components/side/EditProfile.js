import React from "react";
import { Row, Form, Button } from 'reactstrap';
import Error from 'components/Error';
import { Avatar } from "components";
import axios from "axios";

class EditProfile extends React.Component {
    state = {
        name: this.props.user.name,
        about: this.props.user.about
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value, error: null });

    onSubmit = e => {
        e.preventDefault();
        let data = { name: this.state.name, about: this.state.about }
        axios.post('/api/account', data)
            .then(this.props.toggle)
            .catch(err => this.setState({
                error: err.response.data.message
            }));
    };

    onClose = e => {
        this.setState({ name: this.props.user.name, about: this.props.user.about });
        this.props.toggle();
    };

    render() {
        return (
            <div className={this.props.open ? 'side-profile open' : 'side-profile'}>

                <Row className="heading">
                    <div className="mr-2 nav-link" onClick={this.onClose}>
                        <i className="fa fa-arrow-right" />
                    </div>
                    <div>الملف الشخصي</div>
                </Row>

                <div className="d-flex flex-column overflow-auto">

                    <Form onSubmit={this.onSubmit}>

                        <Error error={this.state.error} />

                        <div className="text-center">
                            <Avatar src={this.props.user.avatar} />
                        </div>


                        <div className="bg-white px-3 py-2">
                            <label className="text-muted d-block">الأسم</label>
                            <input className="d-block w-100" value={this.state.name} name="name" onChange={this.onChange} required autoComplete="off" />
                        </div>

                        <div className="bg-white px-3 py-2">
                            <label className="text-muted d-block">رسالة الحالة</label>
                            <input className="d-block w-100" value={this.state.about} name="about" onChange={this.onChange} required autoComplete="off" />
                        </div>

                        <div className="bg-white px-3 py-2">
                            <Button block className="mt-3">حفظ</Button>
                        </div>

                    </Form>

                </div>

            </div>
        );
    }

}

export default EditProfile;