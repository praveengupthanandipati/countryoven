import { Component } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent {
  deliverAddress:any=[
    {
      Name:'Praveen Kumar N',
      Pin:500090,
      Label:'Home',
      Address:'Flat No:G-4, Kondaveedu Enclave, Maa Villas Road, Kousalya colony, Bachupally, Hyderabad'      
    },
    {
      Name:'Praveen Guptha Nandipati',
      Pin:500091,
      Label:'Office',
      Address:'Flat No:G-4, Kondaveedu Enclave, Maa Villas Road, Kousalya colony, Bachupally, Hyderabad'      
    },
    {
      Name:'Venkatesh',
      Pin:500092,
      Label:'Branch Office',
      Address:'Flat No:G-4, Kondaveedu Enclave, Maa Villas Road, Kousalya colony, Bachupally, Vijayawada'      
    },
    {
      Name:'Laxman Kumar',
      Pin:500093,
      Label:'Home 2',
      Address:'Flat No:G-4, Kondaveedu Enclave, Maa Villas Road, Kousalya colony, Bachupally, Guntur'      
    },
    {
      Name:'Shiva Krishna',
      Pin:500094,
      Label:'Guest House',
      Address:'Flat No:G-4, Kondaveedu Enclave, Maa Villas Road, Kousalya colony, Bachupally, Nellore'      
    }
  ]
}
