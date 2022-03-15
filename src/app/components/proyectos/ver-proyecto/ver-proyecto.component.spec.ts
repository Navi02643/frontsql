import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProyectoComponent } from './ver-proyecto.component';

describe('VerProyectoComponent', () => {
  let component: VerProyectoComponent;
  let fixture: ComponentFixture<VerProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerProyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
