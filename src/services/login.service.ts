//@ts-nocheck
import User from '../models/user.model';
import helper from '../utils/helper';
import { HTTP_METHODS } from '../utils/constants';

const BASE_URL = 'https://gpljf9fnqg.execute-api.us-east-1.amazonaws.com/dev/login';

const login = (user: User): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    let raw = JSON.stringify(user);

    var requestOptions = {
      method: HTTP_METHODS.POST,
      headers: helper.getFormHeaders(),
      body: raw,
      redirect: 'follow'
    };

    fetch(BASE_URL, requestOptions)
      .then(response => response.json())
      .then(result => resolve(result))
      .catch(error => reject(error));
    // resolve(true);
  })
}

export {
  login
}