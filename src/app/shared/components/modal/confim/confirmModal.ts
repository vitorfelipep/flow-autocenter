import { ComponentModalConfig, ModalSize} from 'ng2-semantic-ui';

import { IConfirmModalContext } from './IConfirmModalContext.interface';
import { ConfimComponent } from './confim.component';

export class ConfirmModal extends ComponentModalConfig<IConfirmModalContext, void, void> {
    constructor(title: string, question: string, size: ModalSize) {
      super(ConfimComponent, { title, question });

      this.isClosable = false;
      // this.isFullScreen = true;
      this.transitionDuration = 500;
      // this.isBasic  = true;
      this.size = size;
    }
}
