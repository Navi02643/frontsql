import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasLayoutComponent } from './tareas-layout.component';

describe('TareasLayoutComponent', () => {
  let component: TareasLayoutComponent;
  let fixture: ComponentFixture<TareasLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TareasLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TareasLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
