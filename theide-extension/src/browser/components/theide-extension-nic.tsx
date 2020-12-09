import * as React from 'react';
import * as path from 'path';
import * as fs from 'fs-extra'
import { root } from '../theide-extension-widget';
export class Nic extends React.Component {
	public state: any;
	public setState: any;

    constructor(props: any) {
        super(props);
        this.state = {
            template: 0,
            subdir: "/",
            projname: "test",
            pkgname: "com.yourcompany.test",
            maintname: "test",
            bfilter: "com.apple.springboard",
            kfilter: "SpringBoard",
            cprefix: "XXX",
            wsection: "NotificationCenterToday"
        };

        this.handleTemplateChange = this.handleTemplateChange.bind(this);
        this.handleSubdirChange = this.handleSubdirChange.bind(this);
        this.handleProjnameChange = this.handleProjnameChange.bind(this);
        this.handlePkgnameChange = this.handlePkgnameChange.bind(this);
        this.handleMaintnameChange = this.handleMaintnameChange.bind(this);
        this.handleBfilterChange = this.handleBfilterChange.bind(this);
        this.handleKfilterChange = this.handleKfilterChange.bind(this);
        this.handleCprefixChange = this.handleCprefixChange.bind(this);
        this.handleWsectionChange = this.handleWsectionChange.bind(this);

    }

    handleTemplateChange(event: { target: any; }) {
        const target = event.target;
        const value = target.value;
        this.setState({
            template: Number(value)    
        });
    }

    handleSubdirChange(event: { target: any; }) {
        const target = event.target;
        const value = target.value;
        this.setState({
            subdir: String(value)    
        });
    }

    handleProjnameChange(event: { target: any; }) {
        const target = event.target;
        const value = target.value;
        this.setState({
            projname: String(value)    
        });
    }

    handlePkgnameChange(event: { target: any; }) {
        const target = event.target;
        const value = target.value;
        this.setState({
            pkgname: String(value)    
        });
    }

    handleMaintnameChange(event: { target: any; }) {
        const target = event.target;
        const value = target.value;
        this.setState({
            maintname: String(value)    
        });
    }

    handleBfilterChange(event: { target: any; }) {
        const target = event.target;
        const value = target.value;
        this.setState({
            bfilter: String(value)    
        });
    }

    handleKfilterChange(event: { target: any; }) {
        const target = event.target;
        const value = target.value;
        this.setState({
            kfilter: String(value)    
        });
    }

    handleCprefixChange(event: { target: any; }) {
        const target = event.target;
        const value = target.value;
        this.setState({
            cprefix: String(value)    
        });
    }

    handleWsectionChange(event: { target: any; }) {
        const target = event.target;
        const value = target.value;
        this.setState({
            wsection: String(value)    
        });
    }

