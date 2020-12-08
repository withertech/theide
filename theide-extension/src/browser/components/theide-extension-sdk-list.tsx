// Import dependencies
import * as React from 'react'

// Import TodoItem
import SdkItem from './theide-extension-sdk-item'

// Import interfaces
import { SdkListInterface } from './../theide-extension-interfaces'

// TodoList component
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

export default SdkList