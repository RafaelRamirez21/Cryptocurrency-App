import React from 'react';
import { Spin } from 'antd';
import '../../assets/styles/Loadr.scss'

const Loader = () => {
  return (
    <div className="loader">
      <Spin tip="Loading..." />
    </div>
  )
}

export default Loader
