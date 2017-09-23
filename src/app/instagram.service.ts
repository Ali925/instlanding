import { Injectable } from '@angular/core';
import { Headers, Http, Jsonp, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class InstagramService {
	
	static access_token = '';
	static user_id = '5618032245';
	static client_id = '837042c6f313480f98eeb9e270719fee';
	static nextMaxID = '';
	static redirectUri = window.location.origin + '/';
	
	constructor(private http: Http, private _jsonp: Jsonp) { 
		InstagramService.access_token = '';
	}
	
	getStatus(): Promise<any> {
		
		return this._jsonp.get('https://api.instagram.com/oauth/authorize')
      .toPromise()
      .then(response => response)
      .catch(error => error);
	}
	
	authUser(): any {
		console.log(InstagramService.redirectUri);
		console.log(window.location.hash.split("access_token"));
		if(window.location.hash.split("access_token").length == 1 && window.location.hash.split("access_token")[0] == '')
			window.location.href='https://api.instagram.com/oauth/authorize/?client_id=' + InstagramService.client_id + '&redirect_uri=' + InstagramService.redirectUri + '&response_type=token&scope=public_content+follower_list+relationships';
		else{
			InstagramService.access_token = window.location.hash.split("access_token")[1].substring(1);
			history.pushState({ foo: "bar" }, "page 2", "");
			return 'ok';
		}
	}

	isUserFollow(): Promise<any> {
		let params = new URLSearchParams();

    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');
		params.set('access_token', InstagramService.access_token);
		
		return this._jsonp.get('https://api.instagram.com/v1/users/' + InstagramService.user_id + '/relationship', { search: params })
      .toPromise()
      .then(response => response)
      .catch(error => error);
	}
	
	followUnfollow(action): Promise<any> {
		let header = new Headers();

    header.append('Content-Type', 'application/json');
		
		let url = 'https://api.instagram.com/v1/users/' + InstagramService.user_id + '/relationship' + '?access_token=' + InstagramService.access_token;
		
		let data = JSON.stringify({url: url, action: action});
		
		return this.http.post('http://localhost:5000/followUnfollow', data, {headers: header})
      .toPromise()
      .then(response => response)
      .catch(error => error);
	}

	setNextMaxID(max_id): void {
		InstagramService.nextMaxID = max_id;
	}
	
	getUserInfo(): Promise<any> {
		let params = new URLSearchParams();

    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');
		params.set('access_token', InstagramService.access_token);
		
		return this._jsonp.get('https://api.instagram.com/v1/users/' + InstagramService.user_id + '/', { search: params })
      .toPromise()
      .then(response => response)
      .catch(error => error);
	}
	
	getUserImages() : Promise<any> {
		let params = new URLSearchParams();

    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');
		params.set('access_token', InstagramService.access_token);
		params.set('count', '9');
		
		return this._jsonp.get('https://api.instagram.com/v1/users/' + InstagramService.user_id + '/media/recent/', { search: params })
      .toPromise()
      .then(response => response)
      .catch(error => error);
	}
	
	getNextImages(): Promise<any> {
		let params = new URLSearchParams();

    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');
		params.set('access_token', InstagramService.access_token);
		params.set('count', '9');
		params.set('max_id', InstagramService.nextMaxID);

		return this._jsonp.get('https://api.instagram.com/v1/users/' + InstagramService.user_id + '/media/recent/', { search: params })
      .toPromise()
      .then(response => response)
      .catch(error => error);
	}
	
	getLatestMedia(): Promise<any> {
		
		let params = new URLSearchParams();

    params.set('format', 'json');
		params.set('username', 'itselly.bitch');
    //params.set('callback', 'JSONP_CALLBACK');
		
		return this.http.get('http://localhost:5000/latestMedia', { search: params })
      .toPromise()
      .then(response => response)
      .catch(error => error);
	}
 
}
