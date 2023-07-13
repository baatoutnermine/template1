import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../services/produit.service';
import { Product } from 'src/products';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }
  // file!:File
  // product = new Product();


  // constructor(private productService: ProduitService  , private router:Router, private snackBar: MatSnackBar) { }

  // onFileChange(event:any) {
  //   if (event.target.files.length > 0) {
  //     this.product.img = event.target.files[0];
  //   }

  // }

  // addProduct(productForm: NgForm) {
  //   // if (!this.file) {
  //   //   console.error('No image selected.');
  //   //   return;
  //   // }
  //   const formData = new FormData();
  //   formData.append('name', this.product.name);
  //   formData.append('price', this.product.price.toString());
  //   formData.append('description', this.product.description);
  //   formData.append('img', this.product.img);
  //   console.log(productForm.value)
  //   this.productService.addProduct(productForm.value).subscribe(
  //     (response: Product) => {
  //       // Success handling
  //       console.log('Product added:', response);
  //       productForm.resetForm();
  //       this.snackBar.open('Product added successfully!', 'Close', {
  //         duration: 3000
  //       });
  //       ()=>this.router.navigate(['']);

  //     },
  //     (error) => {
  //       // Error handling
  //       console.error('Error adding product:', error);
  //     }
  //   );
  // }
  product = new Product();
  step = 1;

  nextStep() {
    this.step++;
  }
  constructor(private productService: ProduitService  , private router:Router, private snackBar: MatSnackBar){ }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.convertFileToBase64(file)
      .then(base64 => {
        this.product.img = base64;
      })
      .catch(error => {
        console.error('Error converting file to base64:', error);
      });
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result as string;
        resolve(base64);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

  onSubmit() {
    this.productService.addProduct(this.product)
      .subscribe(
        response => {
          console.log('Product added successfully!', response);this.router.navigate([""])
           this.snackBar.open('Product added successfully!', 'Close', {
                    duration: 3000
                  });
          // Additional logic can be added here, such as displaying a success message or redirecting to another page
        },
        error => {
          console.error('Error adding product:', error);
          // Handle the error, e.g., display an error message to the user
        }
      );
  }
}
