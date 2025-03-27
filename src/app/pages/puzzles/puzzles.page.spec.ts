import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PuzzlesPage } from './puzzles.page';

describe('PuzzlesPage', () => {
  let component: PuzzlesPage;
  let fixture: ComponentFixture<PuzzlesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzlesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
