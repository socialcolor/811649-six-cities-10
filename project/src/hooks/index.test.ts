import { useAppDispatch, useAppSelector } from './index';


describe('Hooks', () => {
  it('Should been useAppDispatch defined', () => {
    expect(useAppDispatch).toBeDefined();
  });
  it('Should been useAppSelector defined', () => {
    expect(useAppSelector).toBeDefined();
  });
});
