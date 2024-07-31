import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreslistComponent } from './genreslist.component';

describe('GenreslistComponent', () => {
  let component: GenreslistComponent;
  let fixture: ComponentFixture<GenreslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreslistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
