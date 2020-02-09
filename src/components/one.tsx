import React from 'react';

const One : React.FC = (props:any) => {
    console.log("One props", props.context);
    return (
        <div>One</div>
    );
}

export default One;
