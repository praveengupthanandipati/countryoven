import { Component } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  
  productname='Chocolate Truffle Delicious Cake Half Kg';

  productvalues:any[] = [
    {
    Image: 'assets/images/products/product01.jpg', 
    Sellerlabel:'Best Seller', 
    Title:'Lovely Black Forest Cake with Red Roses with 2 kg',
    OfferPrice:'1299.00',
    Mrp:'1500.00',
    Offer:'(17% Off)',
    Rating:'4.7',
    DeliveryEstimate:'Today'
    },
    {
    Image: 'assets/images/products/product02.jpg', 
    Sellerlabel:'New Launch', 
    Title:'Lovely Black Forest Cake with Red Roses with 3 kg',
    OfferPrice:'1359.00',
    Mrp:'1800.00',
    Offer:'(12% Off)',
    Rating:'5.0',
    DeliveryEstimate:'Tomorrow'
    },
    {
    Image: 'assets/images/products/product03.jpg', 
    Sellerlabel:'New Launch', 
    Title:'Black Forest Cake with Red Roses with 1 kg',
    OfferPrice:'1359.00',
    Mrp:'1800.00',
    Offer:'(12% Off)',
    Rating:'5.0',
    DeliveryEstimate:'Tomorrow'
    },
    {
    Image: 'assets/images/products/product04.jpg', 
    Sellerlabel:'New Launch', 
    Title:'Lovely Black Forest Cake with Red Roses with 3 kg Forest Cake with',
    OfferPrice:'1359.00',
    Mrp:'1800.00',
    Offer:'(12% Off)',
    Rating:'5.0',
    DeliveryEstimate:'Today'
    },   
  ];

}
