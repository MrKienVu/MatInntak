import should from 'should';
import {
  computeBMI,
  computeFluid,
  computeKcal,
  computeProtein,
} from '../logic/needs';

describe('A person`s bmi', () => {
  it('is 18.52 for a person of height 1.80m and weight 60kg', () => {
    computeBMI(60, 1.8).should.be.approximately(18.52, 0.01);
  });


  it('makes no sense to compute if height is 0', () => {
    computeBMI(60, 0).should.be.NaN;
  })
});

describe('A person`s energy need in kcal', () => {
  it('is thirty times their body weight in kg', () => {
    computeKcal(20).should.equal(600);
  });

});

describe('A person´s protein need in g', () => {
  it('equals their body weight in kg', () => {
    computeProtein(60).should.equal(60);
  });
});

describe('A person´s fluid need in ml', () => {
  it('is thirty times their body weight in kg', () => {
    computeFluid(2).should.equal(60);
  });
});
