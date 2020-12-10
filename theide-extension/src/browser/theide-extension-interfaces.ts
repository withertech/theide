export interface SdkInterface {
    id: string
    version: string
    path: string
}

// Todo form interface
export interface SdkFormInterface {
    sdks: SdkInterface[]
    handleSdkCreate: (sdk: SdkInterface) => void
}

// Todo list interface
export interface SdkListInterface {
    handleSdkUpdate: (
        event: React.ChangeEvent<HTMLInputElement>,
        id: string
    ) => void
    handleSdkRemove: (id: string) => void
    sdks: SdkInterface[]
}

// Todo item interface
export interface SdkItemInterface {
    handleSdkUpdate: (
        event: React.ChangeEvent<HTMLInputElement>,
        id: string
    ) => void
    handleSdkRemove: (id: string) => void
    sdk: SdkInterface
}
