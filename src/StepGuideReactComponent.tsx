
import React, { useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { getAutoPosition, getPosition, getDomPosition } from './position';
import type { Position, Placement } from './position';
import Mask from './Mask';

export interface Options {
  prefixCls?: string;
  doneLabel?: ReactNode;
  nextLabel?: ReactNode;
  showNext?: boolean;
  prevLabel?: ReactNode,
  showPrev?: boolean,
  skipLabel?: ReactNode;
  showSkip?: boolean;
  mask?: boolean;
}

export interface Step {
  element: string;
  title?: ReactNode;
  content?: ReactNode;
  placement?: Placement;
  useEffect?: (next: Function, dom, currentData: Step) => Function | void;
}
interface StepGuideReactComponentProps {
  forceUpdate: any;
  options: Options;
  currentData: Step;
  currentStep: number;
  stepLength: number;
  onPrev: any;
  onNext: any;
  onSkip: any;
  tarPosition: Position;
}

const StepGuideReactComponent: FC<StepGuideReactComponentProps> = ({
  forceUpdate,
  options,
  currentData,
  currentStep,
  stepLength,
  onPrev,
  onNext,
  onSkip,
  tarPosition, // 目标位置
}) => {
  const { prefixCls, mask, doneLabel, nextLabel, showNext, prevLabel, showPrev, skipLabel, showSkip } = options;
  const { placement: oldPlacement = 'rightTop' } = currentData;
  const [placement, setPlacement] = useState('');
  const [style, setStyle] = useState({ arrow: {}, content: {} });

  useEffect(() => {
    getContentPosition();
  }, [currentData, forceUpdate]);

  const getContentPosition = () => {
    const stepContent = document.querySelector(`.${options.prefixCls}-content`);
    const contentPosition = getDomPosition(stepContent);
    const autoPlacement = getAutoPosition(oldPlacement, tarPosition, contentPosition);
    setPlacement(autoPlacement);
    const res = getPosition(autoPlacement, tarPosition, contentPosition);
    setStyle(res);
  };

  return (
    <>
      {mask && <Mask prefixCls={prefixCls} position={tarPosition} />}
      <div className={`${prefixCls}-content ${prefixCls}-placement-${placement}`}
        style={{
          opacity: JSON.stringify(style.content) !== '{}' ? 1 : 0,
          ...style.content,
        }}
      >
        <div className={`${prefixCls}-arrow`} style={style.arrow} />
        <div className={`${prefixCls}-inner`}>
          <div className={`${prefixCls}-header`}>
            {currentData.title}
          </div>
          <div className={`${prefixCls}-body`}>
            {currentData.content}
          </div>
          <div className={`${prefixCls}-footer`}>
            {showSkip &&
              <div
                className={`${prefixCls}-footer-skip`}
                onClick={onSkip}
              >{skipLabel}</div>
            }
            {stepLength > 1 &&
              <div className={`${prefixCls}-footer-total`}>({currentStep + 1}/{stepLength})</div>
            }
            {showPrev &&
              <div
                className={`${prefixCls}-footer-prev`}
                onClick={onPrev}
              >{prevLabel}</div>
            }
            {showNext &&
              <div
                className={`${prefixCls}-footer-next`}
                onClick={onNext}
              >{currentStep === stepLength - 1 ? doneLabel : nextLabel}</div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default StepGuideReactComponent;
