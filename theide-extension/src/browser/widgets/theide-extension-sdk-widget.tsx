import * as React from "react"
import { injectable, postConstruct, inject } from "inversify"
import { ReactWidget } from "@theia/core/lib/browser/widgets/react-widget"
import { WorkspaceService } from "@theia/workspace/lib/browser"
import { Sdk } from "../components/theide-extension-sdk-component"
export var root: string = "/"


@injectable()
export class TheideSdkExtensionWidget extends ReactWidget {
    static readonly ID = "theide-extension-sdk:widget"
    static readonly LABEL = "Sdk Manager"

    @inject(WorkspaceService)
    protected readonly workspaceService: WorkspaceService


    @postConstruct()
    protected async init(): Promise<void> {
        this.id = TheideSdkExtensionWidget.ID
        this.title.label = TheideSdkExtensionWidget.LABEL
        this.title.caption = TheideSdkExtensionWidget.LABEL
        this.title.closable = false
        this.title.iconClass = "fa fa-code"
        
        if (this.workspaceService.workspace)
            root = this.workspaceService.workspace.resource.path.toString()
        this.update()
    }
    protected render(): React.ReactNode {
        return (
            <div id="widget-container">
                <button className='theia-button' title='Refresh' onClick={() => this.update()}><i className="fa fa-refresh"></i></button>
                <br/>
                <Sdk/>
                <br/>
            </div>
        )
    }
}
