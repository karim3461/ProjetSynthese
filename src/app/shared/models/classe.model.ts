/**
 * Le model classe
 */
export class Classe {
	idCours: string;
	idTrimestre: string;
	idProfesseur: string;
	nbEtudiants: number;
	
	constructor() {
		this.idCours = '';
		this.idTrimestre = '';
		this.idProfesseur = '';
		this.nbEtudiants = 0;
	}
}
