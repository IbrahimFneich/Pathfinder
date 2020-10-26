import { Component, OnInit,QueryList,ViewChild,ViewChildren} from '@angular/core';
import { element } from 'protractor';
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

  test(){
    this.startNode= this.matrix[13][15];
    this.finishNode = this.matrix[13][55];
    var dij= dijkstra(this.matrix,this.startNode,this.finishNode);
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
    
    
    
  }

  reset(){
    this.animatePath=false;
    this.matrix = this.cloudService.InitializeMatrix();
    this.cloudService.updateMatrix(this.matrix);
    CloudService.index=1;
  }


}
