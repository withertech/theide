import * as React from 'react';
import { injectable, postConstruct, inject } from 'inversify';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService, } from '@theia/core';
import { WorkspaceService } from '@theia/workspace/lib/browser';
import { Nic } from './components/theide-extension-nic';
import { Sdk } from './components/theide-extension-sdk';
import { Install } from './components/theide-extension-install';
export var root: string = "/";


@injectable()
export class Logger
{

    @inject(MessageService)
    protected static readonly messageService: MessageService;
    static showLog(data: string)
    {
        this.messageService.log(data);
    }

    static showInfo(data: string)
    {
        this.messageService.info(data);
    }

    static showWarn(data: string)
    {
        this.messageService.warn(data);
    }

    static showError(data: string)
    {
        this.messageService.error(data);
    }
}

@injectable()
export class TheideExtensionWidget extends ReactWidget {

    static readonly ID = 'theide-extension-theos:widget';
    static readonly LABEL = 'Theos';

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
                <br/>
                <Install/>
            </div>
        );
    }



}
