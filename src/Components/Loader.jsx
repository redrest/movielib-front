import React from 'react';
import { TailSpin } from "react-loader-spinner";

const Loader = () => {
    return (
        <div style={{width:'100%', maxWidth: "1480px", margin:"0 auto", display:"flex", justifyContent:"center", alignItems:"center"}}  >
            <TailSpin
                height="80"
                width="80"
                color="#BE123C"
                ariaLabel="tail-spin-loading"
                radius="1"
                margin="auto"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>

    );
};

export default Loader;
