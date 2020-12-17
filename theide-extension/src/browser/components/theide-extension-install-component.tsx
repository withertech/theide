import * as React from 'react';
import * as path from 'path';
import { root } from '../widgets/theide-extension-project-widget';
import  * as fs from 'fs-extra';
export class Install extends React.Component {
	public state: any;
    public setState: any;

    constructor(props: any) {
        super(props);
        this.state = {
            working: false
        };

    }



    theos(): void {
        const rootPath = require('electron-root-path').rootPath;
        const process = require('child_process');
        const script: string = path.join(rootPath, 'files/theos').toString();
        var cmd: string = `${script} -d ${root}`;
        this.setState({
            working: true
        });
        const theos = process.exec(cmd);
        theos.stdout.on('data', (data: any)=>{
            console.log(data); 
            // do whatever you want here with data
        });
        theos.stderr.on('data', (data: any)=>{
            console.error(data);
        });
        theos.on('exit', ()=>{
            this.setState({
                working: false
            });
            window.location.reload();
        });
    }

    render() {
        let content;
        if(fs.existsSync(path.join(root, 'theos')))
        {
           content = (<h3>Theos is installed at {path.join(root, 'theos')}</h3> );
        }
        else
        {
            if (!this.state.working)
            {
                content = (
                    <div>
                        <h3>Theos is not installed in this workspace<br/></h3>
                        <button className='theia-button' title='Install Theos' onClick={() => this.theos()}>Install Theos</button><br/><h1></h1>
                    </div>
                );
            }
            else
            {
                content = (
                    <div>
                        <h3>Theos is being installed in this workspace...<br/></h3>
                        <button disabled className='theia-button' title='Install Theos' onClick={() => this.theos()}>Install Theos</button><br/><h1></h1>
                    </div>
                );   
            }

        }
        return (
            <div className='theia-container'>
                <h1>Theos Installer</h1>
                {content}
            </div>
        );
    }
}