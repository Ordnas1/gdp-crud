import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { toggle } from "src/core/state/actions/sidenav.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showNav$: Observable<boolean>;

  @Output() menuClick: EventEmitter<any> = new EventEmitter()

  constructor(private store: Store<{ showNav: boolean}>) {
    this.showNav$ = store.select("showNav")
  }

  ngOnInit(): void {
  }

  toggle() {
    this.store.dispatch(toggle())
    console.log("dispatched")
  }

}
