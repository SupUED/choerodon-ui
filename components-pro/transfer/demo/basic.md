---
order: 0
title:
  zh-CN: 基本使用
  en-US: Basic Usage
---

## zh-CN

基本使用。

## en-US

Basic Usage.

````jsx
import { Transfer, Switch } from 'choerodon-ui/pro';

function handleChange(value, oldValue) {
  console.log('[basic new]', value, '[basic old]', oldValue);
}

const { Option } = Transfer;

class App extends React.Component {
  state = { disabled: false };

  handleDisableChange = value => this.setState({ disabled: value });

  render() {
    return (
      <div>
        <Switch onChange={this.handleDisableChange}>disabled</Switch>
        <br />
        <Transfer onChange={handleChange} disabled={this.state.disabled} titles={['Source', 'Target']}>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="wu">Wu</Option>
        </Transfer>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  mountNode
);
````