    nic(): void {
        const rootPath = require('electron-root-path').rootPath;
        const process = require('child_process');
        var templater = require('json-templater/object');
        const script: string = path.join(rootPath, 'files/nic').toString();
        var cmd: string;
        switch(this.state.template)
        {
            case 1: {
                cmd = `bash -c "cd ${root}${this.state.subdir} && ${script} ${this.state.template} ${root} ${this.state.projname} ${this.state.pkgname} ${this.state.maintname} ${this.state.bfilter} ${this.state.kfilter}"`;
                break;
            }
            case 2: {
                cmd = `bash -c "cd ${root}${this.state.subdir} && ${script} ${this.state.template} ${root} ${this.state.projname} ${this.state.pkgname} ${this.state.maintname} ${this.state.bfilter} ${this.state.kfilter}"`;
                break;
            }
            case 3: {
                cmd = `bash -c "cd ${root}${this.state.subdir} && ${script} ${this.state.template} ${root} ${this.state.projname} ${this.state.pkgname} ${this.state.maintname} ${this.state.cprefix}"`;
                break;
            }
            case 4: {
                cmd = `bash -c "cd ${root}${this.state.subdir} && ${script} ${this.state.template} ${root} ${this.state.projname} ${this.state.pkgname} ${this.state.maintname}"`;
                break;
            }
            case 5: {
                cmd = `bash -c "cd ${root}${this.state.subdir} && ${script} ${this.state.template} ${root} ${this.state.projname} ${this.state.pkgname} ${this.state.maintname} ${this.state.kfilter}"`;
                break;
            }
            case 6: {
                cmd = `bash -c "cd ${root}${this.state.subdir} && ${script} ${this.state.template} ${root} ${this.state.projname} ${this.state.pkgname} ${this.state.maintname} ${this.state.kfilter}"`;
                break;
            }
            case 7: {
                cmd = `bash -c "cd ${root}${this.state.subdir} && ${script} ${this.state.template} ${root} ${this.state.projname} ${this.state.pkgname} ${this.state.maintname}"`;
                break;
            }
            case 8: {
                cmd = `bash -c "cd ${root}${this.state.subdir} && ${script} ${this.state.template} ${root} ${this.state.projname} ${this.state.pkgname} ${this.state.maintname}"`;
                break;
            }
            case 9: {
                cmd = `bash -c "cd ${root}${this.state.subdir} && ${script} ${this.state.template} ${root} ${this.state.projname} ${this.state.pkgname} ${this.state.maintname} ${this.state.kfilter}"`;
                break;
            }
            case 10: {
                cmd = `bash -c "cd ${root}${this.state.subdir} && ${script} ${this.state.template} ${root} ${this.state.projname} ${this.state.pkgname} ${this.state.maintname} ${this.state.wsection} ${this.state.kfilter}"`;
                break;
            }
            case 11: {
                cmd = `bash -c "cd ${root}${this.state.subdir} && ${script} ${this.state.template} ${root} ${this.state.projname} ${this.state.pkgname} ${this.state.maintname} ${this.state.cprefix}"`;
                break;
            }
            case 12: {
                cmd = `bash -c "cd ${root}${this.state.subdir} && ${script} ${this.state.template} ${root} ${this.state.projname} ${this.state.pkgname} ${this.state.maintname}"`;
                break;
            }
            case 13: {
                cmd = `bash -c "cd ${root}${this.state.subdir} && ${script} ${this.state.template} ${root} ${this.state.projname} ${this.state.pkgname} ${this.state.maintname}"`;
                break;
            }
            case 14: {
                cmd = `bash -c "cd ${root}${this.state.subdir} && ${script} ${this.state.template} ${root} ${this.state.projname} ${this.state.pkgname} ${this.state.maintname}"`;
                break;
            }
            case 15: {
                cmd = `bash -c "cd ${root}${this.state.subdir} && ${script} ${this.state.template} ${root} ${this.state.projname} ${this.state.pkgname} ${this.state.maintname} ${this.state.bfilter} ${this.state.kfilter}"`;
                break;
            }
            case 16: {
                cmd = `bash -c "cd ${root}${this.state.subdir} && ${script} ${this.state.template} ${root} ${this.state.projname} ${this.state.pkgname} ${this.state.maintname} ${this.state.bfilter} ${this.state.kfilter}"`;
                break;
            }
            case 17: {
                cmd = `bash -c "cd ${root}${this.state.subdir} && ${script} ${this.state.template} ${root} ${this.state.projname} ${this.state.pkgname} ${this.state.maintname}"`;
                break;
            }
            default: {
                cmd = "";
            }

        }
        const nic = process.exec(cmd);
        nic.stdout.on('data', (data: any)=>{
            console.log(data); 
            // do whatever you want here with data
        });
        nic.stderr.on('data', (data: any)=>{
            console.error(data);
        });
        var Json = templater(JSON.parse("{\n  \"version\": \"2.0.0\",\n  \"tasks\": [\n    {\n      \"label\": \"Build {{name}} with Theos\",\n      \"type\": \"shell\",\n      \"command\": \"THEOS=${workspaceFolder}/theos make -C {{name}}\",\n      \"problemMatcher\": {\n        \"fileLocation\": [\"relative\", \"${workspaceFolder}/{{name}}\"],\n        \"pattern\": {\n          \"regexp\": \"^(.*):(\\\\d+):(\\\\d+):\\\\s+(warning|error):\\\\s+(.*)$\",\n          \"file\": 1,\n          \"line\": 2,\n          \"column\": 3,\n          \"severity\": 4,\n          \"message\": 5\n        }\n      },\n      \"group\": {\n        \"kind\": \"build\",\n\"isDefault\": true\n      }\n    },\n    {\n      \"label\": \"Build & Install {{name}} with Theos\",\n      \"type\": \"shell\",\n      \"command\": \"THEOS=${workspaceFolder}/theos make do -C {{name}}\",\n      \"problemMatcher\": {\n        \"fileLocation\": [\"relative\", \"${workspaceFolder}/{{name}}\"],\n        \"pattern\": {\n          \"regexp\": \"^(.*):(\\\\d+):(\\\\d+):\\\\s+(warning|error):\\\\s+(.*)$\",\n          \"file\": 1,\n          \"line\": 2,\n          \"column\": 3,\n          \"severity\": 4,\n          \"message\": 5\n        }\n      },\n      \"group\": {\n        \"kind\": \"test\",\n\"isDefault\": true\n      }\n    },\n    {\n      \"label\": \"Clean {{name}} with Theos\",\n      \"type\": \"shell\",\n      \"command\": \"THEOS=${workspaceFolder}/theos make clean -C {{name}}\"\n    }\n  ]\n}"), { name: this.state.projname});
        var task1 = Json.tasks[0];
        var task2 = Json.tasks[1];
        var task3 = Json.tasks[2];
        if (this.state.subdir === "/")
        {
            if (!fs.existsSync(path.join(root, '.vscode')))
            {
                fs.mkdirSync(path.join(root, '.vscode'));
            }
            if (!fs.existsSync(path.join(root, '.vscode/tasks.json')))
            {
                fs.writeFileSync(path.join(root, '.vscode/tasks.json'), JSON.stringify(Json, null, 4));
            }
            else
            {
                var JsonTmp = fs.readJSONSync(path.join(root, '.vscode/tasks.json'));
                JsonTmp.tasks.push(task1, task2, task3);
                fs.writeFileSync(path.join(root, '.vscode/tasks.json'), JSON.stringify(JsonTmp, null, 4));
            }
        }
        
    }

