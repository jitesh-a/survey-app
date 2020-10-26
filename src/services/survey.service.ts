//@ts-nocheck
import Survey from "../models/survey.model";
import { HTTP_METHODS } from "../utils/constants";
import helper from "../utils/helper";

const BASE_URL = 'https://gpljf9fnqg.execute-api.us-east-1.amazonaws.com/dev/survey';

const saveSurvey = (survey: Survey, auth): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    let raw = JSON.stringify(survey);

    var requestOptions = {
      method: HTTP_METHODS.POST,
      headers: helper.getFormHeaders(auth),
      body: raw,
      redirect: 'follow'
    };

    fetch(BASE_URL, requestOptions)
      .then(response => response.json())
      .then(result => resolve(result))
      .catch(error => reject(error));
  })
}

const getSurveys = (auth) => {
  return new Promise<boolean>((resolve, reject) => {

    var requestOptions = {
      method: HTTP_METHODS.GET,
      headers: helper.getFormHeaders(auth),
      redirect: 'follow'
    };

    fetch(BASE_URL, requestOptions)
      .then(response => response.json())
      .then(result => resolve(result))
      .catch(error => reject(error));
  })
}

export {
  saveSurvey,
  getSurveys
}