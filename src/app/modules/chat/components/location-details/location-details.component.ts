import {  Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css'],
})
export class LocationDetailsComponent implements OnInit {
  latitude: any;
  longitude: any;
  address: any;
  locationName: any;

  isProceess: boolean = true;
  customersMasterForm: any;
  uploadFile: any = '';
  check: any;
  imageLoaded = false;
  imageURL: any = '../../../../../assets/images/default-nopic.jpg';
  previewUrl: any;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
  ) {
    this.isProceess = false;

    this.customersMasterForm = this.formBuilder.group({
      latitude: [''],
      longitude: [''],
      address: [''],
      locationName: [''],
    });
  }

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          // this.getAddressFromCoordinates(this.latitude, this.longitude);
        },
        (error) => console.log(error)
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  onCancel() {
    this.activeModal.dismiss();
  }

  getAddressFromCoordinates(latitude: any, longitude: any) {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat: latitude, lng: longitude };
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK' && results[0]) {
        this.address = results[0].formatted_address;
        this.locationName = this.getLocationNameFromGeocodeResult(results[0]);
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }

  getLocationNameFromGeocodeResult(result: google.maps.GeocoderResult): string {
    const locationNameComponent = result.address_components.find(
      (component) =>
        component.types.includes('point_of_interest') ||
        component.types.includes('establishment') ||
        component.types.includes('natural_feature') ||
        component.types.includes('park') ||
        component.types.includes('locality')
    );

    return locationNameComponent ? locationNameComponent.long_name : '';
  }

  onSubmit() {
    if (this.customersMasterForm.valid) {
      let data = {
        latitude: this.latitude,
        longitude: this.longitude,
        address: this.address,
        locationName: this.locationName,
      };
      this.activeModal.close(data);
    } else {
    }
  }
}
