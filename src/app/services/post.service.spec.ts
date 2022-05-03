import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { getTestBed, TestBed } from '@angular/core/testing';

import { environment } from 'src/environments/environment';
import { PostService } from './post.service';

describe('PostService', () => {
  let injector: TestBed;
  let service: PostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService],
    });

    injector = getTestBed();
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getAll', () => {
    it('should call http service with the correct path', () => {
      service.getAll().subscribe((response) => {
        console.log(response);
      });

      const req = httpMock.expectOne(`${environment.apiEndpoint}/blog-posts`);
      expect(req.request.method).toBe('GET');
      req.flush({});
    });
  });

  describe('#getById', () => {
    it('should call http service with the correct path', () => {
      const id = 10;

      service.getById(id).subscribe((response) => {
        console.log(response);
      });

      const req = httpMock.expectOne(`${environment.apiEndpoint}/blog-post/${id}`);
      expect(req.request.method).toBe('GET');
      req.flush({});
    });
  });
});
