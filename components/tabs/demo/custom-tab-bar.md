---
order: 12
title:
  zh-CN: 自定义页签头
  en-US: Customized bar of tab
---

## zh-CN

使用 react-sticky 组件实现吸顶效果。

## en-US

Use react-sticky.

```jsx
import { Tabs } from 'choerodon-ui';
import { StickyContainer, Sticky } from 'react-sticky';

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

const style = {
  position: 'relative',
  display: 'inline-block',
  width: 30,
  height: 28,
  margin: 1,
  textAlign: 'center',
  lineHeight: '28px',
  border: '1px solid transparent',
  cursor: 'pointer',
};

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />
    )}
  </Sticky>
);

ReactDOM.render(
  <StickyContainer>
    <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
      <TabPane tab="Tab 1" key="1" style={{ height: 200 }}>
        Content of Tab Pane 1
      </TabPane>
      <TabPane tab="Tab 2" key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="Tab 3" key="3">
        Content of Tab Pane 3
      </TabPane>
      <TabPane tab="Tab 4" key="4">
        Content of tab 4
      </TabPane>
      <TabPane tab="Tab 5" key="5">
        Content of tab 5
      </TabPane>
      <TabPane tab="Tab 6" key="6">
        Content of tab 6
      </TabPane>
      <TabPane tab="Tab 7" key="7">
        Content of tab 7
      </TabPane>
      <TabPane tab="Tab 8" key="8">
        Content of tab 8
      </TabPane>
      <TabPane tab="Tab 9" key="9">
        Content of tab 9
      </TabPane>
      <TabPane tab="Tab 10" key="10">
        Content of tab 10
      </TabPane>
      <TabPane tab="Tab 11" key="11">
        Content of tab 11
      </TabPane>
    </Tabs>
  </StickyContainer>,
  mountNode,
);
```

```css
.site-custom-tab-bar {
  z-index: 1;
  background: #fff;
}
```

<style>
  [data-theme="dark"] .site-custom-tab-bar {
    background: #141414;
  }
</style>
