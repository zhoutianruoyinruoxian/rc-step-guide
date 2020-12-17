/**
 * @desc 自定义hook，因为会在Didmount时触发，所以至少要保证第一个节点是静态的，不是异步返回后生成的
 */

import { useEffect, useRef } from 'react';
import stepGuide from './stepGuide';
import type { Steps, Setting } from './stepGuide';

const defaultOptions = {};
export default function useStepGuide(stepData: Steps, options?: Setting) {
  const StepGuide = useRef(null);

  useEffect(() => {
    StepGuide.current = stepGuide(stepData, Object.assign({}, defaultOptions, options));
    return StepGuide.current.exit;
  }, [stepData, options]);

  return StepGuide.current;
}
