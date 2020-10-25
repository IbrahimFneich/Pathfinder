import { Component, OnInit,Input } from '@angular/core';
import { CloudService } from 'src/app/services/cloud.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {





  constructor(private cloudService:CloudService) { 

  }

  ngOnInit(): void {
    this.cloudService.currentMatrix.subscribe(matrix=> this.matrix = matrix);

    if(this.matrix[this.i][this.j]==-1){
      this.nodeClass="node node-start";
    }
    if(this.matrix[this.i][this.j]==-2){
      this.nodeClass="node node-finish";
    }
    
    if(this.matrix[this.i][this.j]==1){

        this.nodeClass="node node-visited";

    }
    
  }

  nodeClass:string='node';

  matrix:number[][];
  @Input() i:number;
  @Input() j:number;



  onClick(){


      console.log('('+this.i+','+this.j+')');
        
  }


}
