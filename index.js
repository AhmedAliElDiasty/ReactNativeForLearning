import { Navigation } from "react-native-navigation";
import {registerScreens} from './App'
registerScreens();


Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'test.initializing',
              options: {
                topBar: {
                  title: {
                    text: 'Initializing'
                  }
                }
              }
            }
          }
        ],
      }
    }
  });
});