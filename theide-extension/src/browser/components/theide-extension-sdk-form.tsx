import * as React from 'react';
import shortid from 'shortid';
import { root } from '../theide-extension-widget';
import {SdkInterface, SdkFormInterface} from './../theide-extension-interfaces';

const SdkForm = (props: SdkFormInterface) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    const [versionState, setVersionState] = React.useState('');
    const [pathState, setPathState] = React.useState('');

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setVersionState(event.target.value);
        setPathState(root + '/theos/sdks/iPhoneOS' + event.target.value + '.sdk');
    }

    function handleInputEnter(event: React.KeyboardEvent) {
        if (event.key === 'Enter') {
            const newSdk: SdkInterface = {
                id: shortid.generate(),
                version: versionState,
                path: pathState
            }

            props.handleSdkCreate(newSdk);

            if (inputRef && inputRef.current) {
                inputRef.current.value = '';
            }
        }
    }

    return (
        <div className="theia-container">
            <input
                ref={inputRef}
                className='theia-input'
                type="text"
                placeholder='Enter iOS Version'
                onChange={event => handleInputChange(event)}
                onKeyPress={event => handleInputEnter(event)}
            />
        </div>
    );
}

export default SdkForm