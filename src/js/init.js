import { defaults } from "./modules/defaults";
import { config } from "./config";
import { button } from "./modules/button";

var App = () => {};

App.prototype.init = () => {

	defaults.init();
	button.init();
	config.log('app init')
	
};

export { App };