import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamoModalComponent } from './reclamo-modal.component';

describe('ReclamoModalComponent', () => {
  let component: ReclamoModalComponent;
  let fixture: ComponentFixture<ReclamoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReclamoModalComponent]
    });
    fixture = TestBed.createComponent(ReclamoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
