import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    usr: 'api/usrs/'
};

function getUser(token,callback) {
    let request = new Request(HOST.backend_api + endpoint.usr, {
        method: 'GET',
        headers : {
            Authorization: 'Token ' + token
        }
    });
    console.log(request.url);
    console.log('token = ',token)
    RestApiClient.performRequest(request, callback);
}

export {
  getUser
};