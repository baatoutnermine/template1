import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/products';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
host="http://localhost:3000/products";
  constructor(private client: HttpClient) {}

  public getAllProduits():Observable<Product[]>{
    return this.client.get<Product[]>(this.host);
  }
  getProductById(productId: string): Observable<Product> {
    const url = `${this.host}/${productId}`;
    return this.client.get<Product>(url);
  }
  public addProduct(product:Product):Observable<any> {
    return this.client.post<Product>(this.host,product);
  }


  updateProduct(product: Product): Observable<any> {
    const url = `${this.host}/${product.id}`;
    return this.client.put(url, product);
  }

  public deleteProduct(id: number): Observable<any> {
    const url = `${this.host}/${id}`;
    return this.client.delete(url);
  }

  searchProductsByPrice(minPrice: number, maxPrice: number): Observable<Product[]> {
    const params = new HttpParams()
      .set('price_gte', minPrice.toString())
      .set('price_lte', maxPrice.toString());

    return this.client.get<Product[]>(this.host, { params });
  }
}
