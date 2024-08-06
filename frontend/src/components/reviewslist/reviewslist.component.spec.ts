import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewslistComponent } from './reviewslist.component';

describe('ReviewslistComponent', () => {
  let component: ReviewslistComponent;
  let fixture: ComponentFixture<ReviewslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewslistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
