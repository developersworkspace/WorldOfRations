import { Headers, Http, RequestOptions, Response } from '@angular/http';

// Import RxJs required methods
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

export class BaseService {

    constructor(private http: Http) {

    }

    protected post(uri, obj) {
        const headers = new Headers();

        const jwtToken = localStorage.getItem('jwt.token');

        if (jwtToken != null || jwtToken == '') {
            headers.append('Authorization', 'Bearer ' + jwtToken);
        }

        return this.http.post(uri, obj, {
            headers,
        });
    }

    protected get(uri) {
        const headers = new Headers();

        const jwtToken = localStorage.getItem('jwt.token');

        if (jwtToken != null || jwtToken == '') {
            headers.append('Authorization', 'Bearer ' + jwtToken);
        }

        return this.http.get(uri, {
            headers,
        });
    }
}
