import { Component, OnInit } from '@angular/core';

import {
  IBetResultModel,
  IBetResultsModel,
} from '../../shared/models/bet.results.model';

import { BetPlacementTestData } from 'src/app/shared/test-data/BetResultsTestData';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss'],
})
export class StatisticsPageComponent implements OnInit {
  betResults: IBetResultModel[] = BetPlacementTestData.betResults;

  constructor() {}

  ngOnInit(): void {
    this.betResults = BetPlacementTestData.betResults;
  }
}
