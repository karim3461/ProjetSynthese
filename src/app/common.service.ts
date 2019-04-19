import { Injectable } from '@angular/core';
import {Http,Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class CommonService {
	
	private localhostPort: Number = 4040;
	
	constructor(private http: Http) { }
	
	//Cours
	saveUser(user){
		return this.http.post('http://localhost:'+this.localhostPort+'/api/editCours/', user)
			.map((response: Response) =>response.json());
	}
	
	GetUser(){
		return this.http.get('http://localhost:'+this.localhostPort+'/api/getCours/')
			.map((response: Response) => response.json());
	}
	deleteUser(id){
		return this.http.post('http://localhost:'+this.localhostPort+'/api/deleteCours/', {'id': id})
			.map((response: Response) =>response.json());
	}

}  