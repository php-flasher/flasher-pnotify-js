import Flasher, { Envelope, FlasherInterface, FlasherOptions } from '@flasher/flasher';
import {
  notice, alert, info, success, error, Options, defaults,
} from '@pnotify/core';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

export default class PnotifyFactory implements FlasherInterface {
  render(envelope: Envelope): void {
    const { notification } = envelope;
    const options = {
      text: notification.title,
      ...notification.options,
    };

    switch (notification.type) {
      case 'success':
        success(options as Options);
        break;
      case 'alert':
      case 'warning':
        alert(options as Options);
        break;
      case 'info':
        info(options as Options);
        break;
      case 'error':
        error(options as Options);
        break;
      default:
        notice(options as Options);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  updateDefaultOptions(defaultOptions: any, options: FlasherOptions) {
    Object.entries(options).forEach(([option, value]) => {
      // eslint-disable-next-line no-param-reassign
      defaultOptions[option] = value;
    });
  }

  renderOptions(options: FlasherOptions): void {
    this.updateDefaultOptions(defaults, options);
  }
}

const flasher = Flasher.getInstance();
flasher.addFactory('pnotify', new PnotifyFactory());
