import * as React from 'react';
import shortid from 'shortid';
import * as path from 'path';
import * as fs from 'fs-extra'
import { root } from '../theide-extension-widget';
import { SdkInterface, SdkFormInterface, SdkItemInterface, SdkListInterface } from '../theide-extension-interfaces'
const SdkForm = (props: SdkFormInterface) => {

    const [versionState, setVersionState] = React.useState('');
    const [pathState, setPathState] = React.useState('');
    const [workingState, setWorkingState] = React.useState(false);

    function handleInputChange(event: {target: any}) {
        setVersionState(event.target.value);
        setPathState(root + '/theos/sdkstorage/iPhoneOS' + event.target.value + '.sdk');
    }

    function handleInputEnter() {
        if (versionState !== "")
        {
            const newSdk: SdkInterface = {
                id: shortid.generate(),
                version: versionState,
                path: pathState,
                active: false
            }
            setWorkingState(true);
            props.handleSdkCreate(newSdk);
            setWorkingState(false);
        }

    }
    let content;
    if(fs.existsSync(path.join(root, 'theos')))
    {
        
        if (!workingState)
        {
            content = (
                <div className="theia-container">
                    <h3>SDK Downloader</h3>
                    <select className='theia-select' defaultValue="" onChange={handleInputChange}>
                        <option value="">select</option>
                        <option value="11.2">11.2</option>
                        <option value="10.3">10.3</option>
                        <option value="9.3">9.3</option>
                    </select>
                    <button className='theia-button' title='Download' onClick={() => handleInputEnter()}>Download</button><br/>
                    <h3>SDK Selection</h3>
                    <select className='theia-select' defaultValue={props.sdks.find((sdk: SdkInterface) => sdk.active === true)?.version} onChange={(e) => props.handleSelectionChange(props.sdks.find((sdk: SdkInterface) => sdk.version === e.target.value)!.id)}>
                        <option value="">select</option>
                        {props.sdks.map((sdk) => (
                            <option value={sdk.version}>{sdk.version}</option>
                        ))}
                    </select><br/><h1></h1>
                </div>
            );
        }
        else
        {
            content = (
                <div className="theia-container">
                    <h3>SDK Downloader</h3>
                    <select disabled className='theia-select' defaultValue="" onChange={handleInputChange}>
                        <option value="">select</option>
                        <option value="11.2">11.2</option>
                        <option value="10.3">10.3</option>
                        <option value="9.3">9.3</option>
                    </select>
                    <button disabled className='theia-button' title='Downloading...' onClick={() => handleInputEnter()}>Downloading...</button><br/>
                    <h3>SDK Selection</h3>
                    <select disabled className='theia-select' defaultValue={props.sdks.find((sdk: SdkInterface) => sdk.active === true)?.version} onChange={(e) => props.handleSelectionChange(props.sdks.find((sdk: SdkInterface) => sdk.version === e.target.value)!.id)}>
                        <option value="">select</option>
                        {props.sdks.map((sdk) => (
                            <option value={sdk.version}>{sdk.version}</option>
                        ))}
                    </select><br/><h1></h1>
                </div>
            );
        }
    }
    else
    {
        content = (
            <div className="theia-container">
                <h3>SDK Downloader</h3>
                <select disabled className='theia-select' defaultValue="" onChange={handleInputChange}>
                    <option value="">select</option>
                    <option value="11.2">11.2</option>
                    <option value="10.3">10.3</option>
                    <option value="9.3">9.3</option>
                </select>
                <button disabled className='theia-button' title='Download' onClick={() => handleInputEnter()}>Download</button><br/>
                <h3>SDK Selection</h3>
                <select disabled className='theia-select' defaultValue={props.sdks.find((sdk: SdkInterface) => sdk.active === true)?.version} onChange={(e) => props.handleSelectionChange(props.sdks.find((sdk: SdkInterface) => sdk.version === e.target.value)!.id)}>
                    <option value="">select</option>
                    {props.sdks.map((sdk) => (
                        <option value={sdk.version}>{sdk.version}</option>
                    ))}
                </select><br/><h1></h1>
            </div>
        );
    }
    return (
        <div>{content}</div>
    );
}

const SdkItem = (props: SdkItemInterface) => {
  return (
    <div className='theia-container'>
        <h3>{props.sdk.version}</h3>
        <h3>{props.sdk.path}</h3>
        <h3>{props.sdk.active ? 'active' : 'inactive'}</h3>
        <button className='theia-button' title='Remove' onClick={() => props.handleSdkRemove(props.sdk.id)}>Remove</button><br/><h1></h1>
    </div>
  )
}

const SdkList = (props: SdkListInterface) => {
  return (
    <div className="theia-container">
        {props.sdks.map((sdk) => (
          <div key={sdk.id}>
            <SdkItem
              sdk={sdk}
              handleSdkUpdate={props.handleSdkUpdate}
              handleSdkRemove={props.handleSdkRemove}
            />
          </div>
        ))}
    </div>
  )
}

