import * as request from 'request'

class ApiService {
    request.get("http://www.google.com",response: any) => {
        console.log(response)
});
}