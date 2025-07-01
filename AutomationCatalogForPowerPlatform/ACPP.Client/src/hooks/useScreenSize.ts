// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { useState, useEffect } from "react";


export const useScreenSize = () => {

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [isXS, setIsXS] = useState(window.innerWidth < 320);
    const [isSM, setIsSM] = useState(window.innerWidth < 480);
    const [isMD, setIsMD] = useState(window.innerWidth < 768);
    const [isLG, setIsLG] = useState(window.innerWidth < 1024);
    const [isXL, setIsXL] = useState(window.innerWidth < 1280);

    const handleWindowResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        setIsXS(window.innerWidth < 320);
        setIsSM(window.innerWidth < 480);
        setIsMD(window.innerWidth < 768);
        setIsLG(window.innerWidth < 1024);
        setIsXL(window.innerWidth < 1280);
    };

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    return { width, height, isXS, isSM, isMD, isLG, isXL };
}
