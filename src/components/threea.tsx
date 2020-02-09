import React from 'react';
import withAuthContext from "../context/AuthConsumer";

const ThreeA : React.FC = (props:any) => {
    console.log("ThreeA props", props.context);
    return (
        <div>Three-A</div>
    );
}

export default ThreeA;
