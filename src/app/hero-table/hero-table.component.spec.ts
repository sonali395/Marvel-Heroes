import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroTableComponent } from './hero-table.component';

describe('HeroTableComponent', () => {
  let component: HeroTableComponent;
  let fixture: ComponentFixture<HeroTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
