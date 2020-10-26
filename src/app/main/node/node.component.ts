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
  TIME:number=1;
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


    

  }

  onClick(){


      //console.log('('+this.i+','+this.j+')');
      console.log(this.matrix[this.i][this.j]);
      


  }


  child(row:number,col:number){
    var isStartOrFinish = (this.matrix[row][col].isStart || this.matrix[row][col].isFinish);
    if(this.i == row && this.j == col && !isStartOrFinish){
      //console.log(row+','+col);
      setTimeout(() => {
        this.nodeClass="node node-visited";
      }, this.TIME * CloudService.index++);
    }

    
  }

  path(row:number,col:number){
    var isStartOrFinish = (this.matrix[row][col].isStart || this.matrix[row][col].isFinish);

    if(this.i == row && this.j == col && this.matrix[this.i][this.j].isPath && !isStartOrFinish ){
      setTimeout(() => {
        this.nodeClass="node node-path";
      }, this.TIME * CloudService.index++);
       
    }
    if(this.matrix[row][col].isFinish){
      setTimeout(() => {
        CloudService.isDone=true;
        console.log("GERER");
        
      }, this.TIME * CloudService.index++);
      
    } 
    

  }

  walls(row:number,col:number){
    var isStartOrFinish = (this.matrix[row][col].isStart || this.matrix[row][col].isFinish);

    if(this.i == row && this.j == col && this.matrix[this.i][this.j].isWall && !isStartOrFinish ){
      setTimeout(() => {
        this.nodeClass="node node-wall";
      }, this.TIME * CloudService.index++);
    }

  }

  clearWalls(row:number,col:number){
    var isStartOrFinish = (this.matrix[row][col].isStart || this.matrix[row][col].isFinish);

    if(this.i == row && this.j == col && this.matrix[this.i][this.j].isWall && !isStartOrFinish ){
      setTimeout(() => {
        this.nodeClass="node";
      }, 0.5 * CloudService.index++);
    }

  }

  isDown:boolean=false;




  mouseDown(){
    console.log("down");
    
    var isStartOrFinish = (this.matrix[this.i][this.j].isStart || this.matrix[this.i][this.j].isFinish);
    var isWall = this.matrix[this.i][this.j].isWall;

    CloudService.clicked=true;
    
    if(!isStartOrFinish){
        if(isWall){
          this.matrix[this.i][this.j].isWall=false;
          this.cloudService.updateMatrix(this.matrix);
          this.nodeClass="node ";
        }
        else{
          this.matrix[this.i][this.j].isWall=true;
          this.cloudService.updateMatrix(this.matrix);
          this.nodeClass="node node-wall";
        }
        
      }

  }

  mouseOver(){
    console.log("over : "+CloudService.clicked);
    var isStartOrFinish = (this.matrix[this.i][this.j].isStart || this.matrix[this.i][this.j].isFinish);
    var isWall = this.matrix[this.i][this.j].isWall;
    if(CloudService.clicked){
      if(!isStartOrFinish){
        if(isWall){
          this.matrix[this.i][this.j].isWall=false;
          this.cloudService.updateMatrix(this.matrix);
          this.nodeClass="node ";
        }
        else{
          this.matrix[this.i][this.j].isWall=true;
          this.cloudService.updateMatrix(this.matrix);
          this.nodeClass="node node-wall";
        }
        
      }
    }
  }

  mouseUp(){
      console.log("up");
      var isStartOrFinish = (this.matrix[this.i][this.j].isStart || this.matrix[this.i][this.j].isFinish);
      
      if(!isStartOrFinish){
        this.matrix[this.i][this.j].isWall=true;
        this.cloudService.updateMatrix(this.matrix);
        this.nodeClass="node node-wall";
      }
      
      CloudService.clicked=false;
    
  }

}
