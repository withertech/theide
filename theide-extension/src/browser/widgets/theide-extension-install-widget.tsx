import * as React from "react"
import { injectable, postConstruct, inject } from "inversify"
import { ReactWidget } from "@theia/core/lib/browser/widgets/react-widget"
import { WorkspaceService } from "@theia/workspace/lib/browser"
import { Install } from "../components/theide-extension-install-component"
export var root: string = "/"

@injectable()
export class TheideInstallExtensionWidget extends ReactWidget {
    static readonly ID = "theide-extension-install:widget"
    static readonly LABEL = "Theos Installer"

    @inject(WorkspaceService)
    protected readonly workspaceService: WorkspaceService


    @postConstruct()
    protected async init(): Promise<void> {
        this.id = TheideInstallExtensionWidget.ID
        this.title.label = TheideInstallExtensionWidget.LABEL
        this.title.caption = TheideInstallExtensionWidget.LABEL
        this.title.closable = false
        this.title.iconClass = "fa fa-wrench"
        
        if (this.workspaceService.workspace)
            root = this.workspaceService.workspace.resource.path.toString()
        this.update()
    }
    protected render(): React.ReactNode {
        return (
            <div id="widget-container">
                <button className='theia-button' title='Refresh' onClick={() => this.update()}><i className="fa fa-refresh"></i></button>
                <br/>
                <Install/>
                <br/>
            </div>
        )
    }
}
