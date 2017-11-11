import React from 'react';
import { Message, Button, Input, Container, Header } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Register extends React.Component {
    state = {
        username: '',
        usernameError: '',
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
    };

    onSubmit = async () => {
        this.setState({
            usernameError: '',
            emailError: '',
            passwordError: '',    
        });

        const { username, email, password } = this.state;
        const response = await this.props.mutate({
            variables: { username, email, password },
        });

        debugger;
        const {ok, errors} = response.data.register;
        debugger;
        if (ok) {
            this.props.history.push('/');
        } else {
            const err = {};
            errors.forEach(({ path, message }) => {
                // err['passwordError'] = 'too long..';
                err[`${path}Error`] = message;
            });
            console.log('err', err);
            this.setState(err);
        }
    }

    onChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    render() {

        const { username, email, password, usernameError, emailError, passwordError } = this.state;
        
        const errorList = [];

        if (usernameError) {
            errorList.push(usernameError);
        }

        if (emailError) {
            errorList.push(emailError);
        }

        if (passwordError) {
            errorList.push(passwordError);
        }


        
        return (
            <Container text>
                <Header as="h2">Register</Header>
                <Input error={!!usernameError} name="username" onChange={this.onChange} value={username} placeholder="Username" fluid />
                <Input error={!!emailError} name="email" onChange={this.onChange} value={email} placeholder="Email" fluid />
                <Input error={!!passwordError} name="password" onChange={this.onChange} value={password} type="password" placeholder="Password" fluid />
                <Button onClick={this.onSubmit} >Submit</Button>
                {usernameError || emailError || passwordError ? (
                    <Message error header="There was some errors with your submission" list={errorList}></Message>
                ) : null}
            </Container>
        );
    }
}

const registerMutation = gql`
    mutation($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password) {
            ok
            errors {
                path
                message
            }
        }
    }
`;

export default graphql(registerMutation)(Register);