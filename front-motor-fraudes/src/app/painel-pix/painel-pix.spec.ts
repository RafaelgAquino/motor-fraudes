import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelPix } from './painel-pix';

describe('PainelPix', () => {
  let component: PainelPix;
  let fixture: ComponentFixture<PainelPix>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelPix],
    }).compileComponents();

    fixture = TestBed.createComponent(PainelPix);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
