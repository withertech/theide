import * as React from "react"
import { injectable, postConstruct, inject } from "inversify"
import { ReactWidget } from "@theia/core/lib/browser/widgets/react-widget"
import { WorkspaceService } from "@theia/workspace/lib/browser"
import { Device } from "../components/theide-extension-device-component"
export var root: string = "/"

@injectable()
export class TheideDeviceExtensionWidget extends ReactWidget {
    static readonly ID = "theide-extension-device:widget"
    static readonly LABEL = "Device Manager"

    @inject(WorkspaceService)
    protected readonly workspaceService: WorkspaceService


    @postConstruct()
    protected async init(): Promise<void> {
        this.id = TheideDeviceExtensionWidget.ID
        this.title.label = TheideDeviceExtensionWidget.LABEL
        this.title.caption = TheideDeviceExtensionWidget.LABEL
        this.title.closable = false
        this.title.iconClass = "fa fa-tablet"
        
        if (this.workspaceService.workspace)
            root = this.workspaceService.workspace.resource.path.toString()
        this.update()
    }
    protected render(): React.ReactNode {
        return (
            <div id="widget-container">
                <button className='theia-button' title='Refresh' onClick={() => this.update()}><i className="fa fa-refresh"></i></button>
                <br/>
                <Device/>
                <br/>
            </div>
        )
    }
}
