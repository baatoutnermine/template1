import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/products';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent   implements OnInit{
  product: Product | null = null;

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private productService: ProduitService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const productId = params['id'];
      this.getProductDetails(productId);
    });
  }

  getProductDetails(productId: string) {
    this.productService.getProductById(productId)
      .subscribe(
        response => {
          this.product = response;
        },
        error => {
          console.error('Error fetching product details:', error);
        }
      );
  }

  retour()
  {
    this.router.navigate(['']);
  }
}
