import * as React from 'react';
import shortid from 'shortid';
import * as path from 'path';
import * as fs from 'fs-extra'
import { root } from '../widgets/theide-extension-project-widget';
import { ProjectInterface, ProjectFormInterface, ProjectItemInterface, ProjectListInterface } from '../theide-extension-interfaces'
const ProjectForm = (props: ProjectFormInterface) => {

	const [subdirState, setSubdirState] = React.useState('/');
	const [templateState, setTemplateState] = React.useState(0);
	const [projnameState, setProjnameState] = React.useState('test');
	const [pkgnameState, setPkgnameState] = React.useState('com.yourcompany.test');
	const [maintnameState, setMaintnameState] = React.useState('test');
	const [bfilterState, setBfilterState] = React.useState('com.apple.springboard');
	const [kfilterState, setKfilterState] = React.useState('SpringBoard');
	const [cprefixState, setCprefixState] = React.useState('XXX');
	const [wsectionState, setWsectionState] = React.useState('NotificationCenterToday');

	function handleTemplateChange(event: { target: any; }) {
		const target = event.target;
		const value = target.value;
		setTemplateState(Number(value));
	}

	function handleSubdirChange(event: { target: any; }) {
		const target = event.target;
		const value = target.value;
		setSubdirState(String(value));
	}

	function handleProjnameChange(event: { target: any; }) {
		const target = event.target;
		const value = target.value;
		setProjnameState(String(value));
	}

	function handlePkgnameChange(event: { target: any; }) {
		const target = event.target;
		const value = target.value;
		setPkgnameState(String(value));
	}

	function handleMaintnameChange(event: { target: any; }) {
		const target = event.target;
		const value = target.value;
		setMaintnameState(String(value));
	}

	function handleBfilterChange(event: { target: any; }) {
		const target = event.target;
		const value = target.value;
		setBfilterState(String(value));
	}

	function handleKfilterChange(event: { target: any; }) {
		const target = event.target;
		const value = target.value;
		setKfilterState(String(value));
	}

	function handleCprefixChange(event: { target: any; }) {
		const target = event.target;
		const value = target.value;
		setCprefixState(String(value));
	}

	function handleWsectionChange(event: { target: any; }) {
		const target = event.target;
		const value = target.value;
		setWsectionState(String(value));
	}
	function handleInputEnter() {
		let newProject: ProjectInterface = 
		{
			id: shortid.generate(),
			path: root + '/theos/projects/' + projnameState + '.json',
			subdir: subdirState,
			template: templateState,
			projname: projnameState,
			pkgname: pkgnameState,
			maintname: maintnameState,
			subprojects: []
		};
		switch (newProject.template)
		{
			case 1: {
				newProject.bfilter = bfilterState;
				newProject.kfilter = kfilterState;
				break;
			}
			case 2: {
				newProject.bfilter = bfilterState;
				newProject.kfilter = kfilterState;
				break;
			}
			case 3: {
				newProject.cprefix = cprefixState;
				break;
			}
			case 4: {
				break;
			}
			case 5: {
				newProject.kfilter = kfilterState;
				break;
			}
			case 6: {
				newProject.kfilter = kfilterState;
				break;
			}
			case 7: {
				break;
			}
			case 8: {
				break;
			}
			case 9: {
				newProject.kfilter = kfilterState;
				break;
			}
			case 10: {
				newProject.wsection = wsectionState;
				newProject.kfilter = kfilterState;
				break;
			}
			case 11: {
				newProject.cprefix = cprefixState;
				break;
			}
			case 12: {
				break;
			}
			case 13: {
				break;
			}
			case 14: {
				break;
			}
			case 15: {
				newProject.bfilter = bfilterState;
				newProject.kfilter = kfilterState;
				break;
			}
			case 16: {
				newProject.bfilter = bfilterState;
				newProject.kfilter = kfilterState;
				break;
			}
			case 17: {
				break;
			}
		}
		props.handleProjectCreate(newProject);
	}
	let content;
	let input;

	switch (templateState) {
		case 1: {
			input = (
				<div>
					<label>
						Project Name:<br />
						<input type="text" value={projnameState} onChange={handleProjnameChange} className='theia-input' />
					</label><br />
					<label>
						Package Name:<br />
						<input type="text" value={pkgnameState} onChange={handlePkgnameChange} className='theia-input' />
					</label><br />
					<label>
						Author/Maintainer Name:<br />
						<input type="text" value={maintnameState} onChange={handleMaintnameChange} className='theia-input' />
					</label><br />
					<label>
						MobileSubstrate Bundle filter:<br />
						<input type="text" value={bfilterState} onChange={handleBfilterChange} className='theia-input' />
					</label><br />
					<label>
						List of applications to terminate upon installation:<br />
						<input type="text" value={kfilterState} onChange={handleKfilterChange} className='theia-input' />
					</label><br />
				</div>

			);
			break;
		}
		case 2: {
			input = (
				<div>
					<label>
						Project Name:<br />
						<input type="text" value={projnameState} onChange={handleProjnameChange} className='theia-input' />
					</label><br />
					<label>
						Package Name:<br />
						<input type="text" value={pkgnameState} onChange={handlePkgnameChange} className='theia-input' />
					</label><br />
					<label>
						Author/Maintainer Name:<br />
						<input type="text" value={maintnameState} onChange={handleMaintnameChange} className='theia-input' />
					</label><br />
					<label>
						MobileSubstrate Bundle filter:<br />
						<input type="text" value={bfilterState} onChange={handleBfilterChange} className='theia-input' />
					</label><br />
					<label>
						List of applications to terminate upon installation:<br />
						<input type="text" value={kfilterState} onChange={handleKfilterChange} className='theia-input' />
					</label><br />
				</div>

			);
			break;
		}
		case 3: {
			input = (
				<div>
					<label>
						Project Name:<br />
						<input type="text" value={projnameState} onChange={handleProjnameChange} className='theia-input' />
					</label><br />
					<label>
						Package Name:<br />
						<input type="text" value={pkgnameState} onChange={handlePkgnameChange} className='theia-input' />
					</label><br />
					<label>
						Author/Maintainer Name:<br />
						<input type="text" value={maintnameState} onChange={handleMaintnameChange} className='theia-input' />
					</label><br />
					<label>
						Class Name Prefix:<br />
						<input type="text" value={cprefixState} onChange={handleCprefixChange} className='theia-input' />
					</label><br />
				</div>

			);
			break;
		}
		case 4: {
			input = (
				<div>
					<label>
						Project Name:<br />
						<input type="text" value={projnameState} onChange={handleProjnameChange} className='theia-input' />
					</label><br />
					<label>
						Package Name:<br />
						<input type="text" value={pkgnameState} onChange={handlePkgnameChange} className='theia-input' />
					</label><br />
					<label>
						Author/Maintainer Name:<br />
						<input type="text" value={maintnameState} onChange={handleMaintnameChange} className='theia-input' />
					</label><br />
				</div>

			);
			break;
		}
		case 5: {
			input = (
				<div>
					<label>
						Project Name:<br />
						<input type="text" value={projnameState} onChange={handleProjnameChange} className='theia-input' />
					</label><br />
					<label>
						Package Name:<br />
						<input type="text" value={pkgnameState} onChange={handlePkgnameChange} className='theia-input' />
					</label><br />
					<label>
						Author/Maintainer Name:<br />
						<input type="text" value={maintnameState} onChange={handleMaintnameChange} className='theia-input' />
					</label><br />
					<label>
						List of applications to terminate upon installation:<br />
						<input type="text" value={kfilterState} onChange={handleKfilterChange} className='theia-input' />
					</label><br />
				</div>

			);
			break;
		}
		case 6: {
			input = (
				<div>
					<label>
						Project Name:<br />
						<input type="text" value={projnameState} onChange={handleProjnameChange} className='theia-input' />
					</label><br />
					<label>
						Package Name:<br />
						<input type="text" value={pkgnameState} onChange={handlePkgnameChange} className='theia-input' />
					</label><br />
					<label>
						Author/Maintainer Name:<br />
						<input type="text" value={maintnameState} onChange={handleMaintnameChange} className='theia-input' />
					</label><br />
					<label>
						List of applications to terminate upon installation:<br />
						<input type="text" value={kfilterState} onChange={handleKfilterChange} className='theia-input' />
					</label><br />
				</div>

			);
			break;
		}
		case 7: {
			input = (
				<div>
					<label>
						Project Name:<br />
						<input type="text" value={projnameState} onChange={handleProjnameChange} className='theia-input' />
					</label><br />
					<label>
						Package Name:<br />
						<input type="text" value={pkgnameState} onChange={handlePkgnameChange} className='theia-input' />
					</label><br />
					<label>
						Author/Maintainer Name:<br />
						<input type="text" value={maintnameState} onChange={handleMaintnameChange} className='theia-input' />
					</label><br />
				</div>

			);
			break;
		}
		case 8: {
			input = (
				<div>
					<label>
						Project Name:<br />
						<input type="text" value={projnameState} onChange={handleProjnameChange} className='theia-input' />
					</label><br />
					<label>
						Package Name:<br />
						<input type="text" value={pkgnameState} onChange={handlePkgnameChange} className='theia-input' />
					</label><br />
					<label>
						Author/Maintainer Name:<br />
						<input type="text" value={maintnameState} onChange={handleMaintnameChange} className='theia-input' />
					</label><br />
				</div>

			);
			break;
		}
		case 9: {
			input = (
				<div>
					<label>
						Project Name:<br />
						<input type="text" value={projnameState} onChange={handleProjnameChange} className='theia-input' />
					</label><br />
					<label>
						Package Name:<br />
						<input type="text" value={pkgnameState} onChange={handlePkgnameChange} className='theia-input' />
					</label><br />
					<label>
						Author/Maintainer Name:<br />
						<input type="text" value={maintnameState} onChange={handleMaintnameChange} className='theia-input' />
					</label><br />
					<label>
						List of applications to terminate upon installation:<br />
						<input type="text" value={kfilterState} onChange={handleKfilterChange} className='theia-input' />
					</label><br />
				</div>

			);
			break;
		}
		case 10: {
			input = (
				<div>
					<label>
						Project Name:<br />
						<input type="text" value={projnameState} onChange={handleProjnameChange} className='theia-input' />
					</label><br />
					<label>
						Package Name:<br />
						<input type="text" value={pkgnameState} onChange={handlePkgnameChange} className='theia-input' />
					</label><br />
					<label>
						Author/Maintainer Name:<br />
						<input type="text" value={maintnameState} onChange={handleMaintnameChange} className='theia-input' />
					</label><br />
					<label>
						Widget section (Today = NotificationCenterToday | All = NotificationCenter):<br />
						<input type="text" value={wsectionState} onChange={handleWsectionChange} className='theia-input' />
					</label><br />
					<label>
						List of applications to terminate upon installation:<br />
						<input type="text" value={kfilterState} onChange={handleKfilterChange} className='theia-input' />
					</label><br />
				</div>

			);
			break;
		}
		case 11: {
			input = (
				<div>
					<label>
						Project Name:<br />
						<input type="text" value={projnameState} onChange={handleProjnameChange} className='theia-input' />
					</label><br />
					<label>
						Package Name:<br />
						<input type="text" value={pkgnameState} onChange={handlePkgnameChange} className='theia-input' />
					</label><br />
					<label>
						Author/Maintainer Name:<br />
						<input type="text" value={maintnameState} onChange={handleMaintnameChange} className='theia-input' />
					</label><br />
					<label>
						Class Name Prefix:<br />
						<input type="text" value={cprefixState} onChange={handleCprefixChange} className='theia-input' />
					</label><br />
				</div>

			);
			break;
		}
		case 12: {
			input = (
				<div>
					<label>
						Project Name:<br />
						<input type="text" value={projnameState} onChange={handleProjnameChange} className='theia-input' />
					</label><br />
					<label>
						Package Name:<br />
						<input type="text" value={pkgnameState} onChange={handlePkgnameChange} className='theia-input' />
					</label><br />
					<label>
						Author/Maintainer Name:<br />
						<input type="text" value={maintnameState} onChange={handleMaintnameChange} className='theia-input' />
					</label><br />
				</div>

			);
			break;
		}
		case 13: {
			input = (
				<div>
					<label>
						Project Name:<br />
						<input type="text" value={projnameState} onChange={handleProjnameChange} className='theia-input' />
					</label><br />
					<label>
						Package Name:<br />
						<input type="text" value={pkgnameState} onChange={handlePkgnameChange} className='theia-input' />
					</label><br />
					<label>
						Author/Maintainer Name:<br />
						<input type="text" value={maintnameState} onChange={handleMaintnameChange} className='theia-input' />
					</label><br />
				</div>

			);
			break;
		}
		case 14: {
			input = (
				<div>
					<label>
						Project Name:<br />
						<input type="text" value={projnameState} onChange={handleProjnameChange} className='theia-input' />
					</label><br />
					<label>
						Package Name:<br />
						<input type="text" value={pkgnameState} onChange={handlePkgnameChange} className='theia-input' />
					</label><br />
					<label>
						Author/Maintainer Name:<br />
						<input type="text" value={maintnameState} onChange={handleMaintnameChange} className='theia-input' />
					</label><br />
				</div>

			);
			break;
		}
		case 15: {
			input = (
				<div>
					<label>
						Project Name:<br />
						<input type="text" value={projnameState} onChange={handleProjnameChange} className='theia-input' />
					</label><br />
					<label>
						Package Name:<br />
						<input type="text" value={pkgnameState} onChange={handlePkgnameChange} className='theia-input' />
					</label><br />
					<label>
						Author/Maintainer Name:<br />
						<input type="text" value={maintnameState} onChange={handleMaintnameChange} className='theia-input' />
					</label><br />
					<label>
						MobileSubstrate Bundle filter:<br />
						<input type="text" value={bfilterState} onChange={handleBfilterChange} className='theia-input' />
					</label><br />
					<label>
						List of applications to terminate upon installation:<br />
						<input type="text" value={kfilterState} onChange={handleKfilterChange} className='theia-input' />
					</label><br />
				</div>

			);
			break;
		}
		case 16: {
			input = (
				<div>
					<label>
						Project Name:<br />
						<input type="text" value={projnameState} onChange={handleProjnameChange} className='theia-input' />
					</label><br />
					<label>
						Package Name:<br />
						<input type="text" value={pkgnameState} onChange={handlePkgnameChange} className='theia-input' />
					</label><br />
					<label>
						Author/Maintainer Name:<br />
						<input type="text" value={maintnameState} onChange={handleMaintnameChange} className='theia-input' />
					</label><br />
					<label>
						MobileSubstrate Bundle filter:<br />
						<input type="text" value={bfilterState} onChange={handleBfilterChange} className='theia-input' />
					</label><br />
					<label>
						List of applications to terminate upon installation:<br />
						<input type="text" value={kfilterState} onChange={handleKfilterChange} className='theia-input' />
					</label><br />
				</div>

			);
			break;
		}
		case 17: {
			input = (
				<div>
					<label>
						Project Name:<br />
						<input type="text" value={projnameState} onChange={handleProjnameChange} className='theia-input' />
					</label><br />
					<label>
						Package Name:<br />
						<input type="text" value={pkgnameState} onChange={handlePkgnameChange} className='theia-input' />
					</label><br />
					<label>
						Author/Maintainer Name:<br />
						<input type="text" value={maintnameState} onChange={handleMaintnameChange} className='theia-input' />
					</label><br />
				</div>

			);
			break;
		}
		default: {
			input = null;
		}
	}

	if (fs.existsSync(path.join(root, 'theos'))) {
		content = (
			<div className='theia-container'>
				<form>
					<label>
						Template:<br />
						<select className='theia-select' defaultValue="0" onChange={handleTemplateChange}>
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
					</label><br />
					<label>
						Subdir:<br />
						<input type="text" value={subdirState} onChange={handleSubdirChange} className='theia-input' />
					</label><br />
					{input}<br />
				</form><br />
				<button className='theia-button' title='NIC' onClick={() => handleInputEnter()}>NIC</button><br /><h1></h1>
			</div>
		);
	}
	else {
		content = (
			<div className='theia-container'>
				<form>
					<label>
						Template:<br />
						<select disabled className='theia-select' defaultValue="0" onChange={handleTemplateChange}>
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
					</label><br />
					<label>
						Subdir:<br />
						<input disabled type="text" value={subdirState} onChange={handleSubdirChange} className='theia-input' />
					</label><br />
					{input}<br />
				</form><br />
				<button disabled className='theia-button' title='NIC' onClick={() => handleInputEnter()}>NIC</button><br /><h1></h1>
			</div>
		);
	}
	return (
		<div>{content}</div>
	);
}

