import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Cours, CoursTrimestre } from '../cours'
import { DOCUMENT } from '@angular/platform-browser';
import { WINDOW } from "../window.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	
	titre = {
		minAnnee: "",
		maxAnnee: "",
		minSaison: "",
		maxSaison: "",
	}
	maxAnnee: any;
	firstInitCours = false;
	cours: any;
	listeProgrammes: any;
	nomProgrammes: any;
	trimestresAnnee: any;
	trimestresSaisons = ["Hiver", "Été", "Automne"];
	trimestresCours: any;
	tableHeaderFixed: any;
	//TODO: Avoir une valeur permettant de mettre le width de la table trimestres correctement
	//TODO: Output des trimestres
	
	cour: any;

	searchForm = new FormGroup({
	  nom: new FormControl(''),
	  sigle: new FormControl(''),
	  programmes: new FormControl('')
	  //TODO: permettre la recherche par plusieurs programmes
	  //programmes: new FormArray([])
    });
	
	displayTrimestre = false;
	courTrimestreId: any;
	trimestreFormModifier: any;
	trimestreForm = new FormGroup({
	  annee: new FormControl(''),
	  saison: new FormControl(''),
	  professeur: new FormControl(''),
	  nbEtudiants: new FormControl(''),
    });

	constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, @Inject(DOCUMENT) private document: Document, @Inject(WINDOW) private window) { 
	    this.http.get('/api/programme').subscribe((data : any) => {
			this.listeProgrammes = data;
			
			//Ajout d'une entrée vide
			this.listeProgrammes.unshift({ nom: "", sigle: "" });
			
			//Populer la variable nomProgrammes
			this.nomProgrammes = [];
			for (let programme of this.listeProgrammes){
				this.nomProgrammes[programme.sigle] = programme.nom;
			}
			
			//console.warn(JSON.stringify(this.nomProgrammes));
			
			//TODO: permettre la recherche par plusieurs programmes
			
			this.initCours();
		});
	}
	
	initCours(){
		//Obtenir la liste de cours
		this.http.get('/api/cours').subscribe((data : any) => {
			
			this.cours = data;
			
			//console.warn("cours = "+JSON.stringify(this.cours));
			
			//Cette partie s'occupe du code relié au trimestre 
			//0: Déterminer les dimensions du display des trrimestres
			//1: populer trimestresHeader
			//2: populer trimestresCours
			var minYear = null;
			var minSaison = "";
			var maxYear = "2000";//Valeur par défaut pour prévenir des bogues
			var maxSaison = "";
			var listeTrimestres = [];
			var listeTrimestres_ = [];
			
			//Part 0
			for(let cour of this.cours){
				if(cour.trimestres){
					listeTrimestres_ = [];
					
					cour.listeTrimestres = {
						idCours: cour._id,
						nomCours: cour.nom,
						trimestre: [],
					};
					
					for(let trimestre of cour.trimestres){
						if (minYear === null || minYear > trimestre.annee){
							minYear = trimestre.annee;
							minSaison = trimestre.saison;
						}
						
						if (maxYear === null || maxYear < trimestre.annee){
							maxYear = trimestre.annee;
							maxSaison = trimestre.saison;
						}
						
						//structure trimestreCours: Object{Array de cours avec clé "Année" + "1ere lettre asison"}
						var cleListeTrimestres = trimestre.annee+trimestre.saison.charAt(0).toUpperCase();
						
						listeTrimestres_[cleListeTrimestres] = {estDonne: true, professeur: trimestre.professeur, nbEtudiants: trimestre.nbEtudiants};
						//console.warn("listeTrimestres_[cleListeTrimestres] = "+JSON.stringify(listeTrimestres_[cleListeTrimestres]));
					}
				
					//Part 2
					listeTrimestres[cour._id] = {
						idCours: cour._id,
						nomCours: cour.nom,
						trimestre: listeTrimestres_,
					};
					
					//console.warn("listeTrimestres[cour._id] "+JSON.stringify(listeTrimestres[cour._id]));
				} else {
					listeTrimestres[cour._id] = {
						idCours: cour._id,
						nomCours: cour.nom,
						trimestre: false,
					};
				}
				//console.warn("cour");
			}
			this.titre.minAnnee = minYear;
			this.titre.minSaison = minSaison;
			this.titre.maxAnnee = maxYear;
			this.titre.maxSaison = maxSaison;
			
			//console.warn("listeTrimestres = "+JSON.stringify(listeTrimestres));
			
			this.trimestresCours = listeTrimestres;
			
			//console.warn("minYear = "+minYear);
			//console.warn("maxYear = "+ maxYear);
			
			//Si premi're initialisation, faire comme normale, sinon utiliser l'année que l'utilisateur a de sélectionné
			//Prévient un bug qui reset la position de vision des trimestres à l'ajout/supprimer trimestre.
			if (!this.firstInitCours){
				this.firstInitCours = true;
				this.setTrimestresAnnee(maxYear);
			} else {
				this.setTrimestresAnnee(this.maxAnnee);
			}
		});
	}
	
	setTrimestresAnnee(maxYear){
		this.trimestresAnnee = [];
		this.maxAnnee = maxYear;
			
		//Plage d'affichage des trimestres: par défaut, l'année la plus récente + 4 années précédentes.
		for (var i = (maxYear-4);i <= maxYear; i++){
			//Part 1
			this.trimestresAnnee.push(i);
			for(var j = 0;j <= this.trimestresSaisons.length;j++){
				
			}
		}
	}
	
	ngOnInit() {
		
	}
	
	getNomProgramme(sigle){
		return this.nomProgrammes[sigle];
	}
	
	estDonne(trimestres, annee, saison){
		//J'ai pas été capable de convertir cette valeur directement en boolean, ceci fonctionne pour maintenant
		if (trimestres.trimestre[annee+saison.charAt(0).toUpperCase()]){
			return true;
		}
		return false;
	}
	
	//TODO: permettre la recherche par plusieurs programmes
	/*
	addCheckboxes() {
      this.listeProgrammes.map((o, i) => {
        const control = new FormControl(false); // if first item set to true, else false
        (this.searchForm.controls.programmes as FormArray).push(control);
      });
    }
	*/
	
	search(){
		//TODO: permettre la recherche par plusieurs programmes
		
		/*
		//le HTML pour plusieurs programmes
		//<div class="col-sm-12 main-table-search-programmes">
		//	Programmes: 
		//	<div class="row">
		//		<label formArrayName="programmes" *ngFor="let programme of searchForm.controls.programmes.controls; let i = index" class="col-sm-3">
		//
		//			<input type="checkbox" [formControlName]="i" value="{{listeProgrammes[i].sigle}}">
		//			{{listeProgrammes[i].nom}}
		//		</label>
		//	</div>
		//</div>
		
		var courSearch = new Cours(this.searchForm.value.nom, this.searchForm.value.sigle, [], []);
		
		var i = 0;
		
		for(let programme of this.searchForm.value.programmes){
			
			if (programme == true){
				courSearch.programmes.push(this.listeProgrammes[i].sigle);
			}
			i++;
		}*/
		
		/*this.http.get('/api/cours/recherche/'+this.searchForm.value.nom+'/'+this.searchForm.value.sigle+'/'+this.searchForm.value.programme).subscribe((data : any) => {
			this.cours = data;
			console.warn(JSON.stringify(data));
			console.warn("Search done.");
		});*/
		
		//console.warn(JSON.stringify(this.searchForm.value));
		
		this.http.post('/api/cours/recherche', this.searchForm.value).subscribe((data : any) => {
			this.cours = data;
			console.warn(JSON.stringify(data));
		});
	}
	
	showFormTrimestre(id, annee, saison){
		this.courTrimestreId = id;
		this.trimestreForm.controls.annee.setValue(annee);
		this.trimestreForm.controls.saison.setValue(saison);
		this.trimestreForm.controls.professeur.setValue("");
		this.trimestreForm.controls.nbEtudiants.setValue("");
		this.trimestreFormModifier = false;
		this.displayTrimestre = true;
	}
	
	showFormTrimestreModify(id, annee, saison, trimestre){
		this.showFormTrimestre(id, annee, saison);
		this.trimestreFormModifier = true;
		this.trimestreForm.controls.professeur.setValue(trimestre.professeur);
		this.trimestreForm.controls.nbEtudiants.setValue(trimestre.nbEtudiants);
	}
	
	getTrimestreDisplayed(trimestres, annee, saison){
		return trimestres.trimestre[annee+saison.charAt(0).toUpperCase()];
	}
	
	hideFormTrimestre(){
		this.displayTrimestre = false;
	}
	
	retirerTrimestre(refresh){
		this.http.get('/api/cours/'+this.courTrimestreId).subscribe((data : any) => {
			var i = 0;
			//1: Trouver le bon trimestre
			for (let trimestre of data.trimestres){
				if (trimestre.annee === this.trimestreForm.value.annee && trimestre.saison === this.trimestreForm.value.saison){
					data.trimestres.splice(i, 1);
				}
				i++;
			}
			
			this.http.put('/api/cours/'+data._id, data)
			.subscribe(res => {
				if(refresh){
					this.initCours();
				}
				this.displayTrimestre = false;
			}, (err) => {
				//console.warn(err);
				this.displayTrimestre = false;
			});
		});
	}
	
	addTrimestre(){
		//console.warn("id = " + this.courTrimestreId);
		
		var trimestre = new CoursTrimestre(this.trimestreForm.value.annee, this.trimestreForm.value.saison, this.trimestreForm.value.professeur, this.trimestreForm.value.nbEtudiants);
		
		if (this.trimestreFormModifier){//Trimestre existe, on le retire avant de le rajouter pour ne pas avoir de dupliqués
			this.retirerTrimestre(false);
		}
		
		this.http.get('/api/cours/'+this.courTrimestreId).subscribe((data : any) => {
			data.trimestres.push(trimestre);
			this.http.put('/api/cours/'+data._id, data)
			.subscribe(res => {
				this.initCours();
				this.displayTrimestre = false;
			}, (err) => {
				//console.warn(err);
				this.displayTrimestre = false;
			});
		});
	}
	
	//window.onScroll
	@HostListener("window:scroll", [])
	onWindowScroll() {
		let scrollY = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
		//console.warn(scrollY);
		if (scrollY > 575) {
			this.tableHeaderFixed = true;
		} else if (this.tableHeaderFixed && scrollY < 555) {
			this.tableHeaderFixed = false;
		}
	}
}