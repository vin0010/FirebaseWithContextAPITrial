import React from 'react';
import AuthContext from './auth-context';

const withAuthContext = (
  Component: React.ComponentClass<any> | React.FunctionComponent<any>
) => {
  console.log("Rendering AuthConsumer for ");
  return (props: any) => (
    <AuthContext.Consumer>
      {context => <Component {...props} context={context} />}
    </AuthContext.Consumer>
  );
};

export default withAuthContext;
