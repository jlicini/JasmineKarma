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
  let service: BookService;

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
    service = fixture.debugElement.injector.get(BookService)
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

  // los test no se lanzan en paralelo. Por esto el libro lo instancio dentro la prueba y no afuera

  it('onInputNumberChange increments correctly', ()=>{
    const action = 'plus';
    const book = {
      name: '',
      author: '',
      isbn: '',
      price: 15,
      amount: 2,
    };
    /**
     * tenemos que llamar el servicio de _bookService
     * para accedere hay diferentes formas
     * // const service = (component as any)._bookService;
     * // const service = component["_bookService"];
     * las dos no son buenas formas porque puedes generar errores, la primera encoma no da metodos y no respecta tipos
     */

    // spyOn esta atento a que ese metedo se haya llamado, hay que crearlo antes de llamar e metodo
    const spy1 = spyOn(service, 'updateAmountBook').and.callFake(()=>null);
    const spy2 = spyOn(component, 'getTotalPrice').and.callFake(()=>null);

    expect(book.amount).toBe(2)

    component.onInputNumberChange(action, book);

    //hay muchas formas para hacer el expect
    expect(book.amount).toBe(3)
    expect(book.amount === 3).toBeTrue()

    // es parte del test mirar que los metodos se hayan llamado coorectamnte
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  })

  it('onInputNumberChange decrements correctly', ()=>{
    const action = 'minus';
    const book = {
      name: '',
      author: '',
      isbn: '',
      price: 15,
      amount: 2,
    };

    const spy1 = spyOn(service, 'updateAmountBook').and.callFake(()=>null);
    const spy2 = spyOn(component, 'getTotalPrice').and.callFake(()=>null);

    expect(book.amount).toBe(2)

    component.onInputNumberChange(action, book);

    expect(book.amount).toBe(1)

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  })
});
