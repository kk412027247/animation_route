import React from 'react';
import ReactDOM from 'react-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import './App.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  // 这个动画是页面首次加载的动画，设置appear={true} 这个属性，并且动画时间设置为500ms，和css中的需要一致。
  // 一定要用 TransitionGroup 包着 CSSTransition，动画才有效，
  // 原因是TransitionGroup 负责检测并自动给CSSTransition添加‘in’的prop，
  // 并且TransitionGroup 要一直存在，不能放在动态生成的组件中.
  <TransitionGroup>
    <CSSTransition
      appear={true}
      classNames="appAppear"
      timeout={500}
    >
      <App/>
    </CSSTransition>
  </TransitionGroup>,
  document.getElementById('root')
);
registerServiceWorker();

