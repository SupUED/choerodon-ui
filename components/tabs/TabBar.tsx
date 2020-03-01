import * as React from 'react';
import ScrollableInkTabBar from '../rc-components/tabs/ScrollableInkTabBar';
import classNames from 'classnames';

import { TabsProps } from './index';

export default class TabBar extends React.Component<TabsProps> {
  static defaultProps = {
    animated: true,
    type: 'line',
  };

  renderTabBar = () => {
    const {
      tabBarStyle,
      animated,
      renderTabBar,
      tabBarExtraContent,
      tabPosition,
      prefixCls,
      className,
      size,
      type,
    } = this.props;
    const inkBarAnimated = typeof animated === 'object' ? animated.inkBar : animated;

    // Additional className for style usage
    const cls: string = classNames(
      `${prefixCls}-${tabPosition}-bar`,
      {
        [`${prefixCls}-${size}-bar`]: !!size,
        [`${prefixCls}-card-bar`]: type && type.indexOf('card') >= 0,
      },
      className,
    );

    const renderProps = {
      ...this.props,
      children: null,
      inkBarAnimated,
      extraContent: tabBarExtraContent,
      style: tabBarStyle,
      className: cls,
    };

    let RenderTabBar: React.ReactElement<any>;

    if (renderTabBar) {
      RenderTabBar = renderTabBar(renderProps, ScrollableInkTabBar);
    } else {
      RenderTabBar = <ScrollableInkTabBar {...renderProps} />;
    }

    return React.cloneElement(RenderTabBar);
  };

  render() {
    return this.renderTabBar();
  }
}
