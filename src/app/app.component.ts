import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export class Item {
  public name: string;
  constructor(public value: number) {
    this.name = `id${value}`;
  }
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private array: Item[] = [
    new Item(6),
    new Item(3),
    new Item(1),
    new Item(5),
    new Item(4),
    new Item(2)
  ];

  getData(): Observable<Item[]> {
    return of(this.array);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data$!: Observable<Item[]>;

  constructor(private service: DataService) {}

  ngOnInit() {
    this.data$ = this.service.getData();
  }

  sort() {
    this.data$ = this.data$.pipe(
      map(data => {
        data.sort((a, b) => {
          return a.value < b.value ? -1 : 1;
        });
        return data;
      })
    );
  }

  sortDesc() {
    this.data$ = this.data$.pipe(
      map(data => {
        data.sort((a, b) => {
          return a.value > b.value ? -1 : 1;
        });
        return data;
      })
    );
  }
}
