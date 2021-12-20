import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { CartComponent } from './cart.component';

const listBook: Book[] = [
  {
    name: '',
    author: '',
    isbn: '',
    price: 15,
    amount: 2,
  },
  {
    name: '',
    author: '',
    isbn: '',
    price: 20,
    amount: 1,
  },
  {
    name: '',
    author: '',
    isbn: '',
    price: 7,
    amount: 8,
  },
];
describe('cart component', () => {
  /**
   * importamos el componente
   * fixture sacamos cosas de ese componente
   */
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  //se llama antes de ejecutar cada test
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // se hacen peticiones fiticias, en test no se hacen reales en import estan todos los modulos
      declarations: [CartComponent], // nombre componente
      providers: [BookService], // lo servicios que utiliza el componente
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents(); // componentes se compilan automaticamente y evitar errores
  });

  //instanciamos el test
  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); //el component entra por el ngOnInit()
  });

  //comprobar que el componente se ha creado correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getTotalPrice return an amount', () => {
    // necesitamos un array de libro, listBook
    const totalPrice = component.getTotalPrice(listBook);
    expect(totalPrice).toBeGreaterThan(0);
    expect(totalPrice).not.toBe(0);
    expect(totalPrice).not.toBeNull(0);
  });

  it('onInputNumberChange increments correctly', ()=>{
    const action = 'plus';
    const book = listBook[0];
    // spyOn estan atento a que ese metedo se haya llamado
  })
});
