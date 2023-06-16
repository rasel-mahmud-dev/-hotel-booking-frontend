import React from 'react';
import {InfinitySpin} from "react-loader-spinner";

const Loader = ({width = '200', title = "Page Loading...", titleClass = ""}) => {
    return (
        <div>
            <div className="w-full flex justify-center  items-center flex-col">
                <InfinitySpin
                    width={width}
                    color="#2c65ec"
                />
                {title && <h4 className={`text-xs font-semibold ${titleClass}`}>{title}</h4>}
            </div>
        </div>
    );
};

export default Loader;