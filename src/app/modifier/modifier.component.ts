import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/products';
import { ProduitService } from '../services/produit.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css']
})
export class ModifierComponent  implements OnInit {

  product= new Product()
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.product.img = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit() {
    if (!this.product) {
      console.error('No product to update.');
      return;
    }

    this.productService.updateProduct(this.product)
      .subscribe(
        response => {
          console.log('Product updated successfully!', response);
          this.router.navigate(['/product', this.product?.id]);
        },
        error => {
          console.error('Error updating product:', error);
        }
      );
  }
}