    render() {
        let input;
        
        switch (this.state.template)
        {
            case 1: {
                input = (
                    <div>
                        <label>
                            Project Name:<br/>
                            <input type="text" value={this.state.projname} onChange={this.handleProjnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Package Name:<br/>
                            <input type="text" value={this.state.pkgname} onChange={this.handlePkgnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Author/Maintainer Name:<br/>
                            <input type="text" value={this.state.maintname} onChange={this.handleMaintnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            MobileSubstrate Bundle filter:<br/>
                            <input type="text" value={this.state.bfilter} onChange={this.handleBfilterChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            List of applications to terminate upon installation:<br/>
                            <input type="text" value={this.state.kfilter} onChange={this.handleKfilterChange} className='theia-input'/>
                        </label><br/>
                    </div>

                );
                break;
            }
            case 2: {
                input = (
                    <div>
                        <label>
                            Project Name:<br/>
                            <input type="text" value={this.state.projname} onChange={this.handleProjnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Package Name:<br/>
                            <input type="text" value={this.state.pkgname} onChange={this.handlePkgnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Author/Maintainer Name:<br/>
                            <input type="text" value={this.state.maintname} onChange={this.handleMaintnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            MobileSubstrate Bundle filter:<br/>
                            <input type="text" value={this.state.bfilter} onChange={this.handleBfilterChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            List of applications to terminate upon installation:<br/>
                            <input type="text" value={this.state.kfilter} onChange={this.handleKfilterChange} className='theia-input'/>
                        </label><br/>
                    </div>

                );
                break;
            }
            case 3: {
                input = (
                    <div>
                        <label>
                            Project Name:<br/>
                            <input type="text" value={this.state.projname} onChange={this.handleProjnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Package Name:<br/>
                            <input type="text" value={this.state.pkgname} onChange={this.handlePkgnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Author/Maintainer Name:<br/>
                            <input type="text" value={this.state.maintname} onChange={this.handleMaintnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Class Name Prefix:<br/>
                            <input type="text" value={this.state.cprefix} onChange={this.handleCprefixChange} className='theia-input'/>
                        </label><br/>
                    </div>

                );
                break;
            }
            case 4: {
                input = (
                    <div>
                        <label>
                            Project Name:<br/>
                            <input type="text" value={this.state.projname} onChange={this.handleProjnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Package Name:<br/>
                            <input type="text" value={this.state.pkgname} onChange={this.handlePkgnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Author/Maintainer Name:<br/>
                            <input type="text" value={this.state.maintname} onChange={this.handleMaintnameChange} className='theia-input'/>
                        </label><br/>
                    </div>

                );
                break;
            }
            case 5: {
                input = (
                    <div>
                        <label>
                            Project Name:<br/>
                            <input type="text" value={this.state.projname} onChange={this.handleProjnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Package Name:<br/>
                            <input type="text" value={this.state.pkgname} onChange={this.handlePkgnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Author/Maintainer Name:<br/>
                            <input type="text" value={this.state.maintname} onChange={this.handleMaintnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            List of applications to terminate upon installation:<br/>
                            <input type="text" value={this.state.kfilter} onChange={this.handleKfilterChange} className='theia-input'/>
                        </label><br/>
                    </div>

                );
                break;
            }
            case 6: {
                input = (
                    <div>
                        <label>
                            Project Name:<br/>
                            <input type="text" value={this.state.projname} onChange={this.handleProjnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Package Name:<br/>
                            <input type="text" value={this.state.pkgname} onChange={this.handlePkgnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Author/Maintainer Name:<br/>
                            <input type="text" value={this.state.maintname} onChange={this.handleMaintnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            List of applications to terminate upon installation:<br/>
                            <input type="text" value={this.state.kfilter} onChange={this.handleKfilterChange} className='theia-input'/>
                        </label><br/>
                    </div>

                );
                break;
            }
            case 7: {
                input = (
                    <div>
                        <label>
                            Project Name:<br/>
                            <input type="text" value={this.state.projname} onChange={this.handleProjnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Package Name:<br/>
                            <input type="text" value={this.state.pkgname} onChange={this.handlePkgnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Author/Maintainer Name:<br/>
                            <input type="text" value={this.state.maintname} onChange={this.handleMaintnameChange} className='theia-input'/>
                        </label><br/>
                    </div>

                );
                break;
            }
            case 8: {
                input = (
                    <div>
                        <label>
                            Project Name:<br/>
                            <input type="text" value={this.state.projname} onChange={this.handleProjnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Package Name:<br/>
                            <input type="text" value={this.state.pkgname} onChange={this.handlePkgnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Author/Maintainer Name:<br/>
                            <input type="text" value={this.state.maintname} onChange={this.handleMaintnameChange} className='theia-input'/>
                        </label><br/>
                    </div>

                );
                break;
            }
            case 9: {
                input = (
                    <div>
                        <label>
                            Project Name:<br/>
                            <input type="text" value={this.state.projname} onChange={this.handleProjnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Package Name:<br/>
                            <input type="text" value={this.state.pkgname} onChange={this.handlePkgnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Author/Maintainer Name:<br/>
                            <input type="text" value={this.state.maintname} onChange={this.handleMaintnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            List of applications to terminate upon installation:<br/>
                            <input type="text" value={this.state.kfilter} onChange={this.handleKfilterChange} className='theia-input'/>
                        </label><br/>
                    </div>

                );
                break;
            }
            case 10: {
                input = (
                    <div>
                        <label>
                            Project Name:<br/>
                            <input type="text" value={this.state.projname} onChange={this.handleProjnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Package Name:<br/>
                            <input type="text" value={this.state.pkgname} onChange={this.handlePkgnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Author/Maintainer Name:<br/>
                            <input type="text" value={this.state.maintname} onChange={this.handleMaintnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Widget section (Today = NotificationCenterToday | All = NotificationCenter):<br/>
                            <input type="text" value={this.state.wsection} onChange={this.handleWsectionChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            List of applications to terminate upon installation:<br/>
                            <input type="text" value={this.state.kfilter} onChange={this.handleKfilterChange} className='theia-input'/>
                        </label><br/>
                    </div>

                );
                break;
            }
            case 11: {
                input = (
                    <div>
                        <label>
                            Project Name:<br/>
                            <input type="text" value={this.state.projname} onChange={this.handleProjnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Package Name:<br/>
                            <input type="text" value={this.state.pkgname} onChange={this.handlePkgnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Author/Maintainer Name:<br/>
                            <input type="text" value={this.state.maintname} onChange={this.handleMaintnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Class Name Prefix:<br/>
                            <input type="text" value={this.state.cprefix} onChange={this.handleCprefixChange} className='theia-input'/>
                        </label><br/>
                    </div>

                );
                break;
            }
            case 12: {
                input = (
                    <div>
                        <label>
                            Project Name:<br/>
                            <input type="text" value={this.state.projname} onChange={this.handleProjnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Package Name:<br/>
                            <input type="text" value={this.state.pkgname} onChange={this.handlePkgnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Author/Maintainer Name:<br/>
                            <input type="text" value={this.state.maintname} onChange={this.handleMaintnameChange} className='theia-input'/>
                        </label><br/>
                    </div>

                );
                break;
            }
            case 13: {
                input = (
                    <div>
                        <label>
                            Project Name:<br/>
                            <input type="text" value={this.state.projname} onChange={this.handleProjnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Package Name:<br/>
                            <input type="text" value={this.state.pkgname} onChange={this.handlePkgnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Author/Maintainer Name:<br/>
                            <input type="text" value={this.state.maintname} onChange={this.handleMaintnameChange} className='theia-input'/>
                        </label><br/>
                    </div>

                );
                break;
            }
            case 14: {
                input = (
                    <div>
                        <label>
                            Project Name:<br/>
                            <input type="text" value={this.state.projname} onChange={this.handleProjnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Package Name:<br/>
                            <input type="text" value={this.state.pkgname} onChange={this.handlePkgnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Author/Maintainer Name:<br/>
                            <input type="text" value={this.state.maintname} onChange={this.handleMaintnameChange} className='theia-input'/>
                        </label><br/>
                    </div>

                );
                break;
            }
            case 15: {
                input = (
                    <div>
                        <label>
                            Project Name:<br/>
                            <input type="text" value={this.state.projname} onChange={this.handleProjnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Package Name:<br/>
                            <input type="text" value={this.state.pkgname} onChange={this.handlePkgnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Author/Maintainer Name:<br/>
                            <input type="text" value={this.state.maintname} onChange={this.handleMaintnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            MobileSubstrate Bundle filter:<br/>
                            <input type="text" value={this.state.bfilter} onChange={this.handleBfilterChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            List of applications to terminate upon installation:<br/>
                            <input type="text" value={this.state.kfilter} onChange={this.handleKfilterChange} className='theia-input'/>
                        </label><br/>
                    </div>

                );
                break;
            }
            case 16: {
                input = (
                    <div>
                        <label>
                            Project Name:<br/>
                            <input type="text" value={this.state.projname} onChange={this.handleProjnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Package Name:<br/>
                            <input type="text" value={this.state.pkgname} onChange={this.handlePkgnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Author/Maintainer Name:<br/>
                            <input type="text" value={this.state.maintname} onChange={this.handleMaintnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            MobileSubstrate Bundle filter:<br/>
                            <input type="text" value={this.state.bfilter} onChange={this.handleBfilterChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            List of applications to terminate upon installation:<br/>
                            <input type="text" value={this.state.kfilter} onChange={this.handleKfilterChange} className='theia-input'/>
                        </label><br/>
                    </div>

                );
                break;
            }
            case 17: {
                input = (
                    <div>
                        <label>
                            Project Name:<br/>
                            <input type="text" value={this.state.projname} onChange={this.handleProjnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Package Name:<br/>
                            <input type="text" value={this.state.pkgname} onChange={this.handlePkgnameChange} className='theia-input'/>
                        </label><br/>
                        <label>
                            Author/Maintainer Name:<br/>
                            <input type="text" value={this.state.maintname} onChange={this.handleMaintnameChange} className='theia-input'/>
                        </label><br/>
                    </div>

                );
                break;
            }
            default: {
                input = null;
            }
        }
        let content;
        if(fs.existsSync(path.join(root, 'theos')))
        {
            content = (
                <div className='theia-container'>
                    <h1>New Instance Creator</h1><br/>
                    <form>
                        <label>
                            Template:<br/>
                            <select className='theia-select' defaultValue="0" onChange={this.handleTemplateChange}>
                                <option value="0">select</option>
                                <option value="1">Activator Event</option>
                                <option value="2">Activator Listener</option>
                                <option value="3">Application Modern</option>
                                <option value="4">Application Swift</option>
                                <option value="5">Cydget</option>
                                <option value="6">Flipswitch Switch</option>
                                <option value="7">Framework</option>
                                <option value="8">Library</option>
                                <option value="9">Notification Center Widget</option>
                                <option value="10">Notification Center Widget 7up</option>
                                <option value="11">Preference Bundle Modern</option>
                                <option value="12">Theme</option>
                                <option value="13">Tool</option>
                                <option value="14">Tool Swift</option>
                                <option value="15">Tweak</option>
                                <option value="16">Tweak With Simple Preferences</option>
                                <option value="17">XPC Service</option>
                            </select>
                        </label><br/>
                        <label>
                            Subdir:<br/>
                            <input type="text" value={this.state.subdir} onChange={this.handleSubdirChange} className='theia-input'/>
                        </label><br/>
                        {input}<br/>
                    </form><br/>
                    <button className='theia-button' title='NIC' onClick={() => this.nic()}>NIC</button><br/><h1></h1>
                </div>
            );
        }
        else
        {
            content = (
                <div className='theia-container'>
                    <h1>New Instance Creator</h1><br/>
                    <form>
                        <label>
                            Template:<br/>
                            <select className='theia-select' defaultValue="0" onChange={this.handleTemplateChange}>
                                <option value="0">select</option>
                                <option value="1">Activator Event</option>
                                <option value="2">Activator Listener</option>
                                <option value="3">Application Modern</option>
                                <option value="4">Application Swift</option>
                                <option value="5">Cydget</option>
                                <option value="6">Flipswitch Switch</option>
                                <option value="7">Framework</option>
                                <option value="8">Library</option>
                                <option value="9">Notification Center Widget</option>
                                <option value="10">Notification Center Widget 7up</option>
                                <option value="11">Preference Bundle Modern</option>
                                <option value="12">Theme</option>
                                <option value="13">Tool</option>
                                <option value="14">Tool Swift</option>
                                <option value="15">Tweak</option>
                                <option value="16">Tweak With Simple Preferences</option>
                                <option value="17">XPC Service</option>
                            </select>
                        </label><br/>
                        <label>
                            Subdir:<br/>
                            <input type="text" value={this.state.subdir} onChange={this.handleSubdirChange} className='theia-input'/>
                        </label><br/>
                        {input}<br/>
                    </form><br/>
                    <button disabled className='theia-button' title='NIC' onClick={() => this.nic()}>NIC</button><br/><h1></h1>
                </div>
            );
        }
        return (
            <div>{content}</div>
        );
    }
}
