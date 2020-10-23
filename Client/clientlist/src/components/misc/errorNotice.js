import React from 'react';

export default function ErrorNotice(props){


    return(
            <div className="errornotice bg-red-300 text-white flex mx-2 rounded-full p-2">

                <span className=" w-2/3"> {props.message} </span>

                <button className=" w-1/3" onClick={props.clearError}> X </button>

            </div>



    )

}