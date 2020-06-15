import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Tasca from '../models/tasca.model';

@Component({
  selector: 'app-tasca-details',
  templateUrl: './tasca-details.component.html',
  styleUrls: ['./tasca-details.component.css'],
})
export class TascaDetailsComponent implements OnInit {
  tasca: Tasca;
  address: string;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: any) => {
      this.tasca = data.tasca;
      this.address = `https://maps.google.com/maps?q=${this.tasca.address}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
      this.address.replace(' ', '%20');
      if (this.tasca.photo) {
        this.createImageFromBlob(
          data.image,
          (createdImage: any) => (this.tasca.photo = createdImage)
        );
      }
    });
  }

  private createImageFromBlob(blob: Blob, returnCreatedImageCallback: any) {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        const createdImage = reader.result;
        returnCreatedImageCallback(createdImage);
      },
      false
    );

    if (blob) {
      reader.readAsDataURL(blob);
    }
  }
}
