import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutProduitComponent } from './ajout-produit/ajout-produit.component';
import { ProductsComponent } from './products/products.component';
import { DetailProduitComponent } from './detail-produit/detail-produit.component';
import { ModifierComponent } from './modifier/modifier.component';

const routes: Routes = [
  {path: "",component:ProductsComponent },
  {path:"add",component:AjoutProduitComponent},
  { path: 'product/:id', component: DetailProduitComponent },
  {path: 'product/edit/:id', component: ModifierComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
