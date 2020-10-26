import React, { useState, useContext, useEffect } from 'react';
import { Form, Col, Button, Spinner, Table } from 'react-bootstrap';
import Survey from '../../../models/survey.model';
import helper from '../../../utils/helper';
import { FORM_CONSTANTS } from '../../../utils/constants';
import AppContext from '../../../context/app.context';
import { saveSurvey, getSurveys } from '../../../services/survey.service';

const SurveyTable = () => {
  const [surveys, setSurveys] = useState<Array<Survey>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const auth = useContext(AppContext);

  useEffect(() => {
    loadSurveys();
  }, [])


  const loadSurveys = async () => {
    setIsLoading(true);
    try {
      const result: any = await getSurveys(auth);
      //console.log(result);
      if (result?.surveys) {
        setSurveys([...result.surveys])
      }
    } catch (error) {
      //console.error(error);
      setError(JSON.stringify(error));
    }
    setIsLoading(false);
  }

  const renderTableHeader = (): React.ReactNode => {
    const headers: any = helper.getSurveyTableHeaders();
    return (
      <thead>
        <tr>
          {Object.keys(headers).map(key =>
            <td>{headers[key]}</td>
          )}
        </tr>
      </thead>
    )
  }

  const renderTableBody = () => {
    return (
      <tbody>
        {
          surveys.map(survey =>
            <tr>
              <td>{survey.id}</td>
              <td>{survey.name}</td>
              <td>{survey.expiryDate}</td>
              <td>{survey.url}</td>
              <td>{survey.fromEmail}</td>
              <td>{survey.triggerCaseClosure}</td>
              <td>{survey.triggerActivityClosure}</td>
              <td>{survey.accessibility}</td>
            </tr>
          )
        }
      </tbody>
    )
  }

  const renderLoading = () => {
    return (
      isLoading ? <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> : []
    )
  }
  return (
    <>
      {renderLoading()}
      < Table striped bordered hover>

        {renderTableHeader()}
        {renderTableBody()}
        
      </Table>
      {helper.renderErrorMessage(error)}
    </>
  )
}

export default SurveyTable;