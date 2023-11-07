import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ConfirmationService } from 'primeng/api';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { of } from 'rxjs';
import { ClientesComponent } from './clientes.component';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente';

describe('ClientesComponent', () => {
  let component: ClientesComponent;
  let fixture: ComponentFixture<ClientesComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastModule, TableModule],
      declarations: [ClientesComponent],
      providers: [ClienteService, ConfirmationService, DynamicDialogConfig], // Mock the required services
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(ClientesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*

  it('should fetch and display a list of clientes', () => {
    const mockClientes: Cliente[] = [
      { id: 1, nombre: 'Cliente1', email: 'cliente1@example.com',  bio: 'Bio del Cliente1',  nacimiento: new Date('1990-01-01') },
      { id: 2, nombre: 'Cliente2', email: 'cliente2@example.com',  bio: 'Bio del Cliente2',  nacimiento: new Date('1990-01-01') },
    ];

    const clienteService = TestBed.inject(ClienteService);
    spyOn(clienteService, 'getClientesVisible').and.returnValue(of(mockClientes));

    component.getClientesList();

    expect(component.clientes).toEqual(mockClientes);
  });

  it('should handle errors when fetching clientes', () => {
    const errorMessage = 'An error occurred while fetching clientes';
    const clienteService = TestBed.inject(ClienteService);
    spyOn(clienteService, 'getClientesVisible').and.throwError(errorMessage);

    spyOn(console, 'error'); // Suppress the error console.log
    component.getClientesList();

    expect(console.error).toHaveBeenCalledWith(errorMessage);
  });

  it('should delete a cliente', () => {
    const clientId = 1;

    const clienteService = TestBed.inject(ClienteService);
    spyOn(clienteService, 'toggleVisibiltyCliente').and.returnValue(of({ success: true }));

    component.borrarUsuario(clientId);

    expect(clienteService.toggleVisibiltyCliente).toHaveBeenCalledWith(clientId);
    expect(component.clientes.length).toEqual(0); // Assuming the cliente is removed from the list
  });

  it('should handle errors when deleting a cliente', () => {
    const clientId = 1;
    const errorMessage = 'An error occurred while deleting the cliente';

    const clienteService = TestBed.inject(ClienteService);
    spyOn(clienteService, 'toggleVisibiltyCliente').and.throwError(errorMessage);

    spyOn(console, 'error'); // Suppress the error console.log
    component.borrarUsuario(clientId);

    expect(console.error).toHaveBeenCalledWith(errorMessage);
  });

  it('should edit the nombre of a cliente', () => {
    const cliente: Cliente = { id: 1, nombre: 'Cliente1', email: 'cliente1@example.com', bio: 'Bio del Cliente1',  nacimiento: new Date('1990-01-01') };

    const clienteService = TestBed.inject(ClienteService);
    spyOn(clienteService, 'editCliente').and.returnValue(of({ success: true }));

    component.editarNombre(cliente);

    expect(clienteService.editCliente).toHaveBeenCalledWith(cliente);
  });

  it('should handle errors when editing the nombre of a cliente', () => {
    const cliente: Cliente = { id: 1, nombre: 'Cliente1', email: 'cliente1@example.com', bio: 'Bio del Cliente1',  nacimiento: new Date('1990-01-01') };
    const errorMessage = 'An error occurred while editing the nombre of the cliente';

    const clienteService = TestBed.inject(ClienteService);
    spyOn(clienteService, 'editCliente').and.throwError(errorMessage);

    spyOn(console, 'error'); // Suppress the error console.log
    component.editarNombre(cliente);

    expect(console.error).toHaveBeenCalledWith(errorMessage);
  });

  it('should edit the email of a cliente', () => {
    const cliente: Cliente = { id: 1, nombre: 'Cliente1', email: 'cliente1@example.com', bio: 'Bio del Cliente1',  nacimiento: new Date('1990-01-01') };

    const clienteService = TestBed.inject(ClienteService);
    spyOn(clienteService, 'editCliente').and.returnValue(of({ success: true }));

    component.editarEmail(cliente);

    expect(clienteService.editCliente).toHaveBeenCalledWith(cliente);
  });

  it('should handle errors when editing the email of a cliente', () => {
    const cliente: Cliente = { id: 1, nombre: 'Cliente1', email: 'cliente1@example.com', bio: 'Bio del Cliente1',  nacimiento: new Date('1990-01-01') };
    const errorMessage = 'An error occurred while editing the email of the cliente';

    const clienteService = TestBed.inject(ClienteService);
    spyOn(clienteService, 'editCliente').and.throwError(errorMessage);

    spyOn(console, 'error'); // Suppress the error console.log
    component.editarEmail(cliente);

    expect(console.error).toHaveBeenCalledWith(errorMessage);
  });
  */
});
