import { Container } from 'pixi.js';
import Config from '../Config';
import { App } from '../Facade';

export default class Preloader extends Container {
  constructor() {
    super();
  }

  // loading all needed resources and returns a promise
  loadContent() {
    return new Promise((resolve) => {
      let obj;
      // here we take all content objects that have to be loaded while preloading
      for (let cid in Config.initialCIDs) {
        obj = Config.content[cid]; // take content data of particular object
                
        // looping through each content object to find needed props
        Config.initialCIDs[cid].forEach(propName => {
          App.loader.add(obj[propName], Config.paths.imagesUri + obj[propName]); // adding new resource to list of loadings
        });
      }
      // is invoked when loading is done
      App.loader.load(() => {
        setTimeout(resolve, 100); // just to see the preloader
      });
    }).catch(err => {
      console.log('ERROR Preloader: loadContent: ', err);
    });
  }
}