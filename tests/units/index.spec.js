import { StackContext, CloseStackContext, NavigateStackContext } from 'src'

describe('depay-react-dialog', () => {
  
  it('should export StackContext', () => {
    expect(typeof(StackContext.Provider)).toBe('object');
    expect(typeof(StackContext.Consumer)).toBe('object');
  });

  it('should export CloseStackContext', () => {
    expect(typeof(CloseStackContext.Provider)).toBe('object');
    expect(typeof(CloseStackContext.Consumer)).toBe('object');
  });

  it('should export NavigateStackContext', () => {
    expect(typeof(NavigateStackContext.Provider)).toBe('object');
    expect(typeof(NavigateStackContext.Consumer)).toBe('object');
  });
});
