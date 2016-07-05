import should from 'should';
import { computeBMI } from '../logic';

describe('bmi function', () => {
  it('calculates the correct value for a height of 1.80m and a weight of 60kg', () => {
    computeBMI(60, 1.8).should.be.approximately(18.52, 0.01);
  });


  it('returns NaN if height is 0', () => {
    computeBMI(60, 0).should.be.NaN;
  })
});
