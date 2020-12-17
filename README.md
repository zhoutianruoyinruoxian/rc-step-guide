rc-stepguide
=========================

This is a react component for step guide.

Designed to solve the prompting of specific areas in complex applications, can automatically track the prompt target through the node, and have a smooth transition animation;

This component decouples the logic related to the step guidance from the business code, and will not cause intrusive damage to the business code. You only need to set the relevant configuration;

By configuring useEffect, you can customize the active state of the tracked node. For example, the hidden target is displayed when it is guided. For details, you can view SpecialScene in the demo;

[中文文档请看这里](https://blog.csdn.net/xiaotiantian1993s/article/details/111310930)

[demo](https://github.com/zhoutianruoyinruoxian/rc-step-guide/tree/master/demo)

## install

npm:

``` 
npm install --save rc-stepguide
```

yarn:

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

| Property | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| stepData |  stepDataList | [StepData](#StepData) | - |
| setting | settings  | [Setting](#Setting) | - |

### StepData

| Property | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| element | dom selector  | string | - |
| title | title | ReactNode | - |
| content | content  | ReactNode | - |
| placement | The position of the tooltip relative to the target, which can be one of top left right bottom topLeft topRight bottomLeft bottomRight leftTop leftBottom rightTop rightBottom  | string | rightTop |
| useEffect | An interception after the target node is selected, some custom side effects can be performed on the target node | function（next，dom, currentData) | - |

### Setting

| Property | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| doneText | Text of the done button | ReactNode | 确定 |
| nextText | Text of the next button | ReactNode | 下一步 |
| showNext | Whether show next button or not | boolean | true |
| prevText | Text of the prev button  | ReactNode | 上一步 |
| showPrev | Whether show prev button or not  | boolean | false |
| skipText | Text of the skip button  | ReactNode | 跳过 |
| showSkip | Whether show skip button or not | boolean | true |
| mask | Whether show mask or not | boolean | true |
| onPrev | Specify a function that will be called when a user clicks the prev button | function(currentStep) | - |
| onNext | Specify a function that will be called when a user clicks the next button  | function(currentStep) | - |
| onOk | Specify a function that will be called when a user clicks the ok button | function | - |
| onSkip | Specify a function that will be called when a user clicks the skip button  | function | - |
