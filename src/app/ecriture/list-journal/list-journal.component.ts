import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ecriture } from 'src/app/model/ecriture';
import { EcritureService } from 'src/app/service/ecriture.service';
import { UserService } from 'src/app/service/user.service';
import { AddEcrtComponent } from '../add-ecrt/add-ecrt.component';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { LigneEcriture } from 'src/app/model/LigneEcriture';
pdfMake.vfs=pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-list-journal',
  templateUrl: './list-journal.component.html',
  styleUrls: ['./list-journal.component.scss']
})
export class ListJournalComponent implements OnInit {
  Liste;
  term:any;
  name="";
  SearchText :string;
  p: number = 1;
  ecriture: Ecriture;

  constructor( private service :EcritureService,private router:Router,public userService: UserService,
    private toastr :ToastrService,public fb: FormBuilder,
    private datePipe : DatePipe,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddEcrtComponent>,) { }

  ngOnInit() {
    this.name = localStorage.getItem('name');
    this.refreshListe();
    
  }
  
  logout(){
    localStorage.removeItem('name');
    this.userService.islogin = false;
    this.router.navigate(['/login'])
    
  }
refreshListe(){
  this.service.getAll().subscribe(
    response =>{this.Liste = response;}
   );

}

  openForEdit(Id:number){
   this.router.navigate(['/commandes/modification/'+Id]);
  }

  removeData(id: number) {
    
  }

  onDelete(id:number){
  
    if(window.confirm('Etes vous sur de supprimer cette écriture ?')){
      this.service.deleteAll(id).subscribe(
        data=>{
          console.log(data);
          this.toastr.success('ecriture supprimée avec succès!')
          this.refreshListe();
        },
        error=> console.log(error));  
    }
}

selectData(item :Ecriture){
 /* this.service.formData = this.fb.group(Object.assign({},item));
  
  this.router.navigate(['/ecriture']);*/
  this.service.choixmenu =2 ;
  this.service.formData= this.fb.group(Object.assign({},item));
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.disableClose = true;
  dialogConfig.width="50%";
  
  this.matDialog.open(AddEcrtComponent, dialogConfig);
}


DetailsData(ecriture){
  this.service.setter(ecriture);
  this.router.navigate(['/details-ecrt']);
}

transformDate(date){
  return this.datePipe.transform(date, 'yyyy-MM-dd');
}



generatePdf(ecriture){
  this.service.setter(ecriture);
  const document =this.service.getDocument(ecriture.numecrt);
  pdfMake.createPdf(document).open();
}















}










