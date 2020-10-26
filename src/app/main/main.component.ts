import { Component, OnInit,QueryList,ViewChild,ViewChildren} from '@angular/core';
import { element } from 'protractor';
import { basicRandom } from '../services/basicRandom';
import { CloudService } from '../services/cloud.service'
import { dijkstra, getNodesInShortestPathOrder } from '../services/dijkstra';
import { INode } from '../services/INode';
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
    this.startNode= this.matrix[13][15];
    this.finishNode = this.matrix[13][55];
  }

  matrix:INode[][];
  animatePath:boolean;
  dij:INode[];
  startNode:INode ;
  finishNode:INode;

  Dijkstra(){
    document.getElementById("dijkstra").setAttribute('disabled','disabled');
    document.getElementById("random").setAttribute('disabled','disabled');
    document.getElementById("reset").setAttribute('disabled','disabled');
    document.getElementById("clearWalls").setAttribute('disabled','disabled');

    this.startNode= this.matrix[13][15];
    this.finishNode = this.matrix[13][55];
    var dij= dijkstra(this.matrix,this.startNode,this.finishNode);

    //console.log("DIJ : "+dij);
    

    if(CloudService.visitedPath==null){
      CloudService.visitedPath=dij;
      //console.log("HERE");
      
    }

    for (let i = 0; i < dij.length; i++) {
      this.matrix[dij[i].row][dij[i].col].isVisited=true;
      this.cloudService.updateMatrix(this.matrix);
    }

    var path = getNodesInShortestPathOrder(this.finishNode);
    //console.log(path);
    this.animatePath=true

    //show visited
    for (let i = 0; i < dij.length; i++) {
      var child = this.children.find((element,index)=>element.i==dij[i].row && element.j == dij[i].col );
      child.child(dij[i].row,dij[i].col);
    }

    //show path
    for (let i = 0; i < path.length; i++) {
      var child = this.children.find((element,index)=>element.i==path[i].row && element.j == path[i].col );
      child.path(path[i].row,path[i].col);
      
    }

    setTimeout(() => {
      document.getElementById("dijkstra").removeAttribute('disabled');
      document.getElementById("random").removeAttribute('disabled');
      document.getElementById("reset").removeAttribute('disabled');
      document.getElementById("clearWalls").removeAttribute('disabled');
    },1.1 * CloudService.index);

  }

  reset(){
    this.animatePath=false;
    this.matrix = this.cloudService.InitializeMatrix();
    this.cloudService.updateMatrix(this.matrix);
    CloudService.index=1;
  }

  clearWalls(){
    for (let row = 0; row < 25; row++) {
      for (let col = 0; col < 70; col++) {
        
        var child = this.children.find((element,index)=>element.i==row && element.j == col );
        child.clearWalls(row,col);
        this.matrix[row][col].isWall=false;
      }
    }
    this.cloudService.updateMatrix(this.matrix);
    CloudService.index=1;
  }

  isDijkstraDone:boolean=false;




  random(){

    this.startNode= this.matrix[13][15];
    this.finishNode = this.matrix[13][55];
    
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

}
