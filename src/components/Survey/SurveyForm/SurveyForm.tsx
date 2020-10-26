import React, { useState, useContext } from 'react';
import { Form, Col, Button, Spinner } from 'react-bootstrap';
import Survey from '../../../models/survey.model';
import helper from '../../../utils/helper';
import { FORM_CONSTANTS } from '../../../utils/constants';
import AppContext from '../../../context/app.context';
import { saveSurvey } from '../../../services/survey.service';

const SurveyForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState<Survey>(helper.getEmptySurvey());

  const [error, setError] = useState('');

  const auth = useContext(AppContext);

  const onChange = (event: any, key: string) => {
    //console.log(event.target.value);
    const value: string = event.target.value.toString();
    const newFormFields = { ...formFields };
    //@ts-ignore
    newFormFields[key] = helper.getBooleanValue(value);
    setFormFields(newFormFields);
  }

  const onClick = async (event: any) => {
    //console.log(formFields);
    // const { setIsLoggedIn, setAuth } = props;
    let result: any = null;
    try {
      setIsLoading(true);
      result = await saveSurvey({ ...formFields }, auth);
      //console.log(result);
      if (result?.surveyId) {
        alert('Record saved successfully');
      } else {
        setError(result?.message);
      }

    } catch (error) {
      //console.error(error);
      setError(JSON.stringify(error));
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
    <>
      <h2>Survey Form</h2>
      <hr />
      <Form>
        <Form.Group>
          <Form.Check
            type="radio"
            label="Active"
            id="formControlActive"
            checked={formFields.active}
            onChange={(e: any) => onChange(e, FORM_CONSTANTS.active)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>
            Survey name
        </Form.Label>
          <Form.Control
            placeholder="Survey name"
            value={formFields.name}
            onChange={(e: any) => onChange(e, FORM_CONSTANTS.name)} />
        </Form.Group>

        <Form.Group>
          <Form.Label>
            Survey expiry date
        </Form.Label>
          <Form.Control placeholder="Survey expiry date" type="date"
            value={formFields.expiryDate}
            onChange={(e: any) => onChange(e, FORM_CONSTANTS.expiryDate)} />
        </Form.Group>

        <Form.Group>
          <Form.Label>
            Survey url
        </Form.Label>
          <Form.Control placeholder="Survey url" type="url"
            value={formFields.url}
            onChange={(e: any) => onChange(e, FORM_CONSTANTS.url)} />
        </Form.Group>

        <Form.Group>
          <Form.Label>
            Survey from email address
        </Form.Label>
          <Form.Control placeholder="Survey from email address" type="email"
            value={formFields.fromEmail}
            onChange={(e: any) => onChange(e, FORM_CONSTANTS.fromEmail)} />
        </Form.Group>

        <Form.Group>
          <Form.Label>
            Survey trigger
        </Form.Label>
          <Form.Check
            required
            name="triggerCaseClosure"
            label="Case closure"
            onChange={(e: any) => onChange(e, FORM_CONSTANTS.triggerCaseClosure)} />
          <Form.Check
            required
            name="triggerActivityClosure"
            label="Activity closure"
            onChange={(e: any) => onChange(e, FORM_CONSTANTS.triggerActivityClosure)}
          // onChange={handleChange}
          // isInvalid={!!errors.terms}
          // feedback={errors.terms}
          // id="validationFormik0"
          />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Survey accessibility</Form.Label>
          <Form.Control value={formFields.accessibility} as="select" onChange={(e: any) => onChange(e, FORM_CONSTANTS.accessibility)}>
            <option>User group 1</option>
            <option>user group 2</option>
            <option>User group 3</option>
            <option>User group 4</option>
            <option>User group 5</option>
          </Form.Control>
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
    </>
  )
}

export default SurveyForm;