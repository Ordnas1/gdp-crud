import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Component({
  selector: 'app-index-container',
  templateUrl: './index-container.component.html',
  styleUrls: ['./index-container.component.scss']
})
export class IndexContainerComponent implements OnInit {
  items:Observable<any[]>;

  constructor(firestore: AngularFirestore) {
    this.items = firestore.collection('peliculas').valueChanges()
  }

  ngOnInit(): void {
  }


}
