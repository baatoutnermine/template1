import { Component, OnInit } from '@angular/core';
import { Product } from 'src/products';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  mesProduit= new Product()
  mesProduitf:Product[]=[];
set text(a:number){
    this.mesProduitf=this.filter(a)
  }
filter(a:number){
    return this.mesProduit['filter']((x: { prix: number[]; })=>x.prix.indexOf(a)!=-1)
  }
}