const ProjectItem = (props: ProjectItemInterface) => {
	return (
		<div className='theia-container'>
			<h3>{props.project.projname}</h3>
			<h3>{props.project.pkgname}</h3>
			<h3>{props.project.maintname}</h3>
			<h3>{(() => {
				switch (props.project.template) {
					case 1: return "Activator Event";
					case 2: return "Activator Listener";
					case 3: return "Application Modern";
					case 4: return "Application Swift";
					case 5: return "Cydget";
					case 6: return "Flipswitch Switch";
					case 7: return "Framework";
					case 8: return "Library";
					case 9: return "Notification Center Widget";
					case 10: return "Notification Center Widget 7up";
					case 11: return "Preference Bundle Modern";
					case 12: return "Theme";
					case 13: return "Tool";
					case 14: return "Tool Swift";
					case 15: return "Tweak";
					case 16: return "Tweak With Simple Preferences";
					case 17: return "XPC Service";
					default: return "custom";
				}
			})()}</h3>
			<button className='theia-button' title='Remove' onClick={() => props.handleProjectRemove(props.project.id)}>Remove</button><br/><h1></h1>
			<div>{(() => {
				if (props.project.subprojects && props.project.subprojects.length > 0) {
					
					return (
						<div>
							<h3>Subprojects:</h3><br/>
							<ProjectList
								projects={props.project.subprojects}
								handleProjectRemove={props.handleProjectRemove}
							/>
						</div>
					);
				}
			})()}</div>
		</div>
	)
}

