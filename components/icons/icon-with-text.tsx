import React from 'react';
import { TiHeartFullOutline } from "react-icons/ti";
import '@/styles/globals.css'; // 导入样式文件

const IconWithText = () => {
    return (
        <div className="icon-text-container">
            <TiHeartFullOutline className="icon" />
            <span className="text">赞助</span>
        </div>
    );
}

export default IconWithText;