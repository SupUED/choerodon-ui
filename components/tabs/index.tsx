import React, {
  Children,
  ClassicComponentClass,
  cloneElement,
  Component,
  CSSProperties,
  MouseEventHandler,
  ReactElement,
  ReactNode,
} from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import Icon from '../icon';
import warning from '../_util/warning';
import isFlexSupported from '../_util/isFlexSupported';
import RcTabs, { TabContent, TabPane } from '../rc-components/tabs';
import omit from 'lodash/omit';
import TabBar from './TabBar';
import { generateKey } from '../rc-components/tabs/utils';
import { Size } from '../_util/enum';
import { TabsPosition, TabsType } from './enum';
import { getPrefixCls } from '../configure';

export interface TabsProps {
  activeKey?: string;
  defaultActiveKey?: string;
  hideAdd?: boolean;
  onChange?: (activeKey: string) => void;
  onTabClick?: Function;
  onPrevClick?: MouseEventHandler<any>;
  onNextClick?: MouseEventHandler<any>;
  tabBarExtraContent?: ReactNode | null;
  tabBarStyle?: CSSProperties;
  type?: TabsType;
  tabPosition?: TabsPosition;
  onEdit?: (targetKey: string | React.MouseEvent<HTMLElement>, action: any) => void;
  size?: Size;
  style?: CSSProperties;
  prefixCls?: string;
  className?: string;
  animated?: boolean | { inkBar: boolean; tabPane: boolean };
  tabBarGutter?: number;
  renderTabBar?: (
    props: TabsProps,
    DefaultTabBar: React.ComponentClass<any>,
  ) => React.ReactElement<any>;
}

// Tabs
export interface TabPaneProps {
  /** 选项卡头显示文字 */
  tab?: ReactNode | string;
  style?: CSSProperties;
  closable?: boolean;
  className?: string;
  disabled?: boolean;
  forceRender?: boolean;
}

export default class Tabs extends Component<TabsProps, any> {
  static displayName = 'Tabs';

  static TabPane = TabPane as ClassicComponentClass<TabPaneProps>;

  static defaultProps = {
    hideAdd: false,
  };

  createNewTab: MouseEventHandler<HTMLElement> = targetKey => {
    const { onEdit } = this.props;
    if (onEdit) {
      onEdit(targetKey, 'add');
    }
  };

  removeTab = (targetKey: string, e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!targetKey) {
      return;
    }

    const { onEdit } = this.props;
    if (onEdit) {
      onEdit(targetKey, 'remove');
    }
  };

  handleChange = (activeKey: string) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(activeKey);
    }
  };

  componentDidMount() {
    const NO_FLEX = ' no-flex';
    const tabNode = findDOMNode(this) as HTMLElement;
    if (tabNode && !isFlexSupported() && tabNode.className.indexOf(NO_FLEX) === -1) {
      tabNode.className += NO_FLEX;
    }
  }

  render() {
    const {
      prefixCls: customizePrefixCls,
      className = '',
      size,
      type = TabsType.line,
      tabPosition,
      children,
      hideAdd,
      animated = true,
    } = this.props;
    let { tabBarExtraContent } = this.props;
    const prefixCls = getPrefixCls('tabs', customizePrefixCls);
    let tabPaneAnimated = typeof animated === 'object' ? animated.tabPane : animated;

    // card tabs should not have animation
    if (type !== TabsType.line) {
      tabPaneAnimated = 'animated' in this.props ? tabPaneAnimated : false;
    }

    const isCard = type === TabsType.card || type === TabsType['editable-card'];

    warning(
      !(isCard && (size === Size.small || size === Size.large)),
      "Tabs[type=card|editable-card] doesn't have small or large size, it's by designed.",
    );
    const cls = classNames(className, `${prefixCls}-${type}`, {
      [`${prefixCls}-vertical`]:
        tabPosition === TabsPosition.left || tabPosition === TabsPosition.right,
      [`${prefixCls}-${size}`]: !!size,
      [`${prefixCls}-card`]: isCard,
      [`${prefixCls}-no-animation`]: !tabPaneAnimated,
    });
    // only card type tabs can be added and closed
    let childrenWithClose: ReactElement<any>[] = [];
    if (type === TabsType['editable-card']) {
      childrenWithClose = [];
      Children.forEach(children as ReactNode, (child: ReactElement<any>, index) => {
        let closable = child.props.closable;
        closable = typeof closable === 'undefined' ? true : closable;
        const closeIcon = closable ? (
          <Icon type="close" onClick={e => this.removeTab(child.key as string, e)} />
        ) : null;
        childrenWithClose.push(
          cloneElement(child, {
            tab: (
              <div className={closable ? undefined : `${prefixCls}-tab-unclosable`}>
                {child.props.tab}
                {closeIcon}
              </div>
            ),
            key: generateKey(child.key, index),
          }),
        );
      });
      // Add new tab handler
      if (!hideAdd) {
        tabBarExtraContent = (
          <span>
            <Icon type="plus" className={`${prefixCls}-new-tab`} onClick={this.createNewTab} />
            {tabBarExtraContent}
          </span>
        );
      }
    }

    tabBarExtraContent = tabBarExtraContent ? (
      <div className={`${prefixCls}-extra-content`}>{tabBarExtraContent}</div>
    ) : null;

    const { ...tabBarProps } = this.props;

    const renderTabBar = () => (
      <TabBar {...omit(tabBarProps, ['className'])} tabBarExtraContent={tabBarExtraContent} />
    );

    return (
      <RcTabs
        {...this.props}
        prefixCls={prefixCls}
        className={cls}
        tabBarPosition={tabPosition}
        renderTabBar={renderTabBar}
        renderTabContent={() => <TabContent animated={tabPaneAnimated} animatedWithMargin />}
        onChange={this.handleChange}
      >
        {childrenWithClose.length > 0 ? childrenWithClose : children}
      </RcTabs>
    );
  }
}
