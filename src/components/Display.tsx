import React, { Component } from "react";

type Props = {
    data: string,
};

export const Display = (props: Props) => {
    return <div className="Display"> {props.data} </div>;
};
