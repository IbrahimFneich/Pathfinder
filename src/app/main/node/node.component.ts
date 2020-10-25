import { Component, OnInit,Input,OnChanges, SimpleChanges } from '@angular/core';
import { CloudService } from 'src/app/services/cloud.service';
import { INode } from 'src/app/services/INode';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit ,OnChanges{

  nodeClass:string='node';

  matrix:INode[][];

  @Input() i:number;
  @Input() j:number;
  @Input() animatePath:boolean;


  constructor(private cloudService:CloudService) { 

  }


  ngOnInit(): void {
    this.cloudService.currentMatrix.subscribe((matrix: INode[][])=> this.matrix = matrix);
    
    if(this.matrix[this.i][this.j].isStart){
      this.nodeClass="node node-start";
    }
    if(this.matrix[this.i][this.j].isFinish){
      this.nodeClass="node node-finish";
    }
    //console.log(this.changed);

    


    
    
    
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(this.animatePath){
      //console.log(CloudService.visitedPath[0]);
      



          if(this.matrix[this.i][this.j].isVisited && !(this.matrix[this.i][this.j].isStart || this.matrix[this.i][this.j].isFinish) ){
            //console.log("HERE");
            
            setTimeout(() => {
              this.nodeClass="node node-visited";
            }, 10 * CloudService.index++);
    
      
          }
    
          if(this.matrix[this.i][this.j].isPath && !(this.matrix[this.i][this.j].isStart || this.matrix[this.i][this.j].isFinish) ){
            setTimeout(() => {
              this.nodeClass="node node-path";
            }, 10 * CloudService.index++);
          }

        




    }
    

  }

  onClick(){


      //console.log('('+this.i+','+this.j+')');
      console.log(this.matrix[this.i][this.j]);
      
  }


  child(row:number,col:number){
    if(this.i == row && this.j == col){
      console.log(row+','+col);
      this.nodeClass="node node-visited";
    }

    
  }



}
