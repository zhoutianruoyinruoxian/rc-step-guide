import React, { useReducer, useEffect, useRef } from 'react';
import type { FC } from 'react';
import classNames from 'classnames';
import { getDomPosition } from './position';
import type { Position } from './position';

interface MaskProps {
  prefixCls: string;
  position: Position;
}

const reducer = (state, action) => ({ ...state, ...action });

const Mask: FC<MaskProps> = ({ prefixCls, position }) => {
  const parentDom = useRef(null); // 为了控制遮罩的范围，内部item用的是绝对定位，所以要获取mask本身的位置进行计算
  const [maskState, setMaskState] = useReducer(reducer, { showMask: false, maskPosition: { top: 0, left: 0 } });
  const { width, height, left, top } = position;

  useEffect(() => {
    init();
  }, [position]);

  const init = () => {
    setMaskState({
      showMask: true,
      maskPosition: getDomPosition(parentDom.current),
    });
  };

  const realTop = top - maskState.maskPosition.top;
  const realLeft = left - maskState.maskPosition.left;

  return (
    <div
      className={
        classNames(`${prefixCls}-mask`,
          {
            [`${prefixCls}-mask-show`]: maskState.showMask,
          })
      }
      ref={parentDom}
    >
      <div
        className={`${prefixCls}-mask-item`}
        style={{ height: realTop, width: realLeft + width }}
      />
      <div
        className={`${prefixCls}-mask-item`}
        style={{ height: realTop + height, left: realLeft + width }}
      />
      <div
        className={`${prefixCls}-mask-item`}
        style={{ top: realTop + height, left: realLeft }}
      />
      <div
        className={`${prefixCls}-mask-item`}
        style={{ top: realTop, width: realLeft }}
      />
    </div >
  );
};

export default Mask;
