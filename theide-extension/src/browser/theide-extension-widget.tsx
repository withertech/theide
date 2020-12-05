import * as React from 'react';
import { injectable, postConstruct, inject } from 'inversify';
import { ReactWidget } from '@theia/core/lib/browser/widgets/react-widget';
import { MessageService } from '@theia/core';

@injectable()
export class TheideExtensionWidget extends ReactWidget {

    static readonly ID = 'theide-extension-theos:widget';
    static readonly LABEL = 'Theos';

    @inject(MessageService)
    protected readonly messageService!: MessageService;

    @postConstruct()
    protected async init(): Promise < void> {
        this.id = TheideExtensionWidget.ID;
        this.title.label = TheideExtensionWidget.LABEL;
        this.title.caption = TheideExtensionWidget.LABEL;
        this.title.closable = false;
        this.title.iconClass = 'fa fa-window-maximize'; // example widget icon.
        this.update();
    }

    protected render(): React.ReactNode {
        return <div id='widget-container'>
            <select>
                <option value="iphone/activator_event">Activator Event</option>
                <option value="iphone/activator_listener">Activator Listener</option>
                <option value="iphone/application_modern">Application Modern</option>
                <option value="iphone/application_swift">Application Swift</option>
                <option value="iphone/cydget">Cydget</option>
                <option value="iphone/flipswitch_switch">Flipswitch Switch</option>
                <option value="iphone/framework">Framework</option>
                <option value="iphone/library">Library</option>
                <option value="iphone/notification_center_widget">Notification Center Widget</option>
                <option value="iphone/notification_center_widget-7up">Notification Center Widget 7up</option>
                <option value="iphone/preference_bundle_modern">Preference Bundle Modern</option>
                <option value="iphone/theme">Theme</option>
                <option value="iphone/tool">Tool</option>
                <option value="iphone/tool_swift">Tool Swift</option>
                <option selected value="iphone/tweak">Tweak</option>
                <option value="iphone/tweak_with_simple_preferences">Tweak With Simple Preferences</option>
                <option value="iphone/xpc_service">XPC Service</option>
            </select>
            <button className='theia-button secondary' title='NIC' onClick={_a => this.nic()}>NIC</button>
        </div>
    }

    protected nic(): void 
    {
        var Expect = require('node-expect');
        var process = require('duplex-child-process');
        var parser = new Expect();
        var nic = process.spawn('~/theos/bin/nic.pl')
        parser.conversation(/NIC 2.0 - New Instance Creator/i) 
            .sync()
            .expect(/Choose a Template/i)
                .send("15\n")
            .expect(/Project Name/)
                .send("test\n")
            .expect(/Package Name/)
                .send("com.withertech.test\n")
            .expect(/Author\/Maintainer Name/)
                .send("test\n")
            .expect(/MobileSubstrate Bundle filter/)
                .send("\n")
            .expect(/List of applications to terminate upon installation/)
                .send("\n")
        .monitor(nic);
    }

}
