import { SdkItemInterface } from './../theide-extension-interfaces';
import * as React from 'react';
// TodoItem component
const SdkItem = (props: SdkItemInterface) => {
  return (
    <div className='theia-container'>
        <h2>{props.sdk.version}</h2>
        <h3>{props.sdk.path}</h3>
        <button className='theia-button secondary' title='Remove' onClick={() => props.handleSdkRemove(props.sdk.id)}>Remove</button><br/>
    </div>
  )
}

export default SdkItem