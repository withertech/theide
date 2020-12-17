import { ContainerModule } from "inversify"
import { TheideProjectExtensionWidget } from "./widgets/theide-extension-project-widget"
import { TheideProjectExtensionContribution } from "./contributions/theide-extension-project-contribution"
import { TheideSdkExtensionWidget } from "./widgets/theide-extension-sdk-widget"
import { TheideSdkExtensionContribution } from "./contributions/theide-extension-sdk-contribution"
import { TheideDeviceExtensionWidget } from "./widgets/theide-extension-device-widget"
import { TheideDeviceExtensionContribution } from "./contributions/theide-extension-device-contribution"
import { TheideInstallExtensionWidget } from "./widgets/theide-extension-install-widget"
import { TheideInstallExtensionContribution } from "./contributions/theide-extension-install-contribution"
import {
    bindViewContribution,
    FrontendApplicationContribution,
    WidgetFactory,
} from "@theia/core/lib/browser"

import "../../src/browser/style/index.css"

export default new ContainerModule(bind => {
    bindViewContribution(bind, TheideProjectExtensionContribution)
    bind(FrontendApplicationContribution).toService(TheideProjectExtensionContribution)
    bind(TheideProjectExtensionWidget).toSelf()
    bind(WidgetFactory)
        .toDynamicValue(ctx => ({
            id: TheideProjectExtensionWidget.ID,
            createWidget: () =>
                ctx.container.get<TheideProjectExtensionWidget>(TheideProjectExtensionWidget),
        }))
        .inSingletonScope()
    bindViewContribution(bind, TheideSdkExtensionContribution)
    bind(FrontendApplicationContribution).toService(TheideSdkExtensionContribution)
    bind(TheideSdkExtensionWidget).toSelf()
    bind(WidgetFactory)
        .toDynamicValue(ctx => ({
            id: TheideSdkExtensionWidget.ID,
            createWidget: () =>
                ctx.container.get<TheideSdkExtensionWidget>(TheideSdkExtensionWidget),
        }))
        .inSingletonScope()
    bindViewContribution(bind, TheideDeviceExtensionContribution)
    bind(FrontendApplicationContribution).toService(TheideDeviceExtensionContribution)
    bind(TheideDeviceExtensionWidget).toSelf()
    bind(WidgetFactory)
        .toDynamicValue(ctx => ({
            id: TheideDeviceExtensionWidget.ID,
            createWidget: () =>
                ctx.container.get<TheideDeviceExtensionWidget>(TheideDeviceExtensionWidget),
        }))
        .inSingletonScope()
    bindViewContribution(bind, TheideInstallExtensionContribution)
    bind(FrontendApplicationContribution).toService(TheideInstallExtensionContribution)
    bind(TheideInstallExtensionWidget).toSelf()
    bind(WidgetFactory)
        .toDynamicValue(ctx => ({
            id: TheideInstallExtensionWidget.ID,
            createWidget: () =>
                ctx.container.get<TheideInstallExtensionWidget>(TheideInstallExtensionWidget),
        }))
        .inSingletonScope()
})
