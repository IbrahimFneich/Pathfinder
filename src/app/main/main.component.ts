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
    
    
  }

  matrix:INode[][];
  animatePath:boolean;
  dij:INode[];



  test(){

    var dij= dijkstra(this.matrix,this.matrix[8][8],this.matrix[8][42]);
    if(CloudService.visitedPath==null){
      CloudService.visitedPath=dij;
      console.log("HERE");
      
    }

    for (let i = 0; i < dij.length; i++) {
      this.matrix[dij[i].row][dij[i].col].isVisited=true;
      this.cloudService.updateMatrix(this.matrix);
    }

    var path = getNodesInShortestPathOrder(this.matrix[8][42]);
    console.log(path);
    this.animatePath=true

    for (let i = 0; i < dij.length; i++) {
      var child = this.children.find((element,index)=>element.i==dij[i].row && element.j == dij[i].col);
      child.child(dij[i].row,dij[i].col);
    }
    
    
    
  }


}
