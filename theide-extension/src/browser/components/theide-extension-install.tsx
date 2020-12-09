import * as React from 'react';
import * as path from 'path';
import { root } from '../theide-extension-widget';
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
            var Json = JSON.parse("{\r\n    \"ccls.clang.extraArgs\": [\r\n        \"-OsbjC\",\r\n        \"-target\",\r\n        \"arm64-apple-darwin14\",\r\n        \"-arch\",\r\n        \"arm64\",\r\n        \"-isysroot\",\r\n        \"${workspaceFolder}\/theos\/sdks\/iPhoneOS11.2.sdk\",\r\n        \"-iframeworkwithsysroot\",\r\n        \"\/System\/Library\/Frameworks\",\r\n        \"-iframeworkwithsysroot\",\r\n        \"\/System\/Library\/PrivateFrameworks\",\r\n        \"-I${workspaceFolder}\/theos\/include\",\r\n        \"-I${workspaceFolder}\/theos\/vendor\/include\",\r\n        \"-I${workspaceFolder}\/theos\/include\/_fallback\",\r\n        \"-DTARGET_IPHONE=1\",\r\n        \"-DDEBUG\",\r\n        \"-miphoneos-version-min=6.0\",\r\n        \"-fobjc-arc\",\r\n        \"-Wall\",\r\n        \"-Werror\"\r\n    ],\r\n    \"files.associations\": {\r\n        \"*.h\": \"objective-c\"\r\n    }\r\n}");
            var extraArgs = Json['ccls.clang.extraArgs'];
            var fileAssociationsH = Json['files.associations']['*.h'];
            if (!fs.existsSync(path.join(root, '.vscode')))
            {
                fs.mkdirSync(path.join(root, '.vscode'));
            }
            if (!fs.existsSync(path.join(root, '.vscode/settings.json')))
            {
                fs.writeFileSync(path.join(root, '.vscode/settings.json'), JSON.stringify(Json, null, 4));
            }
            else
            {
                var JsonTmp = fs.readJSONSync(path.join(root, '.vscode/settings.json'));
                JsonTmp['ccls.clang.extraArgs'] = extraArgs;
                JsonTmp['files.associations']['*.h'] = fileAssociationsH;
                fs.writeFileSync(path.join(root, '.vscode/settings.json'), JSON.stringify(JsonTmp, null, 4));
            }
            this.setState({
                working: false
            });
            window.location.reload(false);
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