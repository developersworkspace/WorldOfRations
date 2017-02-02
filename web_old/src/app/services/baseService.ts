import { Http, Response, Headers, RequestOptions } from '@angular/http';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


export class BaseService {

    constructor(private http: Http) {

    }

    post(uri, obj) {
        let headers = new Headers();

        let jwtToken = localStorage.getItem('jwt.token');
        if (jwtToken != null || jwtToken == '') {
            //headers.append('Authorization', 'Bearer ' + jwtToken);
        }

        return this.http.post(uri, obj, {
            headers: headers
        });
    }

    get(uri) {
        let headers = new Headers();

        let jwtToken = localStorage.getItem('jwt.token');
        if (jwtToken != null || jwtToken == '') {
            //headers.append('Authorization', 'Bearer ' + jwtToken);
        }
        
        return this.http.get(uri, {
            headers: headers
        });
    }
}