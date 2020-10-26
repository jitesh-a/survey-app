import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { FORM_CONSTANTS } from '../../utils/constants';
import { login } from '../../services/login.service';
import User from '../../models/user.model';
import helper from '../../utils/helper';

interface LoginFormProps {
  setIsLoggedIn: Function;
  setAuth: Function;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {

  const getEmptyFormFields = (): User => {
    return {
      email: '',
      password: ''
    }
  }

  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState<User>(getEmptyFormFields());
  const [error, setError] = useState('');

  const onChange = (event: any, key: string) => {
    const value: string = event.target.value.toString();
    const newFormFields = { ...formFields };
    if (key === FORM_CONSTANTS.email) {
      newFormFields.email = value;
    } else {
      newFormFields.password = value;
    }
    setFormFields(newFormFields);
  }

  const onClick = async (event: any) => {
    //console.log(formFields);
    const { setIsLoggedIn, setAuth } = props;
    let result: any = null;
    try {
      setIsLoading(true);
      result = await login({ ...formFields });
      //console.log(result);
      if (result?.success) {
        setAuth(helper.generateBasicAuth(formFields));
      } else {
        setError(FORM_CONSTANTS.error)
      }
    } catch (error) {
      //console.error(error);
      setError(error);
    }
    // setIsLoggedIn(result);
    setIsLoading(false);
  }

  const renderErrorMessage = () => {
    return (
      <p className="error">{error}</p>
    )
  }

  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control required type="text" placeholder="Enter email" value={formFields.email} onChange={e => onChange(e, FORM_CONSTANTS.email)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={formFields.password} onChange={e => onChange(e, FORM_CONSTANTS.password)} />
      </Form.Group>
      <Button variant="primary" type="button" onClick={onClick} disabled={isLoading}>
        {isLoading ? <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        /> : []}
        Submit
      </Button>
      {
        error ? renderErrorMessage() : []
      }
    </Form>
  )
}

export default LoginForm;