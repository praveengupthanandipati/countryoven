import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls:['./home.component.scss']
})
export class HomeComponent {
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
  
  birthdaycollectionsitems:any[] = [
    {
      Image:'assets/images/collections/collection01.jpg',
      Name:'Cakes'
    },
    {
      Image:'assets/images/collections/collection02.jpg',
      Name:'Combos'
    },
    {
      Image:'assets/images/collections/collection03.jpg',
      Name:'Flowers'
    },
    {
      Image:'assets/images/collections/collection04.jpg',
      Name:'Plants'
    },
    {
      Image:'assets/images/collections/collection05.jpg',
      Name:'Personalised Gifts'
    },
    {
      Image:'assets/images/collections/collection06.jpg',
      Name:'Personalised Chocolates'
    },
  ];
  
  anniversarycollectionitems:any[] = [
    {
      Image:'assets/images/collections/collection07.jpg',
      Name:'Flowers'
    },
    {
      Image:'assets/images/collections/collection08.jpg',
      Name:'Combos'
    },
    {
      Image:'assets/images/collections/collection09.jpg',
      Name:'Cakes'
    },
    {
      Image:'assets/images/collections/collection10.jpg',
      Name:'Plants'
    },
    {
      Image:'assets/images/collections/collection11.jpg',
      Name:'Personalised Gifts'
    },
    {
      Image:'assets/images/collections/collection12.jpg',
      Name:'Personalised Flowers'
    },
  ]
}
