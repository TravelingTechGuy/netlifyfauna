var id = null;

const showResult = text => document.getElementById('result').innerText = text;

const callAPI = async (method, params = {}) => {
  try {
    showResult('');
    let uri = '/.netlify/functions/api';
    if(params.id) {
      uri += `/${params.id}`;
      delete params.id;
    }

    let options = {method};
    if(method === 'POST' || method === 'PUT') {
      options = Object.assign(options, {body: JSON.stringify(params), headers: {'Content-Type': 'application/json'}});
    }
    
    let response = await fetch(uri, options);
    if(!response.ok) {
      console.error(response.statusText);
      showResult('error: ' + response.statusText);
    }
    else {
      let data = await response.json();
      displayData(method, data);
    }
  }
  catch(err) {
    console.error(err);
    showResult('error: ' + err.message);
  }
};

const displayData = (method, data) => {
  switch(method) {
    case 'GET': 
      let html = data.map(line => JSON.stringify(line)).join('<p/>');
      document.getElementById('result').innerHTML = html;
      break;
    case 'POST': 
      showResult(JSON.stringify(data));
      id = data.id;
      break;
    case 'DELETE':
      showResult(JSON.stringify(data));
      id = null;
      break;
    case 'PUT': 
      showResult(JSON.stringify(data));
      break;
  }
};

const post = () => {
  let newCustomer = {"firstName":"Tom","lastName":"Jones","address":{"street":"72 Fire Circle","city":"Memphis","state":"TN","zipCode":"44433"},"telephone":"859-333-4444","creditCard":{"network":"Mastercard","number":"5326112310613672"}};
  callAPI('POST', newCustomer);
};

const get = () => callAPI('GET');
const put = () => callAPI('PUT', {id, lastName: 'Brown'});
const del = () => callAPI('DELETE', {id});
