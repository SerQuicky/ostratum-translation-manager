import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationProjectComponent } from './translation-project.component';

describe('TranslationProjectComponent', () => {
  let component: TranslationProjectComponent;
  let fixture: ComponentFixture<TranslationProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
