import React from "react";
import Image from 'next/image';

export const AcmeIcon = () => {
    return (
        <Image className='select-none' src="/assets/icon-toy.png" alt="Toy Icon" width={48} height={48}/>
    );
};