export const Sdk = () =>
{
    const [sdks, setSdks] = React.useState<SdkInterface[]>(detectSdks())
    function detectSdks() : SdkInterface[]
    {
        var newSdksState: SdkInterface[] = [];
        const actdirs = getDirectories(path.join(root, 'theos/sdks'));
        if (actdirs !== undefined && actdirs.length != 0) 
        {
            actdirs.forEach((sdk: string) => {
                var s1 = sdk.substring(8, sdk.length);
                var s2 = s1.substring(0, s1.length - 4);
                const newSdk: SdkInterface = {
                    id: shortid.generate(),
                    version: s2,
                    path: root + '/theos/sdks/iPhoneOS' + s2 + '.sdk',
                    active: true
                }
                newSdksState.push(newSdk);      
            });
        }

        const strdirs = getDirectories(path.join(root, 'theos/sdkstorage'));
        if (strdirs !== undefined && strdirs.length != 0) 
        {
            strdirs.forEach((sdk: string) => {
                var s1 = sdk.substring(8, sdk.length);
                var s2 = s1.substring(0, s1.length - 4);
                const newSdk: SdkInterface = {
                    id: shortid.generate(),
                    version: s2,
                    path: root + '/theos/sdkstorage/iPhoneOS' + s2 + '.sdk',
                    active: false
                }
                newSdksState.push(newSdk);      
            });
        }

        return newSdksState;
    }
    function getDirectories(path: string) {
        if (fs.existsSync(path))
        {
            return fs.readdirSync(path).filter(function (file) {
                return fs.statSync(path+'/'+file).isDirectory();
            });
        }

    }
    function handleSdkCreate(sdk: SdkInterface) {
        const rootPath = require('electron-root-path').rootPath;
        const process = require('child_process');
        const script: string = path.join(rootPath, 'files/sdk').toString();
        var cmd: string= `bash -c "${script} ${root} ${sdk.version}"`;
        const sdkd = process.exec(cmd);
        sdkd.stdout.on('data', (data: any)=>{
            console.log(data); 
        });
        sdkd.stderr.on('data', (data: any)=>{
            console.error(data);
        });
        sdkd.on('exit', ()=>{
            const newSdksState: SdkInterface[] = [...sdks]
            newSdksState.push(sdk)
            setSdks(newSdksState);
        });
    }
    function handleSdkUpdate(event: React.ChangeEvent<HTMLInputElement>, id: string) {
        const newSdksState: SdkInterface[] = [...sdks];
        newSdksState.find((sdk: SdkInterface) => sdk.id === id)!.version = event.target.value;
        setSdks(newSdksState);
    }
    function handleSelectionChange(id: string) {
        var templater = require('json-templater/object');
        const newSdksState: SdkInterface[] = [...sdks];
        const oldsel = newSdksState.find((sdk: SdkInterface) => sdk.active === true)?.path;
        if(oldsel != undefined && fs.existsSync(oldsel))
        {
            fs.moveSync(oldsel, oldsel.replace('sdks/', 'sdkstorage/'));
            newSdksState.find((sdk: SdkInterface) => sdk.active === true)!.path = oldsel.replace('sdks/', 'sdkstorage/');
            newSdksState.find((sdk: SdkInterface) => sdk.active === true)!.active = false;
        }
        const newsel = newSdksState.find((sdk: SdkInterface) => sdk.id === id)?.path;
        if (newsel != undefined && fs.existsSync(newsel))
        {
            fs.moveSync(newsel, newsel.replace('sdkstorage/', 'sdks/'));
            newSdksState.find((sdk: SdkInterface) => sdk.id === id)!.path = newsel.replace('sdkstorage/', 'sdks/');
            newSdksState.find((sdk: SdkInterface) => sdk.id === id)!.active = true;
        }
        var Json = templater(JSON.parse("{\r\n    \"ccls.clang.extraArgs\": [\r\n        \"-OsbjC\",\r\n        \"-target\",\r\n        \"arm64-apple-darwin14\",\r\n        \"-arch\",\r\n        \"arm64\",\r\n        \"-isysroot\",\r\n        \"${workspaceFolder}\/theos\/sdks\/iPhoneOS{{sdk}}.sdk\",\r\n        \"-iframeworkwithsysroot\",\r\n        \"\/System\/Library\/Frameworks\",\r\n        \"-iframeworkwithsysroot\",\r\n        \"\/System\/Library\/PrivateFrameworks\",\r\n        \"-I${workspaceFolder}\/theos\/include\",\r\n        \"-I${workspaceFolder}\/theos\/vendor\/include\",\r\n        \"-I${workspaceFolder}\/theos\/include\/_fallback\",\r\n        \"-DTARGET_IPHONE=1\",\r\n        \"-DDEBUG\",\r\n        \"-miphoneos-version-min=6.0\",\r\n        \"-fobjc-arc\",\r\n        \"-Wall\",\r\n        \"-Werror\"\r\n    ],\r\n    \"files.associations\": {\r\n        \"*.h\": \"objective-c\"\r\n    }\r\n}"), {sdk: newSdksState.find((sdk: SdkInterface) => sdk.id === id)!.version});
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
        setSdks(newSdksState);
    }
    function handleSdkRemove(id: string) {
        fs.rmdirSync(sdks.find((sdk: SdkInterface) => sdk.id === id)!.path, { recursive: true });
        const newSdksState: SdkInterface[] = sdks.filter((sdk: SdkInterface) => sdk.id !== id);
        setSdks(newSdksState);
    }

    return (
        <div className="theia-container">
            <h1>SDK Manager</h1>
            <SdkForm
                sdks={sdks}
                handleSelectionChange={handleSelectionChange}
                handleSdkCreate={handleSdkCreate}
            />

            <SdkList
                sdks={sdks}
                handleSdkUpdate={handleSdkUpdate}
                handleSdkRemove={handleSdkRemove}
            />
        </div>
    );
}
