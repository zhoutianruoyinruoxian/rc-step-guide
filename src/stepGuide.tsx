import ReactDOM from 'react-dom';
import React from 'react';
import StepGuideReactComponent from './StepGuideReactComponent';
import type { Options, Step } from './StepGuideReactComponent';
import { getDomPosition, Position } from './position';
import { onResizeEnd } from './event';

export type Steps = Step[];

interface Events {
  onPrev?: (currentStep: number) => void;
  onNext?: (currentStep: number) => void;
  created?: (targetDom: Element) => any;
}

export type Setting = Options & Events

export default function StepGuide(stepData: Steps, setting?: Setting) {
  const options: Setting = {
    prefixCls: 'step-guide',
    doneLabel: '确定',
    nextLabel: '下一步',
    showNext: true,
    prevLabel: '上一步',
    showPrev: false,
    skipLabel: '跳过',
    showSkip: true,
    mask: true,
    onPrev() { },
    onNext() { },
    created() { }, // lifeCricle
    ...setting,
  };
  const steps = [...stepData]; // 步骤数据
  const stepLength = stepData.length; // 步骤总条数
  let currentStep = 0; // 当前步骤
  let targetDom = null; // 目标 DOM节点
  let stepGuideDom = null; // stepguide DOM节点
  let forceUpdate = 0; // 用于强制更新react组件

  start();

  function start() {
    const body = document.querySelector('body');
    const div = document.createElement('div');
    div.classList.add(`${options.prefixCls}-wrapper`);
    body.appendChild(div);
    body.style.overflow = 'hidden';
    stepGuideDom = div;
    window.addEventListener('resize', resize);
    main();
  }

  function exit() {
    const unmountResult = ReactDOM.unmountComponentAtNode(stepGuideDom);
    if (unmountResult && stepGuideDom.parentNode) {
      stepGuideDom.parentNode.removeChild(stepGuideDom);
    }
    if (targetDom) {
      targetDom.classList.remove(`${options.prefixCls}-focused`);
    }
    const body = document.querySelector('body');
    body.style.overflow = '';
    window.removeEventListener('resize', resize);
  }

  function refresh() {
    main();
  }

  function resize() {
    onResizeEnd(() => {
      forceUpdate++;
      refresh();
    });
  }

  function goStep() {
    if (currentStep + 1 < stepLength) {
      currentStep++;
      refresh();
    } else {
      exit();
    }
    options.onNext(currentStep);
  }

  function prevStep() {
    if (currentStep > 0) {
      currentStep--;
      refresh();
    }
    options.onPrev(currentStep);
  }

  function main() {
    if (targetDom) {
      targetDom.classList.remove(`${options.prefixCls}-focused`);
    }
    const currentData = steps[currentStep];
    targetDom = document.querySelector(currentData.element);
    targetDom.scrollIntoViewIfNeeded();
    targetDom.classList.add(`${options.prefixCls}-focused`);
    options.created(targetDom);
    const tarPosition = getDomPosition(targetDom);
    renderStepGuide(currentData, tarPosition);
  }

  function renderStepGuide(currentData: Step, tarPosition: Position) {
    setTimeout(() => {
      ReactDOM.render(
        <StepGuideReactComponent
          options={options}
          target={targetDom.cloneNode(true)}
          currentData={currentData}
          currentStep={currentStep}
          stepLength={stepLength}
          tarPosition={tarPosition}
          onPrev={prevStep}
          onNext={goStep}
          onSkip={exit}
          forceUpdate={forceUpdate}
        />,
        stepGuideDom);
    });
  }

  return {
    refresh,
    prevStep,
    goStep,
    exit,
  };
}
