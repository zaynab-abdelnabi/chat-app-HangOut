import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Input, Button } from 'reactstrap';
import { Error } from 'components';
import Logo from 'assets/HangOut.png';
import Auth from 'Auth';
import axios from 'axios';


class Login extends React.Component {
    state = { username: '', password: '', error: '' }

    onChange = e => this.setState({
        [e.target.name]: e.target.value, error: null
    });A

    onSubmit = e => {
        e.preventDefault();
        let data = {
            username: this.state.username,
            password: this.state.password
        }
        axios.post('/api/auth', data)
            .then(res => {
                Auth.login(res.data);
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({ error: "الرجاء التحقق من اسم المستخدم و رقم المرور"})
            });
    }

    render() {
        return (
            <Card className="auth col-lg-3 col-sm-6">
                <Form onSubmit={this.onSubmit}>
                    <img src={Logo} alt="" width="200" />
                    <h5 className="mb-4">تسجيل الدخول</h5>
                    <Error error={this.state.error} />
                    <Input value={this.state.username} name="username" onChange={this.onChange} placeholder="اسم المستخدم" required autoFocus/>
                    <Input type="password" value={this.state.password} name="password" onChange={this.onChange} placeholder="كلمة المرور" required />
                    <Button color="primary" block className="mb-3"> فتح </Button>
                    <small><Link to="/register">إنشاء حساب جديد</Link></small>
                    <p className="m-3 text-muted">&copy; {new Date().getFullYear()}</p>
                </Form>
            </Card>
        );
    }
}

export default Login;