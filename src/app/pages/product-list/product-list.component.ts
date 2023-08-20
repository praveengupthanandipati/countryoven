import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  Filteritems=[
    {subcatname:'New Collection'},
    {subcatname:'Best Sellers'},
    {subcatname:'Fruit Cakes'},
    {subcatname:'Fancy Cakes'},
    {subcatname:'Tier Cakes'},
    {subcatname:'Best Collection'},
    {subcatname:'Designer Cakes'},
    {subcatname:'Kids Cakes'},
    {subcatname:'Emoji Cakes'},
    {subcatname:'Chocolate Cakes'},
    {subcatname:'Barbie Cakes'},
    {subcatname:'Theme Cakes'},
    {subcatname:'Photo Cakes'},
    {subcatname:'Customized Cakes'},
    {subcatname:'Theme Cakes'},
  ];

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
    {
    Image: 'assets/images/products/product05.jpg', 
    Sellerlabel:'Best Seller', 
    Title:'Lovely Black Forest Cake with Red Roses with 2 kg',
    OfferPrice:'1299.00',
    Mrp:'1500.00',
    Offer:'(17% Off)',
    Rating:'4.7',
    DeliveryEstimate:'Today'
    },
    {
    Image: 'assets/images/products/product06.jpg', 
    Sellerlabel:'New Launch', 
    Title:'Lovely Black Forest Cake with Red Roses with 3 kg',
    OfferPrice:'1359.00',
    Mrp:'1800.00',
    Offer:'(12% Off)',
    Rating:'5.0',
    DeliveryEstimate:'Tomorrow'
    },
    {
    Image: 'assets/images/products/product07.jpg', 
    Sellerlabel:'New Launch', 
    Title:'Black Forest Cake with Red Roses with 1 kg',
    OfferPrice:'1359.00',
    Mrp:'1800.00',
    Offer:'(12% Off)',
    Rating:'5.0',
    DeliveryEstimate:'Tomorrow'
    },
    {
    Image: 'assets/images/products/product08.jpg', 
    Sellerlabel:'New Launch', 
    Title:'Lovely Black Forest Cake with Red Roses with 3 kg Forest Cake with',
    OfferPrice:'1359.00',
    Mrp:'1800.00',
    Offer:'(12% Off)',
    Rating:'5.0',
    DeliveryEstimate:'Today'
    }, 
    {
      Image: 'assets/images/products/product09.jpg', 
      Sellerlabel:'Best Seller', 
      Title:'Lovely Black Forest Cake with Red Roses with 2 kg',
      OfferPrice:'1299.00',
      Mrp:'1500.00',
      Offer:'(17% Off)',
      Rating:'4.7',
      DeliveryEstimate:'Today'
      },
      {
      Image: 'assets/images/products/product10.jpg', 
      Sellerlabel:'New Launch', 
      Title:'Lovely Black Forest Cake with Red Roses with 3 kg',
      OfferPrice:'1359.00',
      Mrp:'1800.00',
      Offer:'(12% Off)',
      Rating:'5.0',
      DeliveryEstimate:'Tomorrow'
      },
      {
      Image: 'assets/images/products/product11.jpg', 
      Sellerlabel:'New Launch', 
      Title:'Black Forest Cake with Red Roses with 1 kg',
      OfferPrice:'1359.00',
      Mrp:'1800.00',
      Offer:'(12% Off)',
      Rating:'5.0',
      DeliveryEstimate:'Tomorrow'
      },
      {
      Image: 'assets/images/products/product12.jpg', 
      Sellerlabel:'New Launch', 
      Title:'Lovely Black Forest Cake with Red Roses with 3 kg Forest Cake with',
      OfferPrice:'1359.00',
      Mrp:'1800.00',
      Offer:'(12% Off)',
      Rating:'5.0',
      DeliveryEstimate:'Today'
      },
      {
        Image: 'assets/images/products/product13.jpg', 
        Sellerlabel:'Best Seller', 
        Title:'Lovely Black Forest Cake with Red Roses with 2 kg',
        OfferPrice:'1299.00',
        Mrp:'1500.00',
        Offer:'(17% Off)',
        Rating:'4.7',
        DeliveryEstimate:'Today'
        },
        {
        Image: 'assets/images/products/product14.jpg', 
        Sellerlabel:'New Launch', 
        Title:'Lovely Black Forest Cake with Red Roses with 3 kg',
        OfferPrice:'1359.00',
        Mrp:'1800.00',
        Offer:'(12% Off)',
        Rating:'5.0',
        DeliveryEstimate:'Tomorrow'
        },
        {
        Image: 'assets/images/products/product15.jpg', 
        Sellerlabel:'New Launch', 
        Title:'Black Forest Cake with Red Roses with 1 kg',
        OfferPrice:'1359.00',
        Mrp:'1800.00',
        Offer:'(12% Off)',
        Rating:'5.0',
        DeliveryEstimate:'Tomorrow'
        },
        {
        Image: 'assets/images/products/product16.jpg', 
        Sellerlabel:'New Launch', 
        Title:'Lovely Black Forest Cake with Red Roses with 3 kg Forest Cake with',
        OfferPrice:'1359.00',
        Mrp:'1800.00',
        Offer:'(12% Off)',
        Rating:'5.0',
        DeliveryEstimate:'Today'
        },
  ];

  selectedItems: any[] = [];
  dropdownItems = [
    { id: 1, text: 'Rs:500 - 999'},
    { id: 2, text: 'Rs:1000 - 1499'},
    { id: 3, text: 'Rs:1500 - 1999'},
    { id: 4, text: 'Rs:2000 - 2499'},
    { id: 5, text: 'Rs:2500 - 2999'},
    { id: 6, text: 'Rs:3000 - 3999'},
  ];

  
  toggleSelection(item:any): void {
    if (this.selectedItems.includes(item)) {
      this.selectedItems = this.selectedItems.filter(selectedItem => selectedItem !== item);
    } else {
      this.selectedItems.push(item);
    }
  };
}
