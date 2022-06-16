import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ecriture } from 'src/app/model/ecriture';
import { EcritureService } from 'src/app/service/ecriture.service';
import { GrandlivService } from 'src/app/service/grandliv.service';
import { UserService } from 'src/app/service/user.service';
import { AddEcrtComponent } from '../add-ecrt/add-ecrt.component';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { JournalService } from 'src/app/service/journal.service';
pdfMake.vfs=pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-jrncomptable',
  templateUrl: './jrncomptable.component.html',
  styleUrls: ['./jrncomptable.component.scss']
})
export class JrncomptableComponent implements OnInit {

  Liste;
  term:any;
  name="";
  SearchText :string;
  p: number = 1;
  ecriture: Ecriture;

  constructor( private service :EcritureService,private router:Router,public userService: UserService,
    private toastr :ToastrService,public fb: FormBuilder,public grandliv : GrandlivService,
    private datePipe : DatePipe,public jrn :JournalService,
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
  

    if(window.confirm('Etes vous sur de supprimer cette ecriture ?')){
      this.service.deleteAll(id).subscribe(
        data=>{
          console.log(data);
          this.toastr.warning('ecriture supprimée avec succès!')
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



generatePdf(){
 
  const document =this.jrn.getDocument();
  pdfMake.createPdf(document).open();
}

}

