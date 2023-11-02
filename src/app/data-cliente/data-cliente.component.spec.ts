import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { DataClienteComponent } from './data-cliente.component';

describe('DataClienteComponent', () => {
  let component: DataClienteComponent;
  let fixture: ComponentFixture<DataClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataClienteComponent],
      imports: [HttpClientTestingModule], 
      providers: [DataClienteComponent],
    });
    fixture = TestBed.createComponent(DataClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
