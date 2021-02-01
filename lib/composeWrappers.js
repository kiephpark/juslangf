import React from 'react';

export const composeWrappers = ( wrappers ) => {
  return wrappers.reduce((Acc, Current) => {
    return props => <Current> <Acc {...props}/> </Current>
  });
}
