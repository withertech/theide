import * as React from 'react';
import { injectable, postConstruct, inject } from 'inversify';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService, } from '@theia/core';
import { WorkspaceService } from '@theia/workspace/lib/browser';
import { Nic } from './components/theide-extension-nic';
import { Sdk } from './components/theide-extension-sdk';
export var root: string = "/";


@injectable()
export class TheideExtensionWidget extends ReactWidget {

    static readonly ID = 'theide-extension-theos:widget';
    static readonly LABEL = 'Theos';
    @inject(MessageService)
    protected readonly messageService!: MessageService;
    @inject(WorkspaceService) protected readonly workspaceService: WorkspaceService;

    @postConstruct()
    protected async init(): Promise < void> {
        this.id = TheideExtensionWidget.ID;
        this.title.label = TheideExtensionWidget.LABEL;
        this.title.caption = TheideExtensionWidget.LABEL;
        this.title.closable = false;
        this.title.iconClass = 'fa fa-window-maximize'; // example widget icon
        if (this.workspaceService.workspace) root = this.workspaceService.workspace.resource.path.toString();
        this.update();
    }

    protected render(): React.ReactNode {
        return (
            <div id='widget-container'>
                <Nic/>
                <br/>
                <Sdk/>
            </div>
        );
    }



}
