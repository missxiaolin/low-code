import {tokenize} from '../src';

test(`tokenize:null`, () => {
  expect(
    tokenize('abc${a}', {
      a: ''
    })
  ).toBe('abc');
  expect(
    tokenize('abc${a}', {
      a: null
    })
  ).toBe('abc');

  expect(
    tokenize('abc${a}', {
      a: undefined
    })
  ).toBe('abc');

  expect(
    tokenize('abc${a}', {
      a: 0
    })
  ).toBe('abc0');
});
