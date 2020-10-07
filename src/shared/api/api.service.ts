import { Injectable } from '@angular/core';
import { Pelicula } from "../interfaces/pelicula";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = "http://localhost:3000/peliculas";

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAllPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.url)
  }

  createPelicula(pelicula: Pelicula ): Observable<Pelicula> {
    return this.http.post<Pelicula>(this.url, pelicula)
  }

  updatePelicula(peliculaId: string | number, changes: Partial<Pelicula>): Observable<any> {
    return this.http.put(`${this.url}/${peliculaId}`, changes)
  }

  getPelicula(id: string | number): Observable<Pelicula> {
    return this.http.get<Pelicula>(`${this.url}/${id}`)
  }
}
