rc-stepguide
=========================

这是一个步骤引导react组件

[package 地址](https://www.npmjs.com/package/rc-stepguide)

## 下载

使用npm下载rc-stepguide:

``` 
npm install --save rc-stepguide
```

使用yarn下载rc-stepguide:

``` 
yarn add rc-stepguide
```

## Usage

``` jsx
import stepGuide from 'rc-stepguide';
import 'rc-stepguide/lib/index.css';

stepGuide(stepData, setting)
```

## API

### StepGuide

| 参数 | 说明 | 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| stepData |  步骤数据列表 | [StepData](#StepData) | - |
| setting | 设置项  | [Setting](#Setting) | - |

### StepData

| 参数 | 说明 | 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| element | dom 选择器 | string | - |
| title | 标题 | ReactNode | - |
| content | 内容  | ReactNode | - |
| placement | 气泡框位置，可选 top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom  | string | rightTop |
| useEffect | 选中目标节点之后的一次拦截，可以针对目标节点进行一些自定义副作用操作  | function（next，dom, currentData) | - |

### Setting

| 参数 | 说明 | 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| doneText |  done按钮文案 | ReactNode | 确定 |
| nextText | next按钮文案  | ReactNode | 下一步 |
| showNext | 是否显示next按钮  | boolean | true |
| prevText | prev按钮文案  | ReactNode | 上一步 |
| showPrev | 是否显示prev按钮  | boolean | false |
| skipText | skip按钮文案  | ReactNode | 跳过 |
| showSkip | 是否显示skip按钮  | boolean | true |
| mask | 是否显示遮罩 | boolean | true |
| onPrev | 点击上一步回调 | function(currentStep) | - |
| onNext | 点击下一步回调  | function(currentStep) | - |
| onOk | 点击确定回调 | function | - |
| onSkip | 点击跳过回调  | function | - |
