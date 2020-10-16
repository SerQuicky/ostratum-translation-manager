import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationModalComponent } from './translation-modal.component';

describe('TranslationModalComponent', () => {
  let component: TranslationModalComponent;
  let fixture: ComponentFixture<TranslationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
