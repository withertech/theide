/**
 * Generated using theia-extension-generator
 */
import { TheideExtensionCommandContribution, TheideExtensionMenuContribution } from './theide-extension-contribution';
import {
    CommandContribution,
    MenuContribution
} from "@theia/core/lib/common";
import { ContainerModule } from "inversify";

export default new ContainerModule(bind => {
    // add your contribution bindings here
    bind(CommandContribution).to(TheideExtensionCommandContribution);
    bind(MenuContribution).to(TheideExtensionMenuContribution);
});
