export class CoursTrimestre {
	constructor(
        public annee: number,
        public saison: string,
        public professeur?: string,
		public nbEtudiants?: number
    ) {  }
}

export class Cours {
	constructor(
        public nom: string,
        public sigle: string,
        public programmes: string[],
		public trimestres: CoursTrimestre[],
		public _id?: string
    ) {  }
}
