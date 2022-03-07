import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarcargorolComponent } from './modificarcargorol.component';

describe('ModificarcargorolComponent', () => {
  let component: ModificarcargorolComponent;
  let fixture: ComponentFixture<ModificarcargorolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarcargorolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarcargorolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
