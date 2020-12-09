import * as React from 'react';
import shortid from 'shortid';
import * as path from 'path';
import * as fse from 'fs-extra'
import { root } from '../theide-extension-widget';
import { SdkInterface, SdkFormInterface, SdkItemInterface, SdkListInterface } from '../theide-extension-interfaces'
const SdkForm = (props: SdkFormInterface) => {

    const [versionState, setVersionState] = React.useState('');
    const [pathState, setPathState] = React.useState('');
    const [workingState, setWorkingState] = React.useState(false);

    function handleInputChange(event: {target: any}) {
        setVersionState(event.target.value);
        setPathState(root + '/theos/sdks/iPhoneOS' + event.target.value + '.sdk');
    }

    function handleInputEnter() {
        if (versionState !== "")
        {
            const newSdk: SdkInterface = {
                id: shortid.generate(),
                version: versionState,
                path: pathState
            }
            setWorkingState(true);
            props.handleSdkCreate(newSdk);
            setWorkingState(false);
        }

    }
    let content;
    if(fse.existsSync(path.join(root, 'theos')))
    {
        if (!workingState)
        {
            content = (
                <div className="theia-container">
                    <select className='theia-select' defaultValue="" onChange={handleInputChange}>
                        <option value="">select</option>
                        <option value="11.2">11.2</option>
                        <option value="10.3">10.3</option>
                        <option value="9.3">9.3</option>
                    </select>
                    <button className='theia-button' title='Download' onClick={() => handleInputEnter()}>Download</button><br/><h1></h1>
                </div>
            );
        }
        else
        {
            content = (
                <div className="theia-container">
                    <select className='theia-select' defaultValue="" onChange={handleInputChange}>
                        <option value="">select</option>
                        <option value="11.2">11.2</option>
                        <option value="10.3">10.3</option>
                        <option value="9.3">9.3</option>
                    </select>
                    <button disabled className='theia-button' title='Downloading...' onClick={() => handleInputEnter()}>Downloading...</button><br/><h1></h1>
                </div>
            );
        }
    }
    else
    {
        content = (
            <div className="theia-container">
                <select className='theia-select' defaultValue="" onChange={handleInputChange}>
                    <option value="">select</option>
                    <option value="11.2">11.2</option>
                    <option value="10.3">10.3</option>
                    <option value="9.3">9.3</option>
                </select>
                <button disabled className='theia-button' title='Download' onClick={() => handleInputEnter()}>Download</button><br/><h1></h1>
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
        <h2>{props.sdk.version}</h2>
        <h3>{props.sdk.path}</h3>
        <button className='theia-button' title='Remove' onClick={() => props.handleSdkRemove(props.sdk.id)}>Remove</button><br/>
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
        const dirs = getDirectories(path.join(root, 'theos/sdks'))
        var newSdksState: SdkInterface[] = [];
        if (dirs === undefined || dirs.length == 0) 
        {
            return newSdksState;
        }
        dirs.forEach((sdk: string) => {
            var s1 = sdk.substring(8, sdk.length);
            var s2 = s1.substring(0, s1.length - 4);
            const newSdk: SdkInterface = {
                id: shortid.generate(),
                version: s2,
                path: root + '/theos/sdks/iPhoneOS' + s2 + '.sdk'
            }
            newSdksState.push(newSdk);      
        });
        return newSdksState;
    }
    function getDirectories(path: string) {
        if (fse.existsSync(path))
        {
            return fse.readdirSync(path).filter(function (file) {
                return fse.statSync(path+'/'+file).isDirectory();
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
    function handleSdkRemove(id: string) {
        fse.rmdirSync(sdks.find((sdk: SdkInterface) => sdk.id === id)!.path, { recursive: true });
        const newSdksState: SdkInterface[] = sdks.filter((sdk: SdkInterface) => sdk.id !== id);
        setSdks(newSdksState);
    }

    return (
        <div className="theia-container">
            <h1>SDK Manager</h1>
            <SdkForm
                sdks={sdks}
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
