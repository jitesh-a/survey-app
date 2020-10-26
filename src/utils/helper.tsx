// import crypto from 'crypto-js';
//@ts-nocheck
import React from 'react';
import basicAuth from 'basic-authorization-header';

import Survey from '../models/survey.model';
import User from '../models/user.model';

// const getSignatureKey = (key: string, dateStamp: any, regionName: string, serviceName: string): string => {
//   var kDate = crypto.HmacSHA256(dateStamp, "AWS4" + key);
//   var kRegion = crypto.HmacSHA256(regionName, kDate);
//   var kService = crypto.HmacSHA256(serviceName, kRegion);
//   var kSigning = crypto.HmacSHA256("aws4_request", kService);
//   return kSigning;
// }

const getEmptySurvey = (): Survey => {
  return {
    active: false,
    name: '',
    expiryDate: '',
    url: '',
    fromEmail: '',
    triggerCaseClosure: false,
    triggerActivityClosure: false,
    accessibility: ''
  }
}

const getSurveyTableHeaders = () => {
  return {
    id: 'Id',
    active: 'Active',
    name: 'Name',
    expiryDate: 'Expiry date',
    url: 'Url',
    fromEmail: 'From email',
    triggerCaseClosure: 'Trigger case closure',
    triggerActivityClosure: 'Trigger activity closure',
    accessibility: 'Accessibility'
  }
}

const generateBasicAuth = (user: User) => {
  return basicAuth(user.email, user.password);
}

const getFormHeaders = (auth?: string) => {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  // headers.append("Authorization", "Basic YWRtaW46c2VjcmV0");
  if (auth) {
    headers.append("Authorization", auth);
  }
  return headers;
}

const getBooleanValue = (value: string) => {
  if (value === 'on') {
    return true;
  } else if (value === 'off') {
    return false;
  } else {
    return value;
  }
}

const renderErrorMessage = (error: string) => {
  return (
    <p className="error">{error}</p>
  )
}

export default {
  // getSignatureKey,
  getEmptySurvey,
  generateBasicAuth,
  getFormHeaders,
  getBooleanValue,
  renderErrorMessage,
  getSurveyTableHeaders
}