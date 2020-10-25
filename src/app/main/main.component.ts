import { Component, OnInit} from '@angular/core';
import { CloudService } from '../services/cloud.service'
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {



  constructor(private cloudService:CloudService) { 

  }

  ngOnInit(): void {
    this.cloudService.currentMatrix.subscribe(matrix=> this.matrix = matrix);
  }

  matrix:number[][];


  test(){
    

    
    setTimeout(() => {
      this.matrix[8][9]=1;
    }, 200);
    
    setTimeout(() => {
      this.matrix[9][9]=1;
    }, 300);
    
    setTimeout(() => {
      this.matrix[9][8]=1;
    }, 400);
    
    setTimeout(() => {
      this.matrix[9][7]=1;
    }, 500);
    
    setTimeout(() => {
      this.matrix[8][7]=1;
    }, 600);
    
    setTimeout(() => {
      this.matrix[7][7]=1;
    }, 700);
    
    setTimeout(() => {
      this.matrix[7][8]=1;
    }, 800);

    setTimeout(() => {
      this.matrix[7][9]=1;
    }, 800);
    
    this.cloudService.updateMatrix(this.matrix);

  }



}
