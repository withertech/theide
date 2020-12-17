import * as React from "react"
import { injectable, postConstruct, inject } from "inversify"
import { ReactWidget } from "@theia/core/lib/browser/widgets/react-widget"
import { WorkspaceService } from "@theia/workspace/lib/browser"
import { Project } from "../components/theide-extension-project-component"
export var root: string = "/"

@injectable()
export class TheideProjectExtensionWidget extends ReactWidget {
    static readonly ID = "theide-extension-project:widget"
    static readonly LABEL = "Project Manager"

    @inject(WorkspaceService)
    protected readonly workspaceService: WorkspaceService


    @postConstruct()
    protected async init(): Promise<void> {
        this.id = TheideProjectExtensionWidget.ID
        this.title.label = TheideProjectExtensionWidget.LABEL
        this.title.caption = TheideProjectExtensionWidget.LABEL
        this.title.closable = false
        this.title.iconClass = "fa fa-folder-open"
        
        if (this.workspaceService.workspace)
            root = this.workspaceService.workspace.resource.path.toString()
        this.update()
    }
    protected render(): React.ReactNode {
        return (
            <div id="widget-container">
                <button className='theia-button' title='Refresh' onClick={() => this.update()}><i className="fa fa-refresh"></i></button>
                <br/>
                <Project/>
                <br/>
            </div>
        )
    }
}
