import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux'
import ConfigureStore from './src/store/ConfigureStore'

const store = ConfigureStore();

export function registerScreens() {

  Navigation.registerComponentWithRedux('test.initializing', () => require('./src/screens/Initializing/Initializing').default,Provider,store);
  Navigation.registerComponentWithRedux('test.signIn', () => require('./src/screens/Login/SignIn').default,Provider,store);
  Navigation.registerComponentWithRedux('test.SharePlace', () => require('./src/screens/SharePlace/SharePlace').default,Provider,store);
  Navigation.registerComponentWithRedux('test.FindPlace', () => require('./src/screens/FindPlace/FindPlace').default,Provider,store);
  Navigation.registerComponentWithRedux('test.viewPlace', () => require('./src/screens/ViewPlace/ViewPlace').default,Provider,store);
  Navigation.registerComponentWithRedux('test.sideMenu',()=>require('./src/screens/SideMenu/SideMenu').default,Provider,store);
}