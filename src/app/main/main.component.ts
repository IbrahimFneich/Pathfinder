import { Component, OnInit,QueryList,ViewChild,ViewChildren} from '@angular/core';
import { element } from 'protractor';
import { basicRandom } from '../services/basicRandom';
import { CloudService } from '../services/cloud.service'
import { dijkstra, getNodesInShortestPathOrder } from '../services/dijkstra';
import { INode } from '../services/INode';
import { resetMatrix } from '../services/resetMatrix';
import { wallsRandom } from '../services/wallsRandom';
import { NodeComponent } from './node/node.component';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  @ViewChildren(NodeComponent) children:QueryList<NodeComponent>;

  constructor(private cloudService:CloudService) { 
    
  }

  ngOnInit(): void {
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
    if(CloudService.isPathFound){
      this.clearVisited();

    }
    console.log("HERE -1");
    //document.getElementById("dijkstra").setAttribute('disabled','disabled');
    //document.getElementById("basicRandom").setAttribute('disabled','disabled');
    //document.getElementById("reset").setAttribute('disabled','disabled');
    //document.getElementById("clearWalls").setAttribute('disabled','disabled');


    
    
    console.log("HERE 0");
    this.startNode= this.matrix[CloudService.startRow][CloudService.startCol];
    this.finishNode = this.matrix[CloudService.finishRow][CloudService.finishCol];
    var dij:INode[]= dijkstra(this.matrix,this.startNode,this.finishNode);

    
    
    
    console.log("HERE 1");

    //console.log("DIJ : "+dij);
    

    if(CloudService.visitedPath==null){
      CloudService.visitedPath=dij;
      //console.log("HERE");
      
    }
    console.log("HERE 2");
    for (let i = 0; i < dij.length; i++) {
      this.matrix[dij[i].row][dij[i].col].isVisited=true;
    }

    console.log("HERE 3");
    var path = getNodesInShortestPathOrder(this.finishNode);

    this.cloudService.updateMatrix(this.matrix);


    //console.log(path);
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
      //document.getElementById("basicRandom").removeAttribute('disabled');
      //document.getElementById("reset").removeAttribute('disabled');
      //document.getElementById("clearWalls").removeAttribute('disabled');
      this.isRunning=false;
      CloudService.isRunning=false;
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
    CloudService.index=1;
  }

  clearVisited(){
    

    for (let row = 0; row < 25; row++) {
      for (let col = 0; col < 70; col++) {
        var isStartOrFinish = (this.matrix[row][col].isStart || this.matrix[row][col].isFinish);
        if (this.matrix[row][col].isVisited && !isStartOrFinish) {
          var child = this.children.find((element,index)=>element.i==row && element.j == col );
          child.clearVisited(row,col);
          this.matrix[row][col].isVisited=false;
          this.matrix[row][col].isPath=false;
          this.matrix[row][col].distance=Number.MAX_VALUE;
        }
      }
    }
    this.cloudService.updateMatrix(this.matrix);
    CloudService.index=1;
  }

  isDijkstraDone:boolean=false;




  basicRandom(){

    this.startNode= this.matrix[CloudService.startRow][CloudService.startCol];
    this.finishNode = this.matrix[CloudService.finishRow][CloudService.finishCol];
    
    this.clearWalls();
    //if(!this.isDijkstraDone){
    //  var dij = dij= dijkstra(this.matrix,this.startNode,this.finishNode);
    //  this.isDijkstraDone=true;
    //}
    
    var walls = basicRandom(this.matrix,this.startNode,this.finishNode);
    
    
    
    //var path= getNodesInShortestPathOrder(this.finishNode);
    
    
    //var walls  = basicRandom(this.matrix,this.startNode,this.finishNode,dij);

    //console.log("WALLS : "+walls);

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
    CloudService.index=1;
    

    
    //var dij= dijkstra(this.matrix,this.startNode,this.finishNode);
  }

  wallsRandom(){
    this.startNode= this.matrix[CloudService.startRow][CloudService.startCol];
    this.finishNode = this.matrix[CloudService.finishRow][CloudService.finishCol];


    this.clearVisited();
    this.clearWalls();
    var walls = wallsRandom(this.matrix,this.startNode,this.finishNode);

    for (let index = 0; index < walls.length; index++) {
      this.matrix[walls[index].row][walls[index].col]=walls[index];
      this.cloudService.updateMatrix(this.matrix);
    }
    //this.cloudService.updateMatrix(this.matrix);
    

    //visualize walls
    
    for (let i = 0; i < walls.length; i++) {
      var child = this.children.find((element,index)=>element.i==walls[i].row && element.j == walls[i].col );
      child.walls(walls[i].row,walls[i].col);
      
    }
    CloudService.index=1;
  }

}
