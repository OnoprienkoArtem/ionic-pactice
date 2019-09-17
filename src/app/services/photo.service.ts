import { Injectable, Inject } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';

import { HttpClient } from '@angular/common/http';
import { LOCAL_CONFIG } from '../config/config-api';
import { ApiConfig } from '../models/api';
import { Subject, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

class Photo {
  data: any;
}
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos: Photo[] = [];

  constructor(
    private camera: Camera, 
    private storage: Storage,
    private http: HttpClient,
    @Inject(LOCAL_CONFIG) public localConfig: ApiConfig,
    private route: ActivatedRoute
  ) { }



  getPopularFilms(page?: number) {
    return this.http.get(`${this.localConfig.movieUrl}/popular${this.localConfig.params}&page=${page}`);
  }




  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // Add new photo to gallery
      this.photos.unshift({
        data: 'data:image/jpeg;base64,' + imageData
      });
    
      // Save all photos for later viewing
      this.storage.set('photos', this.photos);
    }, (err) => {
      // Handle error
      console.log("Camera issue: " + err);
    });
  }

  loadSaved() {
    this.storage.get('photos').then((photos) => {
      this.photos = photos || [];
    });
  }
 




}

