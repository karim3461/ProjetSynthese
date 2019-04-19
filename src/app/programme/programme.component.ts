import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-programme',
  templateUrl: './programme.component.html',
  styleUrls: ['./programme.component.scss']
})

export class ProgrammeComponent implements OnInit {
	
	programmes: any;
	
	constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }
	
	ngOnInit() {
		this.getProgrammes();
	}
	
	getProgrammes() {
		this.http.get('/api/programme').subscribe((data : any) => {
			this.programmes = data;
		});
	}
	
	supprimerProgramme(id) {
		this.http.delete('/api/programme/'+id)
		.subscribe(res => {
			this.getProgrammes();
		}, (err) => {
			console.log(err);
		});
	}
	
}  
