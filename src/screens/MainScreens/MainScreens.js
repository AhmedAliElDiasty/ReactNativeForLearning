import {Navigation} from 'react-native-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';

export const startTabs = () =>{
    Promise.all([
        Icon.getImageSource("map"),
        Icon.getImageSource("share", 30),
        Icon.getImageSource("align-justify",20)
    ]).then((sources)=> {

        Navigation.setRoot({
            root: {
                sideMenu: {
                    right: {
                      component: {
                        id: "SideMenu.left",
                        name: 'test.sideMenu',
                        passProps: {
                          text: 'This is a left side menu screen'
                        }
                      }
                    },
                    center: {
                          id: "AppRoot",
                              bottomTabs: {
                                  children: [{
                                    stack: {
                                      children: [{
                                        component: {
                                          name: 'test.FindPlace',
                                          passProps: {
                                            text: 'This is tab 1',
                                          }
                                        }
                                      }],
                                      options: {
                                        bottomTab: {
                                          text: 'Find Place',
                                          icon: sources[0],
                                          testID: 'Find Place',
                                          iconColor: 'red',
                                          selectedIconColor: 'blue',
                                          textColor: 'red',
                                          selectedTextColor: 'blue',
                                          fontFamily: 'Helvetica',
                                        }
                                      }
                                    }
                                  },
                                  {
                                      stack: {
                                        children: [{
                                          component: {
                                            name: 'test.SharePlace',
                                            passProps: {
                                              text: 'SharePlace',
                                            }
                                          }
                                        }],
                                        options: {
                                          bottomTab: {
                                            text: 'Share Place',
                                            icon: sources[1],
                                            testID: 'Share Place',
                                            iconColor: 'red',
                                            selectedIconColor: 'blue',
                                            textColor: 'red',
                                            selectedTextColor: 'blue',
                                            fontFamily: 'Helvetica',
                                          }
                                        }
                                      }
                                    },
                                ],
                                
                                  
                                },
                        },
                },
            }
        })
    });
  
}; 

export const Login = ()=>{
    Navigation.setRoot({
        root: {
          stack: {
            children: [{
              component: {
                name: 'test.signIn',
                passProps: {
                  text: 'stack with one child'
                }
              }
            }],
            options: {
              topBar: {
                title: {
                  text: 'Login'
                }
              }
            }
          }
        }
      });
}