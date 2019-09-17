import { Component, OnInit, Inject } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { LOCAL_CONFIG } from '../config/config-api';
import { ApiConfig } from '../models/api';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  public films: any;
  public filmsClone: any;
  public firstFilm: string;
  public secondFilm: string;
  public imgUrl: string = this.localConfig.midImgPath;

  constructor(public photoService: PhotoService, @Inject(LOCAL_CONFIG) public localConfig: ApiConfig) { }

  ngOnInit() {
    this.photoService.getPopularFilms().subscribe(
      (filmList: any) => {
        console.log(filmList);
        this.filmsClone = filmList.results;
        this.films = this.filmsClone.slice(0, 8);
        
        this.firstFilm = this.films[0].poster_path;
        this.secondFilm = this.films[1].poster_path;
      },
      err => console.log("error", err)
    )

  }

}
