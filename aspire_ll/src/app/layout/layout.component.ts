import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})

export class LayoutComponent {
  constructor(private _bottomSheet: MatBottomSheet,private dataService: DataService,public ds: DataService) {}
  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewSheet);
  }
}

@Component({
  selector: 'app-layout-sheet',
  templateUrl: './open-bottom-overview-sheet.html',
  styleUrls: ['./layout.component.css'],
})
export class BottomSheetOverviewSheet {
  value: any;
  value1: any;
  constructor(
    public ds: DataService,
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewSheet>
  ) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}