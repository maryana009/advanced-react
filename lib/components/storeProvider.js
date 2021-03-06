import React from 'react';
import PropTypes from 'prop-types';

const storeProvider = (extraProps=()=>({})) => (Component) => {
  return class extends React.PureComponent {
    static displayName=`${Component.name}Container`;
    static contextTypes = {
      store: PropTypes.object
    };

    onStoreChange = () => {
      if(this.subscriptionId)
        this.forceUpdate();
    }
    componentDidMount () {
      this.subscriptionId = this.context.store.subscribe(this.onStoreChange);
      this.subscriptionId = null;
    }
  
    componentWillUnmount () {
      this.context.store.unsubscribe(this.subscriptionId);
    }

    render () {
      return <Component 
        {...this.props} 
        {...extraProps(this.context.store, this.props)} 
        store={this.context.store} />;
    }
  };
  ////*******Functional Component**********
  // const WithStore = (props, { store }) =>
  //   <Component {...props} store={store} />;

  // WithStore.contextTypes = {
  //   store: PropTypes.object
  // };

  // WithStore.displayName=`${Component.name}Container`;
  // return WithStore;
};

export default storeProvider;