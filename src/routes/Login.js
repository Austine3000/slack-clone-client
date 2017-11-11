import React from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Input, Container, Header } from 'semantic-ui-react';

export default observer(class Login extends React.Component {
    constructor(props) {
        super (props);

        extendObservable(this, {
            email: '',
            password: '',
        });
    }

    render() {

        const { email, password } = this;
        return (
            <Container text>
                <Header as="h2">Register</Header>
                <Input name="email" onChange={this.onChange} value={email} placeholder="Email" fluid />
                <Input name="password" onChange={this.onChange} value={password} type="password" placeholder="Password" fluid />
                <Button onClick={this.onSubmit} >Submit</Button>
            </Container>

        );
    }
});