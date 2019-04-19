import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Cours, CoursTrimestre } from '../cours';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.scss']
})
export class CoursComponent implements OnInit {
	
	edit: boolean;
	programmes: any;
	coursForm = this.fb.group({
		nom: [],
		sigle: [],
		programmes: this.fb.array([]),
		trimestres: this.fb.array([])
	});
	error = {
		nom: "",
		sigle: "",
		programmes: "",
		trimestres: ""
	}
	texteSubmit = "Ajouter";
	listeSaisons = ["Hiver", "Été", "Automne"];
	
	cours: any;
	
	get nom() { return this.coursForm.get('nom'); }
	get sigle() { return this.coursForm.get('sigle'); }
	
	coursFromForm(){
		this.cours.nom = this.coursForm.value.nom;
		this.cours.sigle = this.coursForm.value.sigle;
		this.cours.programmes = [];
		
		var i = 0;
		
		for(let programme of this.coursForm.value.programmes){
			
			if (programme == true){
				this.cours.programmes.push(this.programmes[i].sigle);
			}
			i++;
		}
		
		this.cours.trimestres = [];
		
		for(let trimestre of this.coursForm.value.trimestres){
			var courTrimestre = new CoursTrimestre(trimestre.annee, trimestre.saison, trimestre.professeur, trimestre.nbEtudiants);
			this.cours.trimestres.push(courTrimestre);
		}
		
		//console.warn(JSON.stringify(this.cours));
	}
	
	coursToForm(){
		this.coursForm.controls.nom.setValue(this.cours.nom);
		this.coursForm.controls.sigle.setValue(this.cours.sigle);
		
		var i = 0;
		var valueProgrammes = [];
		
		for(let programme of this.programmes){
			valueProgrammes[i] = (this.cours.programmes.indexOf(programme.sigle) !== -1);
			i++;
		}
		
		this.coursForm.controls.programmes.setValue(valueProgrammes);
		
		//Programmes est géré par addCheckboxes()
		
		for(let trimestre of this.cours.trimestres){
			const courTrimestre = new FormGroup({
				annee: new FormControl(trimestre.annee),
				saison: new FormControl(trimestre.saison),
				professeur: new FormControl(trimestre.professeur),
				nbEtudiants: new FormControl(trimestre.nbEtudiants)
			});
			(this.coursForm.controls.trimestres as FormArray).push(courTrimestre);
		}
	}
	
	constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
		this.http.get('/api/programme').subscribe((data : any) => {
			this.programmes = data;
			this.addCheckboxes();
			
			if (this.route.snapshot.params['id'] != null){
				this.http.get('/api/cours/'+this.route.snapshot.params['id']).subscribe((data : any) => {
					this.cours = data;
					this.coursToForm();
					console.warn(this.cours);
					this.texteSubmit = "Modifier";
				});
			} else {
				this.cours = new Cours('', '', [], []);
				this.texteSubmit = "Ajouter";
			}
		});
	}
	
	addCheckboxes() {
		this.programmes.map((o, i) => {//this.cours.programmes.indexOf(o.sigle) !== -1
			const control = new FormControl();
			(this.coursForm.controls.programmes as FormArray).push(control);
		});
	}
	
	addTrimestre(){
		const controlTrimestre = new FormGroup({
			annee: new FormControl(''),
			saison: new FormControl(''),
			professeur: new FormControl(''),
			nbEtudiants: new FormControl('')
		});
		(this.coursForm.controls.trimestres as FormArray).push(controlTrimestre);
		
		//console.warn("Ajout trimestre au form. Count trimestres = " + (this.coursForm.controls.trimestres as FormArray).length);
	}
	
	removeTrimestre(i){
		(this.coursForm.controls.trimestres as FormArray).removeAt(i);
		
		//console.warn("Retiré un trimeste à l'index "+i);
	}
	
	ngOnInit() {
	
	}
	
	onSubmit(){
		//console.warn(this.coursForm.value);
		this.coursFromForm();
		//console.warn(this.cours);
		
		if (this.cours._id === undefined){//Ajouter une entité
			this.http.post('/api/cours/', this.cours)
			.subscribe(res => {
				this.router.navigate(['/']);
			}, (err) => {
				console.warn(err);
				this.errorHandling(err);
			});
		} else { //Modifier une entité
			this.http.put('/api/cours/'+this.cours._id, this.cours)
			.subscribe(res => {
				this.router.navigate(['/']);
			}, (err) => {
				console.warn(err);
				this.errorHandling(err);
			});
		}
	}
	
	errorHandling(err){
		this.error.sigle = "";
		if (err.error.message.indexOf("duplicate") != -1){//Error message contains duplicate
			this.error.sigle = "Ce sigle existe déjà dans la liste de cours.";
		}
	}
	
	supprimerCours(){
		this.http.delete('/api/cours/'+this.cours._id, this.cours)
		.subscribe(res => {
			this.router.navigate(['/']);
		}, (err) => {
			console.warn(err);
		});
	}
	
}