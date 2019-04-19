import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modifier-programme',
  templateUrl: './modifier-programme.component.html',
  styleUrls: ['./modifier-programme.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModifierProgrammeComponent implements OnInit {

  programme = {};

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getProgramme(this.route.snapshot.params['id']);
  }

  getProgramme(id) {
    this.http.get('/api/programme/'+id).subscribe(data => {
      this.programme = data;
    });
  }

  updateProgramme(id, data) {
	console.warn(JSON.stringify(data));
    this.http.put('/api/programme/'+id, data)
      .subscribe(res => {
          this.router.navigate(['/programme']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}