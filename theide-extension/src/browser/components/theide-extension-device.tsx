import * as React from 'react';
import shortid from 'shortid';
import * as path from 'path';
import * as fs from 'fs-extra'
import { root } from '../theide-extension-widget';
import { DeviceInterface, DeviceFormInterface, DeviceItemInterface, DeviceListInterface } from '../theide-extension-interfaces'
const DeviceForm = (props: DeviceFormInterface) => {

    const [nameState, setNameState] = React.useState('');
    const [ipState, setIpState] = React.useState('');
    const [pathState, setPathState] = React.useState('');
    const [workingState, setWorkingState] = React.useState(false);

    function handleNameChange(event: {target: any}) {
        setNameState(event.target.value);
        setPathState(root + '/theos/devices/' + event.target.value + '.json');
    }

    function handleIpChange(event: {target: any}) {
        setIpState(event.target.value);
    }

    function handleInputEnter() {
        if (nameState !== "" && ipState !== "")
        {
            const newDevice: DeviceInterface = {
                id: shortid.generate(),
                name: nameState,
                ip: ipState,
                path: pathState,
                active: false
            }
            setWorkingState(true);
            props.handleDeviceCreate(newDevice);
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
                    <h3>Device Setup</h3>
                    <label>
                        Device Name:<br/>
                        <input type="text" value={nameState} onChange={handleNameChange} className='theia-input'/>
                    </label><br/>
                    <label>
                        Device Ip:<br/>
                        <input type="text" value={ipState} onChange={handleIpChange} className='theia-input'/>
                    </label><br/><h1></h1>
                    <button className='theia-button' title='Add' onClick={() => handleInputEnter()}>Add</button><br/>
                    <h3>Device Selection</h3>
                    <select className='theia-select' defaultValue={props.devices.find((device: DeviceInterface) => device.active === true)?.name} onChange={(e) => props.handleSelectionChange(props.devices.find((device: DeviceInterface) => device.name === e.target.value)!.id)}>
                        <option value="">select</option>
                        {props.devices.map((device) => (
                            <option value={device.name}>{device.name}</option>
                        ))}
                    </select><br/><h1></h1>
                </div>
            );
        }
        else
        {
            content = (
                <div className="theia-container">
                    <h3>Device Setup</h3>
                    <label>
                        Device Name:<br/>
                        <input disabled type="text" value={nameState} onChange={handleNameChange} className='theia-input'/>
                    </label><br/>
                    <label>
                        Device Ip:<br/>
                        <input disabled type="text" value={ipState} onChange={handleIpChange} className='theia-input'/>
                    </label><br/><h1></h1>
                    <button disabled className='theia-button' title='Add' onClick={() => handleInputEnter()}>Add</button><br/>
                    <h3>Device Selection</h3>
                    <select disabled className='theia-select' defaultValue={props.devices.find((device: DeviceInterface) => device.active === true)?.name} onChange={(e) => props.handleSelectionChange(props.devices.find((device: DeviceInterface) => device.name === e.target.value)!.id)}>
                        <option value="">select</option>
                        {props.devices.map((device) => (
                            <option value={device.name}>{device.name}</option>
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
                <h3>Device Setup</h3>
                <label>
                    Device Name:<br/>
                    <input disabled type="text" value={nameState} onChange={handleNameChange} className='theia-input'/>
                </label><br/>
                <label>
                    Device Ip:<br/>
                    <input disabled type="text" value={ipState} onChange={handleIpChange} className='theia-input'/>
                </label><br/><h1></h1>
                <button disabled className='theia-button' title='Add' onClick={() => handleInputEnter()}>Add</button><br/>
                <h3>Device Selection</h3>
                <select disabled className='theia-select' defaultValue={props.devices.find((device: DeviceInterface) => device.active === true)?.name} onChange={(e) => props.handleSelectionChange(props.devices.find((device: DeviceInterface) => device.name === e.target.value)!.id)}>
                    <option value="">select</option>
                    {props.devices.map((device) => (
                        <option value={device.name}>{device.name}</option>
                    ))}
                </select><br/><h1></h1>
            </div>
        );
    }
    return (
        <div>{content}</div>
    );
}

const DeviceItem = (props: DeviceItemInterface) => {
  return (
    <div className='theia-container'>
        <h3>{props.device.name}</h3>
        <h3>{props.device.ip}</h3>
        <h3>{props.device.active ? 'active' : 'inactive'}</h3>
        <button className='theia-button' title='Remove' onClick={() => props.handleDeviceRemove(props.device.id)}>Remove</button><br/><h1></h1>
    </div>
  )
}

const DeviceList = (props: DeviceListInterface) => {
  return (
    <div className="theia-container">
        {props.devices.map((device) => (
          <div key={device.id}>
            <DeviceItem
              device={device}
              handleDeviceRemove={props.handleDeviceRemove}
            />
          </div>
        ))}
    </div>
  )
}

export const Device = () =>
{
    const [devices, setDevices] = React.useState<DeviceInterface[]>(detectDevices())
    function detectDevices() : DeviceInterface[]
    {
        var newDevicesState: DeviceInterface[] = [];
        const files = getFiles(path.join(root, 'theos/devices'));
        if (files !== undefined && files.length != 0) 
        {
            files.forEach((device: string) => {
                var Json = fs.readJSONSync(path.join(root, '/theos/devices/', device));
                const newDevice: DeviceInterface = {
                    id: shortid.generate(),
                    name: Json['name'],
                    ip: Json['ip'],
                    path: root + '/theos/devices/' + device,
                    active: Json['active']
                }
                newDevicesState.push(newDevice);      
            });
        }

        return newDevicesState;
    }
    function getFiles(path: string) {
        if (fs.existsSync(path))
        {
            return fs.readdirSync(path).filter(function (file) {
                return fs.statSync(path+'/'+file).isFile();
            });
        }

    }
    function handleDeviceCreate(device: DeviceInterface) {
        var templater = require('json-templater/object');
        const newDevicesState: DeviceInterface[] = [...devices];
        var Json = templater(JSON.parse("{\n    \"name\": \"{{name}}\",\n    \"ip\": \"{{ip}}\",\n    \"active\": false\n}"), {name: device.name, ip: device.ip});
        fs.writeFileSync(device.path, JSON.stringify(Json, null, 4));
        newDevicesState.push(device);
        setDevices(newDevicesState);
    }
    function handleSelectionChange(id: string) {
        var templater = require('json-templater/object');
        let ip: string;
        const newDevicesState: DeviceInterface[] = [...devices];
        const oldsel = newDevicesState.find((device: DeviceInterface) => device.active === true)?.path;
        if(oldsel != undefined && fs.existsSync(oldsel))
        {
            var JsonTmp = fs.readJSONSync(oldsel);
            JsonTmp['active'] = false;
            fs.writeFileSync(oldsel, JSON.stringify(JsonTmp, null, 4));
            newDevicesState.find((device: DeviceInterface) => device.active === true)!.active = false;
        }
        const newsel = newDevicesState.find((device: DeviceInterface) => device.id === id)?.path;
        if (newsel != undefined && fs.existsSync(newsel))
        {
            var JsonTmp = fs.readJSONSync(newsel);
            JsonTmp['active'] = true;
            ip = JsonTmp['ip']
            fs.writeFileSync(newsel, JSON.stringify(JsonTmp, null, 4));
            newDevicesState.find((device: DeviceInterface) => device.id === id)!.active = true;
        }
        if (!fs.existsSync(path.join(root, '.vscode')))
        {
            fs.mkdirSync(path.join(root, '.vscode'));
        }
        var Json = fs.readJSONSync(path.join(root, '.vscode/tasks.json'));
        Json.tasks.forEach((task: any) => {
            let name: string;
            if (task.hasOwnProperty('group'))
            {
                if(task['group']['kind'] == 'build')
                {
                    var s1: string = task['label'].replace('Build ', '');
                    name = s1.replace(' with Theos', '');
                    var JsonTmp = templater(JSON.parse("{\n  \"version\": \"2.0.0\",\n  \"tasks\": [\n    {\n      \"label\": \"Build {{name}} with Theos\",\n      \"type\": \"shell\",\n      \"command\": \"THEOS_DEVICE_IP={{ip}} THEOS=${workspaceFolder}/theos make -C {{name}}\",\n      \"problemMatcher\": {\n        \"fileLocation\": [\"relative\", \"${workspaceFolder}/{{name}}\"],\n        \"pattern\": {\n          \"regexp\": \"^(.*):(\\\\d+):(\\\\d+):\\\\s+(warning|error):\\\\s+(.*)$\",\n          \"file\": 1,\n          \"line\": 2,\n          \"column\": 3,\n          \"severity\": 4,\n          \"message\": 5\n        }\n      },\n      \"group\": {\n        \"kind\": \"build\",\n\"isDefault\": true\n      }\n    },\n    {\n      \"label\": \"Build & Install {{name}} with Theos\",\n      \"type\": \"shell\",\n      \"command\": \"THEOS_DEVICE_IP={{ip}} THEOS=${workspaceFolder}/theos make do -C {{name}}\",\n      \"problemMatcher\": {\n        \"fileLocation\": [\"relative\", \"${workspaceFolder}/{{name}}\"],\n        \"pattern\": {\n          \"regexp\": \"^(.*):(\\\\d+):(\\\\d+):\\\\s+(warning|error):\\\\s+(.*)$\",\n          \"file\": 1,\n          \"line\": 2,\n          \"column\": 3,\n          \"severity\": 4,\n          \"message\": 5\n        }\n      },\n      \"group\": {\n        \"kind\": \"test\",\n\"isDefault\": true\n      }\n    },\n    {\n      \"label\": \"Clean {{name}} with Theos\",\n      \"type\": \"shell\",\n      \"command\": \"THEOS_DEVICE_IP={{ip}} THEOS=${workspaceFolder}/theos make clean -C {{name}}\"\n    }\n  ]\n}"), { name: name, ip: ip}); 
                    Json.tasks[Json.tasks.indexOf(task)] = JsonTmp.tasks[0];
                }
                else if(task['group']['kind'] == 'test')
                {
                    var s1: string = task['label'].replace('Build & Install ', '');
                    name = s1.replace(' with Theos', '');
                    var JsonTmp = templater(JSON.parse("{\n  \"version\": \"2.0.0\",\n  \"tasks\": [\n    {\n      \"label\": \"Build {{name}} with Theos\",\n      \"type\": \"shell\",\n      \"command\": \"THEOS_DEVICE_IP={{ip}} THEOS=${workspaceFolder}/theos make -C {{name}}\",\n      \"problemMatcher\": {\n        \"fileLocation\": [\"relative\", \"${workspaceFolder}/{{name}}\"],\n        \"pattern\": {\n          \"regexp\": \"^(.*):(\\\\d+):(\\\\d+):\\\\s+(warning|error):\\\\s+(.*)$\",\n          \"file\": 1,\n          \"line\": 2,\n          \"column\": 3,\n          \"severity\": 4,\n          \"message\": 5\n        }\n      },\n      \"group\": {\n        \"kind\": \"build\",\n\"isDefault\": true\n      }\n    },\n    {\n      \"label\": \"Build & Install {{name}} with Theos\",\n      \"type\": \"shell\",\n      \"command\": \"THEOS_DEVICE_IP={{ip}} THEOS=${workspaceFolder}/theos make do -C {{name}}\",\n      \"problemMatcher\": {\n        \"fileLocation\": [\"relative\", \"${workspaceFolder}/{{name}}\"],\n        \"pattern\": {\n          \"regexp\": \"^(.*):(\\\\d+):(\\\\d+):\\\\s+(warning|error):\\\\s+(.*)$\",\n          \"file\": 1,\n          \"line\": 2,\n          \"column\": 3,\n          \"severity\": 4,\n          \"message\": 5\n        }\n      },\n      \"group\": {\n        \"kind\": \"test\",\n\"isDefault\": true\n      }\n    },\n    {\n      \"label\": \"Clean {{name}} with Theos\",\n      \"type\": \"shell\",\n      \"command\": \"THEOS_DEVICE_IP={{ip}} THEOS=${workspaceFolder}/theos make clean -C {{name}}\"\n    }\n  ]\n}"), { name: name, ip: ip}); 
                    Json.tasks[Json.tasks.indexOf(task)] = JsonTmp.tasks[1];
                }
            }
            else
            {
                var s1: string = task['label'].replace('Clean ', '');
                name = s1.replace(' with Theos', '');
                var JsonTmp = templater(JSON.parse("{\n  \"version\": \"2.0.0\",\n  \"tasks\": [\n    {\n      \"label\": \"Build {{name}} with Theos\",\n      \"type\": \"shell\",\n      \"command\": \"THEOS_DEVICE_IP={{ip}} THEOS=${workspaceFolder}/theos make -C {{name}}\",\n      \"problemMatcher\": {\n        \"fileLocation\": [\"relative\", \"${workspaceFolder}/{{name}}\"],\n        \"pattern\": {\n          \"regexp\": \"^(.*):(\\\\d+):(\\\\d+):\\\\s+(warning|error):\\\\s+(.*)$\",\n          \"file\": 1,\n          \"line\": 2,\n          \"column\": 3,\n          \"severity\": 4,\n          \"message\": 5\n        }\n      },\n      \"group\": {\n        \"kind\": \"build\",\n\"isDefault\": true\n      }\n    },\n    {\n      \"label\": \"Build & Install {{name}} with Theos\",\n      \"type\": \"shell\",\n      \"command\": \"THEOS_DEVICE_IP={{ip}} THEOS=${workspaceFolder}/theos make do -C {{name}}\",\n      \"problemMatcher\": {\n        \"fileLocation\": [\"relative\", \"${workspaceFolder}/{{name}}\"],\n        \"pattern\": {\n          \"regexp\": \"^(.*):(\\\\d+):(\\\\d+):\\\\s+(warning|error):\\\\s+(.*)$\",\n          \"file\": 1,\n          \"line\": 2,\n          \"column\": 3,\n          \"severity\": 4,\n          \"message\": 5\n        }\n      },\n      \"group\": {\n        \"kind\": \"test\",\n\"isDefault\": true\n      }\n    },\n    {\n      \"label\": \"Clean {{name}} with Theos\",\n      \"type\": \"shell\",\n      \"command\": \"THEOS_DEVICE_IP={{ip}} THEOS=${workspaceFolder}/theos make clean -C {{name}}\"\n    }\n  ]\n}"), { name: name, ip: ip}); 
                Json.tasks[Json.tasks.indexOf(task)] = JsonTmp.tasks[2];
            }

        });
        fs.writeFileSync(path.join(root, '.vscode/tasks.json'), JSON.stringify(Json, null, 4));

        
        setDevices(newDevicesState);
    }
    function handleDeviceRemove(id: string) {
        fs.unlinkSync(devices.find((device: DeviceInterface) => device.id === id)!.path);
        const newDevicesState: DeviceInterface[] = devices.filter((device: DeviceInterface) => device.id !== id);
        setDevices(newDevicesState);
    }

    return (
        <div className="theia-container">
            <h1>Device Manager</h1>
            <DeviceForm
                devices={devices}
                handleSelectionChange={handleSelectionChange}
                handleDeviceCreate={handleDeviceCreate}
            />

            <DeviceList
                devices={devices}
                handleDeviceRemove={handleDeviceRemove}
            />
        </div>
    );
}
