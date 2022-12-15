import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { CurrencyService } from '../service/currency.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css']
})
export class CoinListComponent implements OnInit {

  bannerData : any = [];
  currency : string ="INR"
  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;


  constructor(private api:ApiService ,private  Router : Router, private currencyService : CurrencyService) {

  }


  ngOnInit(): void {
    this.getBannerData();
    this.getAllData();
    this.currencyService.getCurrency().subscribe((res : any) => {
      this.currency = res ;
    })

  }


  getBannerData(){
    this.api.getTrendingCurrency(this.currency)
    .subscribe((res:any) => {
      this.bannerData = res;
      this.getAllData();
      this.getBannerData();
    })
  }

  getAllData(){
    this.api.getCurrency(this.currency)
    .subscribe((res: any ) => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  gotoDetails(row:any){
     this.Router.navigate(['coin-detail',row.id])
  }
}



