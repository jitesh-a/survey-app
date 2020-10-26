import React, { useState } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import Survey from '../../models/survey.model';
import helper from '../../utils/helper';
import SurveyForm from './SurveyForm/SurveyForm';
import SurveyTable from './SurveyTable/SurveyTable';

const SurveyComponent: React.FC<{}> = () => {
  const [showSurveys, setShowSurveys] = useState(false);
  const [surveys, setSurveys] = useState<Array<Survey>>([]);
  const [newSurvey, setNewSurvey] = useState<Survey>(helper.getEmptySurvey());

  const renderSurveyForm = () => {
    return (
      <SurveyForm />
    )
  }

  const renderSurveys = () => {
    return (
      <SurveyTable />
    )
  }

  const renderToggleButton = () => {
    return (<Button variant="primary" type="button" onClick={e => setShowSurveys(!showSurveys)}>
      {showSurveys ? 'Back to submit' : 'View submitted surveys'}
    </Button>)
  }

  return (
    <Row>
      <Col>
        {renderToggleButton()}
        {showSurveys ? renderSurveys() : renderSurveyForm()}
      </Col>
    </Row>
  )
}

export default SurveyComponent;