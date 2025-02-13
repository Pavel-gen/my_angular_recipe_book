import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeEditComponent } from './edit.component';

describe('EditComponent', () => {
  let component: RecipeEditComponent;
  let fixture: ComponentFixture<RecipeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
