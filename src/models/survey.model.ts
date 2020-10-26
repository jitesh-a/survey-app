interface Survey {
  id?: string;
  active: boolean;
  name: string;
  expiryDate: string;
  url: string;
  fromEmail: string;
  triggerCaseClosure: boolean;
  triggerActivityClosure: boolean;
  accessibility: string;
}

export default Survey;