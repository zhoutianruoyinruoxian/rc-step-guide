import React, { useRef, useEffect } from 'react';
import { Button } from 'antd';
import stepGuide, { useStepGuide, Steps } from 'rc-stepguide';
import 'rc-stepguide/lib/index.css';

const data: Steps = [
  {
    element: '#topLeft',
    title: '第1步',
    content: '这是topLeft',
    placement: 'topLeft',
  },
  {
    element: '#out',
    title: '我在视野之外',
    content: '这都被你找到了，哈哈哈',
  },
  {
    element: '#top',
    title: '第2步',
    content: '这是top',
    placement: 'top',
  },
  {
    element: '#topRight',
    title: '第3步',
    content: '这是topRight',
    placement: 'topRight',
  },
  {
    element: '#rightTop',
    title: '第4步',
    content: '这是rightTop',
    placement: 'rightTop',
  },
  {
    element: '#right',
    title: '第5步',
    content: '这是right',
    placement: 'right',
  },
  {
    element: '#rightBottom',
    title: '第6步',
    content: '这是rightBottom',
    placement: 'rightBottom',
  },
  {
    element: '#bottomRight',
    title: '第7步',
    content: '这是bottomRight',
    placement: 'bottomRight',
  },
  {
    element: '#bottom',
    title: '第8步',
    content: '这是bottom',
    placement: 'bottom',
  },
  {
    element: '#bottomLeft',
    title: '第9步',
    content: '这是bottomLeft',
    placement: 'bottomLeft',
  },
  {
    element: '#leftBottom',
    title: '第10步',
    content: '这是leftBottom',
    placement: 'leftBottom',
  },
  {
    element: '#left',
    title: '第11步',
    content: '这是left',
    placement: 'left',
  },
  {
    element: '#leftTop',
    title: '第12步',
    content: '这是leftTop',
    placement: 'leftTop',
  },
];
export default function Test() {

  useStepGuide(data, {
    onOk() {
      console.log('onOk');
    },
    onNext() {
      console.log('onNext');
    },
    onSkip() {
      console.log('onSkip');
    },
  });


  return (
    <>
      <div style={{ marginLeft: 200, marginTop: 150 }}>
        <div style={{ marginLeft: 100, whiteSpace: 'nowrap' }}>
          <Button id="topLeft">topLeft</Button>
          <Button id="top">top</Button>
          <Button id="topRight">topRight</Button>
        </div>
        <div style={{ width: 100, float: 'left' }}>
          <Button id="leftTop">leftTop</Button>
          <Button id="left">left</Button>
          <Button id="leftBottom">leftBottom</Button>
        </div>
        <div style={{ width: 100, marginLeft: 100 * 4 + 24 }}>
          <Button id="rightTop">rightTop</Button>
          <Button id="right">right</Button>
          <Button id="rightBottom">rightBottom</Button>
        </div>
        <div style={{ marginLeft: 100, clear: 'both', whiteSpace: 'nowrap' }}>
          <Button id="bottomLeft">bottomLeft</Button>
          <Button id="bottom">bottom</Button>
          <Button id="bottomRight">bottomRight</Button>
        </div>
      </div>
      <div style={{ marginLeft: 200, marginTop: 1500 }}>
        <Button id="out">我在视野之外</Button>
      </div>
    </>
  );
}
