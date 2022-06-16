import { Exercice } from "./exercice";

export class User {
    id: number;
    code:number;
    username: string;
    role: string;
    email: string;
    password : string;  
    jwt : string;
  adresse:string;
   telephone:string;
   image:string;
   active:boolean;
  /* date_debut: any;
   date_fin: any;*/
   lexercices :Array<Exercice> =[];
   
}
