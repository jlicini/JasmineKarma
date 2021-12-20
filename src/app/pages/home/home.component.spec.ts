import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookService } from 'src/app/services/book.service';
import { HomeComponent } from './home.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { serialize } from 'v8';
import { Book } from 'src/app/models/book.model';
import { of } from 'rxjs';

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

describe('Home component', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent],
      providers: [BookService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getBooks get empty books from the subscription', ()=>{
    const bookservice = TestBed.inject(BookService)
     /**
     * get book devuelve un Observable de tipo array book
     * of develve un observable
     */
    const listBook: Book[] = [];
    const spy1 = spyOn(bookservice, 'getBooks').and.returnValue(of(listBook));
    component.getBooks();
    expect(spy1).toHaveBeenCalled();
    expect(component.listBook.length).toBe(0)
  })

  it('getBooks get more than 0 books from the subscription', ()=>{
    const bookservice = TestBed.inject(BookService)
    const spy1 = spyOn(bookservice, 'getBooks').and.returnValue(of(listBook));
    component.getBooks();
    expect(spy1).toHaveBeenCalled();
    expect(component.listBook.length).toBe(3);
    expect(component.listBook.length).toBeGreaterThan(0);
  })

});
