// core/domain/models/book.ts
export interface Book {
    id: string;
    title: string;
    author: string;
    isbn: string;
    available: boolean;
  }
  
  // core/repositories/book-repository.ts
  export interface BookRepository {
    getBooks(): Promise<Book[]>;
    getBookById(id: string): Promise<Book>;
    saveBook(book: Book): Promise<void>;
  }
  
  // core/usecases/get-books.usecase.ts
  export class GetBooksUseCase {
    constructor(private bookRepository: BookRepository) {}
    
    execute(): Promise<Book[]> {
      return this.bookRepository.getBooks();
    }
  }
  
  // data/models/book-dto.ts
  export interface BookDTO {
    id: string;
    title: string;
    author: string;
    isbn: string;
    status: string;
  }
  
  // data/repositories/book-repository-impl.ts
  export class BookRepositoryImpl implements BookRepository {
    constructor(private dataSource: BookDataSource) {}
    
    async getBooks(): Promise<Book[]> {
      const booksDTO = await this.dataSource.fetchBooks();
      return booksDTO.map(this.mapToBook);
    }
    
    private mapToBook(dto: BookDTO): Book {
      return {
        id: dto.id,
        title: dto.title,
        author: dto.author,
        isbn: dto.isbn,
        available: dto.status === 'AVAILABLE'
      };
    }
  }
  
  // data/datasources/book-datasource.ts
  export class BookDataSource {
    async fetchBooks(): Promise<BookDTO[]> {
      // Implementación para obtener datos de API/BD
      return fetch('api/books').then(res => res.json());
    }
  }
  
  // presentation/pages/book-list/book-list.component.ts
  @Component({
    selector: 'app-book-list',
    template: `
      <div class="book-list">
        <app-book-card 
          *ngFor="let book of books$ | async"
          [book]="book"
        ></app-book-card>
      </div>
    `
  })
  export class BookListComponent {
    books$: Observable<Book[]>;
    
    constructor(private getBooksUseCase: GetBooksUseCase) {
      this.books$ = from(this.getBooksUseCase.execute());
    }
  }
  
  // presentation/components/book-card/book-card.component.ts
  @Component({
    selector: 'app-book-card',
    template: `
      <div class="book-card">
        <h3>{{book.title}}</h3>
        <p>Author: {{book.author}}</p>
        <p>Status: {{book.available ? 'Available' : 'Not Available'}}</p>
      </div>
    `
  })
  export class BookCardComponent {
    @Input() book!: Book;
  }
  
  // shared/utils/date-formatter.ts
  export const formatDate = (date: Date): string => {
    return date.toLocaleDateString();
  }