import { Component, OnInit } from '@angular/core';
import { Product } from 'src/products';
import { ProduitService } from '../services/produit.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 //produit =products;
  produit:Product[]=[]
  mesProduitf:Product[]=[];
  constructor(private service :ProduitService  , private snackBar: MatSnackBar){}
  public getAllProduit()
  {
    this.service.getAllProduits().subscribe(data=>{this.produit=data
      console.log(this.produit)

      })
  }

  deleteProduct(id: number | undefined) {
    if (id!==undefined){
    this.service.deleteProduct(id).subscribe(
      () => {
        console.log('Product deleted');
        this.snackBar.open('Product deleted successfully!', 'Close', {
          duration: 3000
        });
        this.getAllProduit(); // Refresh the product list after deletion
      },
      (error) => {
        console.error('Error deleting product:', error);
      }

    );
    }
  }

  ngOnInit(): void {
  this.getAllProduit()
  }


}
