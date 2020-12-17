import { injectable, inject } from "inversify"
import { TheideDeviceExtensionWidget } from "../widgets/theide-extension-device-widget"
import {
    AbstractViewContribution,
    FrontendApplication,
} from "@theia/core/lib/browser"
import { FrontendApplicationStateService } from "@theia/core/lib/browser/frontend-application-state"

@injectable()
export class TheideDeviceExtensionContribution extends AbstractViewContribution<
    TheideDeviceExtensionWidget
> {
    /**
     * `AbstractViewContribution` handles the creation and registering
     *  of the widget including commands, menus, and keybindings.
     *
     * We can pass `defaultWidgetOptions` which define widget properties such as
     * its location `area` (`main`, `left`, `right`, `bottom`), `mode`, and `ref`.
     *
     */
    @inject(FrontendApplicationStateService)
    protected readonly stateService: FrontendApplicationStateService

    constructor() {
        super({
            widgetId: TheideDeviceExtensionWidget.ID,
            widgetName: TheideDeviceExtensionWidget.LABEL,
            defaultWidgetOptions: { area: "right" },
        })
    }
    async onStart(app: FrontendApplication): Promise<void> {
        this.stateService
            .reachedState("ready")
            .then(() => this.openView({ reveal: false }))
    }
    /**
     * Example command registration to open the widget from the menu, and quick-open.
     * For a simpler use case, it is possible to simply call:
     ```ts
        super.registerCommands(commands)
     ```
     *
     * For more flexibility, we can pass `OpenViewArguments` which define 
     * options on how to handle opening the widget:
     * 
     ```ts
        toggle?: boolean
        activate?: boolean;
        reveal?: boolean;
     ```
     *
     * @param commands
     */

    /**
     * Example menu registration to contribute a menu item used to open the widget.
     * Default location when extending the `AbstractViewContribution` is the `View` main-menu item.
     * 
     * We can however define new menu path locations in the following way:
     ```ts
        menus.registerMenuAction(CommonMenus.HELP, {
            commandId: 'id',
            label: 'label'
        });
     ```
     * 
     * @param menus
     */
}
