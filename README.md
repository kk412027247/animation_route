### yarn start 启动项目

###应用首次加载时候的动画。
![首次加载.gif](https://upload-images.jianshu.io/upload_images/7505289-5ec4b40b1565437f.gif?imageMogr2/auto-orient/strip)


###切换路由时候的动画
![切换.gif](https://upload-images.jianshu.io/upload_images/7505289-0fe7c06973f985d7.gif?imageMogr2/auto-orient/strip)



###做react路由动画比较复杂，最好了解三个前提知识，
1. react动画组件，**react-transition-group** [文档](https://reactcommunity.org/react-transition-group/#Transition-prop-addEndListener)

2. react路由组件，**react-router** [文档](https://reacttraining.com/react-router/)

3. css动画语法， **CSS动画简介**  [文档](http://www.ruanyifeng.com/blog/2014/02/css_transition_and_animation.html)



###直接上代码
>这里我直接用了官方的[demo代码](https://reacttraining.com/react-router/web/example/animated-transitions)，并且稍微改了一下动画样式。附上[我写好的github项目地址]()


```
//index.js

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

```

```
// app.js

import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { BrowserRouter , Switch, Route, Link, Redirect } from "react-router-dom";
import './App.css'

const AnimationRoute = () => (
  <BrowserRouter>
    <Route
      render={({ location }) => (
        <div style={styles.fill}>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/hsl/10/90/50" />}
          />

          <ul style={styles.nav}>
            <NavLink to="/hsl/10/90/50">Red</NavLink>
            <NavLink to="/hsl/120/100/40">Green</NavLink>
            <NavLink to="/rgb/33/150/243">Blue</NavLink>
            <NavLink to="/rgb/240/98/146">Pink</NavLink>
          </ul>

          <div>{console.log(location)}</div>
          <div style={styles.content}>
            {/*和平时使用动画组件没啥区别，*/}
            {/*在渲染的路由的地方加一个用动画组件包着，并添加css属性即可；*/}
            <TransitionGroup>
              <CSSTransition
                // 需要加一个key属性，让react认识每个组件，并进行正确的加载。
                // 这里我改了官方demo的代码， 原来是设置成location.key， 这样的话每次点击同一个路由链接的时候都会渲染。
                key={location.pathname}
                // classNames 就是设置给css动画的标示，记得'classNames'带's'的。
                classNames="fade"
                // 动画时间设置为800ms，和css中的需要一致。
                timeout={800}
              >
                <Switch location={location}>
                  <Route exact path="/hsl/:h/:s/:l" component={HSL} />
                  <Route exact path="/rgb/:r/:g/:b" component={RGB} />
                  <Route render={() => <div>Not Found</div>} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </div>
        </div>
      )}
    />
  </BrowserRouter>
);

const NavLink = props => (
  <li style={styles.navItem}>
    <Link {...props} style={{ color: "inherit" }} />
  </li>
);

const HSL = ({ match: { params } }) => (
  <div
    style={{
      ...styles.fill,
      ...styles.hsl,
      background: `hsl(${params.h}, ${params.s}%, ${params.l}%)`
    }}
  >
    hsl({params.h}, {params.s}%, {params.l}%)
  </div>
);

const RGB = ({ match: { params } }) => (
  <div
    style={{
      ...styles.fill,
      ...styles.rgb,
      background: `rgb(${params.r}, ${params.g}, ${params.b})`
    }}
  >
    rgb({params.r}, {params.g}, {params.b})
  </div>
);

const styles = {};

styles.fill = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};

styles.content = {
  ...styles.fill,
  top: "40px",
  textAlign: "center"
};

styles.nav = {
  padding: 0,
  margin: 0,
  position: "absolute",
  top: 0,
  height: "40px",
  width: "100%",
  display: "flex"
};

styles.navItem = {
  textAlign: "center",
  flex: 1,
  listStyleType: "none",
  padding: "10px"
};

styles.hsl = {
  ...styles.fill,
  color: "white",
  paddingTop: "20px",
  fontSize: "30px"
};

styles.rgb = {
  ...styles.fill,
  color: "white",
  paddingTop: "20px",
  fontSize: "30px"
};

export default AnimationRoute;


```

```
//App.css


/*这里定义整个应用加载时的动画，进场前这里设置了缩放为0，
进场过程中缩放变为1，也就是100%，持续时间为500ms，
时间曲是ease-out，一种先快后慢的变化曲线*/

.appAppear-appear{
  opacity: 0;
  transform: scale(0);
}

.appAppear-appear.appAppear-appear-active{
  opacity: 1;
  transform: scale(1);
  transition: 500ms ease-out;
}

/*设置进场前透明度为0，防缩为0*/

.fade-enter {
  opacity: 0;
  transform: scale(0);
}


/*设置进场过程中 透明度为1，防缩为1，放缩的位置为左上角，持续时间为500ms，时间曲是ease-out */
.fade-enter.fade-enter-active {
  opacity: 1;
  transform: scale(1);
  transform-origin: top left;
  transition: 800ms ease-out;
}

/*设置退场前透明度为1，防缩为1*/
.fade-exit{
  opacity: 1;
  transform: scale(1);
}

/*设置退场过程中 透明度为0，防缩为0，放缩的位置默认是中间，所以不设置也可以，
持续时间为500ms，时间曲是ease-out */
.fade-exit.fade-exit-active{
  opacity:0;
  transform: scale(0);
  transition: 800ms ease-out;
}

```

