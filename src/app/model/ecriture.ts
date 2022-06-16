import { LigneEcriture } from './LigneEcriture';
export class Ecriture {
id :number;
annee : number;
numecrt : number;
lig : number;
seq_ecrt : number;
numcompte : number;
num_piece : String;
codetier : String;
lib_tier : String;
date_ecrt: any;
libelle : String;
libellec : String;
totcred : number;
totdeb : number;
montant : number;
solde : number;
code : String;
sens : String;
taux : number;
code_JRN: number;
code_devise:String;
lecritures :Array<LigneEcriture> =[];

}