import { Component, OnInit } from '@angular/core';
import { Item } from "../../models/item"
import {ItemService} from "../../services/item.service"

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items : Item[] = [];

  total:number = 0

  constructor(
    private itemService : ItemService
  ) { }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(data => {
      this.items = data
      this.getTotal()
    })
  }

  deleteItem(item:Item){
    this.items = this.items.filter(e => e.id !== item.id)
    this.itemService.deleteItem(item).subscribe(data=> console.log(data))
    this.getTotal()
  }

  toggleItem(item:Item){
    this.itemService.toggleItem(item).subscribe()
    this.getTotal()
  }

  getTotal(){
    this.total = this.items
                  .filter(e => e.completed == false)
                  .map(e => e.quantity * e.price)
                  .reduce((acc,e) => acc += e,0)
  }

}
