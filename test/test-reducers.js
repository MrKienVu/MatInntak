import should from 'should';
import reducers from '../reducers';

describe('first reducer', () => {
  it('has initial value of 0', () => {
    reducers(undefined, {type:null}).firstReducer.should.deepEqual({value:0});
  });
});
