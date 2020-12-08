import * as React from 'react';
import SdkForm from './theide-extension-sdk-form'
import SdkList from './theide-extension-sdk-list'
import { SdkInterface } from '../theide-extension-interfaces'
//import * as path from 'path';
//import { root } from '../theide-extension-widget';
export const Sdk = () => {
    const [sdks, setSdks] = React.useState<SdkInterface[]>([])
    function handleSdkCreate(todo: SdkInterface) {
        const newSdksState: SdkInterface[] = [...sdks]
        newSdksState.push(todo)
        setSdks(newSdksState)
    }
    function handleSdkUpdate(event: React.ChangeEvent<HTMLInputElement>, id: string) {
        const newSdksState: SdkInterface[] = [...sdks]
        newSdksState.find((todo: SdkInterface) => todo.id === id)!.version = event.target.value
        setSdks(newSdksState)
    }
    function handleSdkRemove(id: string) {
        const newSdksState: SdkInterface[] = sdks.filter((sdk: SdkInterface) => sdk.id !== id)
        setSdks(newSdksState)
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
  )
}