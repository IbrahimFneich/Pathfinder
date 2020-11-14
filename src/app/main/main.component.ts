import { Component, OnInit,QueryList,ViewChild,ViewChildren} from '@angular/core';
import { element } from 'protractor';
import { basicRandom } from '../services/basicRandom';
import { CloudService } from '../services/cloud.service'
import { dijkstra, getNodesInShortestPathOrder } from '../services/dijkstra';
import { INode } from '../services/INode';
import { resetMatrix } from '../services/resetMatrix';
import { wallsRandom } from '../services/wallsRandom';
import { NodeComponent } from './node/node.component';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  @ViewChildren(NodeComponent) children:QueryList<NodeComponent>;

  constructor(private cloudService:CloudService,
    private _snackBar: MatSnackBar) { 
    
  }
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  openSnackBar(duration:number) {
    this._snackBar.openFromComponent(PizzaPartyComponent, {
      duration: duration * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  ngOnInit(): void {
    this.setUpMatrix();
  }

  setUpMatrix(){
    this.cloudService.currentMatrix.subscribe(matrix=> this.matrix = matrix);
    this.startNode= this.matrix[CloudService.startRow][CloudService.startCol];
    this.finishNode = this.matrix[CloudService.finishRow][CloudService.finishCol];
  }

  matrix:INode[][];
  animatePath:boolean;
  dij:INode[];
  startNode:INode ;
  finishNode:INode;

  isRunning:boolean=false;

  Dijkstra(){
    this.isRunning=true;
    CloudService.isRunning=true;
    this.setUpMatrix();

    if(CloudService.isPathFound){
      
      var deletePath = getNodesInShortestPathOrder(this.finishNode);
      for (let i = 0; i < deletePath.length; i++) {
        this.matrix[deletePath[i].row][deletePath[i].col].isPath=false;
        this.matrix[deletePath[i].row][deletePath[i].col].isVisited=false;
        //this.matrix[deletePath[i].row][deletePath[i].col].previousNode=null;
      }
      this.clearVisited();
      this.cloudService.updateMatrix(this.matrix);
      this.setUpMatrix();
    }
    console.log("HERE -1");


    console.log("IS START ??? :"+this.matrix[CloudService.startRow][CloudService.startCol].isStart);
    

    
    
    console.log("HERE 0");
    this.startNode= this.matrix[CloudService.startRow][CloudService.startCol];
    this.finishNode = this.matrix[CloudService.finishRow][CloudService.finishCol];

    console.log("START : ("+this.startNode.row+","+this.startNode.col+")");
    

    var dij:INode[]= dijkstra(this.matrix,this.startNode,this.finishNode);



    
    
    
    console.log("HERE 1");

    //console.log("DIJ : "+dij);
    

    if(CloudService.visitedPath==null){
      CloudService.visitedPath=dij;
      //console.log("HERE");
      
    }
    console.log("HERE 2");
    for (let i = 0; i < dij.length; i++) {
      this.matrix[dij[i].row][dij[i].col]=dij[i];
    }
    this.cloudService.updateMatrix(this.matrix);
    this.setUpMatrix();

    console.log("HERE 3");
    var path = getNodesInShortestPathOrder(this.finishNode);

    this.cloudService.updateMatrix(this.matrix);
    this.setUpMatrix();


    ///////////////////////////////////////////////console.log(path);
    this.animatePath=true
    console.log("HERE 4");
    //show visited
    for (let i = 0; i < dij.length; i++) {
      var child = this.children.find((element,index)=>element.i==dij[i].row && element.j == dij[i].col );
      child.child(dij[i].row,dij[i].col);
    }
    console.log("HERE 5");
    //show path
    for (let i = 0; i < path.length; i++) {
      var child = this.children.find((element,index)=>element.i==path[i].row && element.j == path[i].col );
      child.path(path[i].row,path[i].col);
      
    }
    console.log("HERE 6");

    
    setTimeout(() => {
      this.isRunning=false;
      CloudService.isRunning=false;
      //if stuck
      if(!dij[dij.length-1].isFinish){
        this.openSnackBar(3);
      }
    },1.1 * CloudService.index);
    console.log("HERE 7");

    CloudService.isPathFound=true;


  }

  reset(){
    //this.animatePath=false;
    //this.matrix = this.cloudService.InitializeMatrix();
    //this.cloudService.updateMatrix(this.matrix);
    //CloudService.index=1;
    
    //document.getElementById("dijkstra").removeAttribute('disabled');
    
    location.reload();

  }

  clearWalls(){

    for (let row = 0; row < 25; row++) {
      for (let col = 0; col < 70; col++) {
        
        var child = this.children.find((element,index)=>element.i==row && element.j == col );
        child.clearWalls(row,col);
        this.matrix[row][col].isWall=false;
        this.matrix[row][col].previousNode=null;
        this.matrix[row][col].distance=Number.MAX_VALUE;
      }
    }
    this.cloudService.updateMatrix(this.matrix);
    this.setUpMatrix();


    CloudService.index=1;
  }

  clearVisited(){
    

    for (let row = 0; row < 25; row++) {
      for (let col = 0; col < 70; col++) {
        var isStartOrFinish = (this.matrix[row][col].isStart || this.matrix[row][col].isFinish);
        var isWall = this.matrix[row][col].isWall;
        var child = this.children.find((element,index)=>element.i==row && element.j == col );
        if(!isWall){
          child.clearVisited(row,col);
          this.matrix[row][col].isVisited=false;
          this.matrix[row][col].distance=Number.MAX_VALUE;
          this.matrix[row][col].isPath=false;
          this.matrix[row][col].previousNode=null;
        }
          
          
          
        
      }
    }
    this.setUpMatrix();
    this.cloudService.updateMatrix(this.matrix);
    
    CloudService.index=1;
    console.log("CLEAR VISITED KHOLSIT");
    
  }



  isDijkstraDone:boolean=false;




  basicRandom(){
    CloudService.isRunning=true;
    this.isRunning=true;

    this.startNode= this.matrix[CloudService.startRow][CloudService.startCol];
    this.finishNode = this.matrix[CloudService.finishRow][CloudService.finishCol];
    
    this.clearWalls();
    this.clearVisited();

    var walls = basicRandom(this.matrix,this.startNode,this.finishNode);
    
    


    //update walls in matrix
    for (let index = 0; index < walls.length; index++) {
      this.matrix[walls[index].row][walls[index].col]=walls[index];
      
    }
    this.cloudService.updateMatrix(this.matrix);
    

    //visualize walls 
    for (let i = 0; i < walls.length; i++) {
      var child = this.children.find((element,index)=>element.i==walls[i].row && element.j == walls[i].col );
      child.walls(walls[i].row,walls[i].col);
      
    }


    setTimeout(() => {
      this.isRunning=false;
      CloudService.isRunning=false;
    },1.1 * CloudService.index);

    CloudService.index=1;

  }

  wallsRandom(){
    CloudService.isRunning=true;
    this.isRunning=true;

    this.startNode= this.matrix[CloudService.startRow][CloudService.startCol];
    this.finishNode = this.matrix[CloudService.finishRow][CloudService.finishCol];

    if(CloudService.isPathFound){
      this.clearVisited();
      this.clearWalls();
    }

    //get Walls
    var walls = wallsRandom(this.matrix,this.startNode,this.finishNode);

    //update walls in matrix
    for (let index = 0; index < walls.length; index++) {
      this.matrix[walls[index].row][walls[index].col]=walls[index];
    }
    this.cloudService.updateMatrix(this.matrix);
    this.setUpMatrix();

    //visualize walls
    for (let i = 0; i < walls.length; i++) {
      var child = this.children.find((element,index)=>element.i==walls[i].row && element.j == walls[i].col );
      child.walls(walls[i].row,walls[i].col);
      
    }

    setTimeout(() => {
      this.isRunning=false;
      CloudService.isRunning=false;
    },1.1 * CloudService.index);

    CloudService.index=1;
  }

}



//Snack Bar
@Component({
  selector: 'snack-bar-component-example-snack',
  template: `
    <span class="example-pizza-party">
        🛑🛑Stuck!🛑🛑
    </span>`,
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class PizzaPartyComponent {}