import { ContainerModule } from "inversify"
import { TheideExtensionWidget } from "./theide-extension-widget"
import { TheideExtensionContribution } from "./theide-extension-contribution"
import {
    bindViewContribution,
    FrontendApplicationContribution,
    WidgetFactory,
} from "@theia/core/lib/browser"

import "../../src/browser/style/index.css"

export default new ContainerModule(bind => {
    bindViewContribution(bind, TheideExtensionContribution)
    bind(FrontendApplicationContribution).toService(TheideExtensionContribution)
    bind(TheideExtensionWidget).toSelf()
    bind(WidgetFactory)
        .toDynamicValue(ctx => ({
            id: TheideExtensionWidget.ID,
            createWidget: () =>
                ctx.container.get<TheideExtensionWidget>(TheideExtensionWidget),
        }))
        .inSingletonScope()
})
