import { Top10FilterTsPipe } from './top-10.filter.ts.pipe';

describe('Top10FilterTsPipe', () => {
  it('create an instance', () => {
    const pipe = new Top10FilterTsPipe();
    expect(pipe).toBeTruthy();
  });
});
