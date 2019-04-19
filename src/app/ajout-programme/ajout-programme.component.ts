import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ajout-programme',
  templateUrl: './ajout-programme.component.html',
  styleUrls: ['./ajout-programme.component.scss']
})
export class AjoutProgrammeComponent implements OnInit {

  programme = {};

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  saveProgramme() {
	this.http.post('/api/programme', this.programme)
    .subscribe(res => {
      this.router.navigate(['/programme']);
    }, (err) => {
      console.log(err);
    });
  }


}