const ProjectList = (props: ProjectListInterface) => {
	return (
		<div className="theia-container">
			{props.projects.map((project) => (
				<div key={project.id}>
					<ProjectItem
						project={project}
						handleProjectRemove={props.handleProjectRemove}
					/>
				</div>
			))}
		</div>
	)
}

export const Project = () => {
	const [projects, setProjects] = React.useState<ProjectInterface[]>(detectProjects())
	function detectProjects(): ProjectInterface[] {
		var newProjectsState: ProjectInterface[] = [];
		const files = getFiles(path.join(root, 'theos/projects'));
		if (files !== undefined && files.length != 0) {

			let recurseJson = (Json: any, file: String): ProjectInterface => {

				let out: ProjectInterface = 
				{
					id: shortid.generate(),
					path: root + '/theos/projects/' + file,
					subdir: Json['subdir'],
					template: Json['template'],
					projname: Json['projname'],
					pkgname: Json['pkgname'],
					maintname: Json['maintname'],
					subprojects: []
				};
				switch (out.template)
				{
					case 1: {
						out.bfilter = Json['bfilter'];
						out.kfilter = Json['kfilter'];
						break;
					}
					case 2: {
						out.bfilter = Json['bfilter'];
						out.kfilter = Json['kfilter'];
						break;
					}
					case 3: {
						out.cprefix = Json['cprefix'];
						break;
					}
					case 4: {
						break;
					}
					case 5: {
						out.kfilter = Json['kfilter'];
						break;
					}
					case 6: {
						out.kfilter = Json['kfilter'];
						break;
					}
					case 7: {
						break;
					}
					case 8: {
						break;
					}
					case 9: {
						out.kfilter = Json['kfilter'];
						break;
					}
					case 10: {
						out.wsection = Json['wsection'];
						out.kfilter = Json['kfilter'];
						break;
					}
					case 11: {
						out.cprefix = Json['cprefix'];
						break;
					}
					case 12: {
						break;
					}
					case 13: {
						break;
					}
					case 14: {
						break;
					}
					case 15: {
						out.bfilter = Json['bfilter'];
						out.kfilter = Json['kfilter'];
						break;
					}
					case 16: {
						out.bfilter = Json['bfilter'];
						out.kfilter = Json['kfilter'];
						break;
					}
					case 17: {
						break;
					}
				}
				if (Json && Json['subprojects']) {
					for (var i = 0, l = Json['subprojects'].length; i < l; ++i) {
						var subproject = Json['subprojects'][i];
						out.subprojects.push(recurseJson(subproject, file));
					}
				}
				return out;

			}
			files.forEach((file: string) => {
				var Json = fs.readJSONSync(path.join(root, '/theos/projects/', file));
				const newProject: ProjectInterface = recurseJson(Json, file);
				newProjectsState.push(newProject);
			});
		}


		return newProjectsState;
	}
	function getFiles(path: string) {
		if (fs.existsSync(path)) {
			return fs.readdirSync(path).filter(function (file) {
				return fs.statSync(path + '/' + file).isFile();
			});
		}

	}
	function handleProjectCreate(project: ProjectInterface) {
		const rootPath = require('electron-root-path').rootPath;
		const process = require('child_process');
		var templater = require('json-templater/object');
		const script: string = path.join(rootPath, 'files/nic').toString();
		var cmd: string;
		switch(project.template)
		{
			case 1: {
				cmd = `bash -c "cd '${root}${project.subdir}' && '${script}' '${project.template}' '${root}' '${project.projname}' '${project.pkgname}' '${project.maintname}' '${project.bfilter}' '${project.kfilter}'"`;
				break;
			}
			case 2: {
				cmd = `bash -c "cd '${root}${project.subdir}' && '${script}' '${project.template}' '${root}' '${project.projname}' '${project.pkgname}' '${project.maintname}' '${project.bfilter}' '${project.kfilter}'"`;
				break;
			}
			case 3: {
				cmd = `bash -c "cd '${root}${project.subdir}' && '${script}' '${project.template}' '${root}' '${project.projname}' '${project.pkgname}' '${project.maintname}' '${project.cprefix}'"`;
				break;
			}
			case 4: {
				cmd = `bash -c "cd '${root}${project.subdir}' && '${script}' '${project.template}' '${root}' '${project.projname}' '${project.pkgname}' '${project.maintname}'"`;
				break;
			}
			case 5: {
				cmd = `bash -c "cd '${root}${project.subdir}' && '${script}' '${project.template}' '${root}' '${project.projname}' '${project.pkgname}' '${project.maintname}' '${project.kfilter}'"`;
				break;
			}
			case 6: {
				cmd = `bash -c "cd '${root}${project.subdir}' && '${script}' '${project.template}' '${root}' '${project.projname}' '${project.pkgname}' '${project.maintname}' '${project.kfilter}'"`;
				break;
			}
			case 7: {
				cmd = `bash -c "cd '${root}${project.subdir}' && '${script}' '${project.template}' '${root}' '${project.projname}' '${project.pkgname}' '${project.maintname}'"`;
				break;
			}
			case 8: {
				cmd = `bash -c "cd '${root}${project.subdir}' && '${script}' '${project.template}' '${root}' '${project.projname}' '${project.pkgname}' '${project.maintname}'"`;
				break;
			}
			case 9: {
				cmd = `bash -c "cd '${root}${project.subdir}' && '${script}' '${project.template}' '${root}' '${project.projname}' '${project.pkgname}' '${project.maintname}' '${project.kfilter}'"`;
				break;
			}
			case 10: {
				cmd = `bash -c "cd '${root}${project.subdir}' && '${script}' '${project.template}' '${root}' '${project.projname}' '${project.pkgname}' '${project.maintname}' '${project.wsection}' '${project.kfilter}'"`;
				break;
			}
			case 11: {
				cmd = `bash -c "cd '${root}${project.subdir}' && '${script}' '${project.template}' '${root}' '${project.projname}' '${project.pkgname}' '${project.maintname}' '${project.cprefix}'"`;
				break;
			}
			case 12: {
				cmd = `bash -c "cd '${root}${project.subdir}' && '${script}' '${project.template}' '${root}' '${project.projname}' '${project.pkgname}' '${project.maintname}'"`;
				break;
			}
			case 13: {
				cmd = `bash -c "cd '${root}${project.subdir}' && '${script}' '${project.template}' '${root}' '${project.projname}' '${project.pkgname}' '${project.maintname}'"`;
				break;
			}
			case 14: {
				cmd = `bash -c "cd '${root}${project.subdir}' && '${script}' '${project.template}' '${root}' '${project.projname}' '${project.pkgname}' '${project.maintname}'"`;
				break;
			}
			case 15: {
				cmd = `bash -c "cd '${root}${project.subdir}' && '${script}' '${project.template}' '${root}' '${project.projname}' '${project.pkgname}' '${project.maintname}' '${project.bfilter}' '${project.kfilter}'"`;
				break;
			}
			case 16: {
				cmd = `bash -c "cd '${root}${project.subdir}' && '${script}' '${project.template}' '${root}' '${project.projname}' '${project.pkgname}' '${project.maintname}' '${project.bfilter}' '${project.kfilter}'"`;
				break;
			}
			case 17: {
				cmd = `bash -c "cd '${root}${project.subdir}' && '${script}' '${project.template}' '${root}' '${project.projname}' '${project.pkgname}' '${project.maintname}'"`;
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
		nic.on('exit', ()=>{
			var Json = templater(JSON.parse("{\n  \"version\": \"2.0.0\",\n  \"tasks\": [\n    {\n      \"label\": \"Build {{name}} with Theos\",\n\"detail\": \"{{name}}\",\n      \"type\": \"shell\",\n      \"command\": \"THEOS=${workspaceFolder}/theos make -C {{name}}\",\n      \"problemMatcher\": {\n        \"fileLocation\": [\"relative\", \"${workspaceFolder}/{{name}}\"],\n        \"pattern\": {\n          \"regexp\": \"^(.*):(\\\\d+):(\\\\d+):\\\\s+(warning|error):\\\\s+(.*)$\",\n          \"file\": 1,\n          \"line\": 2,\n          \"column\": 3,\n          \"severity\": 4,\n          \"message\": 5\n        }\n      },\n      \"group\": {\n        \"kind\": \"build\",\n\"isDefault\": true\n      }\n    },\n    {\n      \"label\": \"Build & Install {{name}} with Theos\",\n\"detail\": \"{{name}}\",\n      \"type\": \"shell\",\n      \"command\": \"THEOS=${workspaceFolder}/theos make do -C {{name}}\",\n      \"problemMatcher\": {\n        \"fileLocation\": [\"relative\", \"${workspaceFolder}/{{name}}\"],\n        \"pattern\": {\n          \"regexp\": \"^(.*):(\\\\d+):(\\\\d+):\\\\s+(warning|error):\\\\s+(.*)$\",\n          \"file\": 1,\n          \"line\": 2,\n          \"column\": 3,\n          \"severity\": 4,\n          \"message\": 5\n        }\n      },\n      \"group\": {\n        \"kind\": \"test\",\n\"isDefault\": true\n      }\n    },\n    {\n      \"label\": \"Clean {{name}} with Theos\",\n\"detail\": \"{{name}}\",\n      \"type\": \"shell\",\n      \"command\": \"THEOS=${workspaceFolder}/theos make clean -C {{name}}\"\n    }\n  ]\n}"), { name: project.projname});
			var task1 = Json.tasks[0];
			var task2 = Json.tasks[1];
			var task3 = Json.tasks[2];
			if (project.subdir === "/")
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
			let newProjectsState: ProjectInterface[] = [...projects]
			if (project.subdir == '/')
			{
				newProjectsState.push(project)
			}
			else
			{
				newProjectsState = recursiveAddProject(newProjectsState, project);
			}
			newProjectsState.forEach(project => {
				const json: string = JSON.stringify(project, ['subdir', 'template', 'projname', 'pkgname', 'maintname', 'bfilter', 'kfilter', 'cprefix', 'wsection', 'subprojects'], 4);
				fs.writeFileSync(project.path, json);
			});
			setProjects(newProjectsState);
		});

	}
	function recursiveRemoveProject(projects: ProjectInterface[], id: string) : ProjectInterface[]
	{
		let out: ProjectInterface[] = projects;
		for(var i = 0, l = out.length; i < l; ++i)
		{
			if(out[i].subprojects.length > 0)
			{
				out[i].subprojects = recursiveRemoveProject(out[i].subprojects, id);
			}
			
		}
		out.forEach(p => {
			if (p.id === id)
			{
				if (fs.existsSync(path.join(root, p.subdir, 'Makefile')))
				{
					fs.readFile(path.join(root, p.subdir, 'Makefile'), 'utf8', function (err,data) {
						if (err) {
						  return console.log(err);
						}
						const re = RegExp(String.raw`^SUBPROJECTS \+\= ${p.projname}$`, 'gm')
						var result = data.replace(re, '');
					  
						fs.writeFile(path.join(root, p.subdir, 'Makefile'), result, 'utf8', function (err) {
						   if (err) return console.log(err);
						});
					});
					fs.rmdirSync(path.join(root, p.subdir, p.projname), {recursive: true});
				}
			}
		});
		out = out.filter(p => p.id !== id);

		return out;
	}
	function recursiveAddProject(projects: ProjectInterface[], project: ProjectInterface) : ProjectInterface[]
	{
		let out: ProjectInterface[] = projects;
		for(var i = 0, l = out.length; i < l; ++i)
		{
			if(out[i].subprojects.length > 0)
			{
				out[i].subprojects = recursiveAddProject(out[i].subprojects, project);
			}
			
		}
		if (projects.length > 0)
		{
			out = out.map(p => {
				if (path.join(p.subdir, p.projname) == project.subdir)
				{
					p.subprojects.push(project);
				}
				return p;
			});
		}
		else
		{
			out = [...projects, project];
			return out;
		}
		return out;
	}
	function handleProjectRemove(id: string) {
		let newProjectsState: ProjectInterface[] = [...projects]
		newProjectsState = recursiveRemoveProject(newProjectsState, id);
		newProjectsState.forEach(project => {
			const json: string = JSON.stringify(project, ['subdir', 'template', 'projname', 'pkgname', 'maintname', 'bfilter', 'kfilter', 'cprefix', 'wsection', 'subprojects'], 4);
			fs.writeFileSync(project.path, json);
		});
		projects.map(p => {
			if (!newProjectsState.includes(p))
			{
				return p;
			}
		}).forEach(project => {
			if (project)
			{
				fs.unlinkSync(project.path);
				fs.rmdirSync(path.join(root, project.subdir, project.projname), {recursive: true});
				var Json = fs.readJSONSync(path.join(root, '.vscode/tasks.json'));
				Json.tasks = Json.tasks.filter((task: any) => task['detail'] != project.projname);
				fs.writeFileSync(path.join(root, '.vscode/tasks.json'), JSON.stringify(Json, null, 4));
			}
		});
		setProjects(newProjectsState);
	}

	return (
		<div className="theia-container">
			<h1>Project Manager</h1>
			<ProjectForm
				projects={projects}
				handleProjectCreate={handleProjectCreate}
			/>

			<ProjectList
				projects={projects}
				handleProjectRemove={handleProjectRemove}
			/>
		</div>
	);
}
