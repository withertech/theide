export interface SdkInterface {
    id: string
    version: string
    path: string
    active: boolean
}

// Todo form interface
export interface SdkFormInterface {
    sdks: SdkInterface[]
    handleSdkCreate: (sdk: SdkInterface) => void
    handleSelectionChange: (id: string) => void
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

export interface DeviceInterface {
    id: string
    name: string
    ip: string
    path: string
    active: boolean
}

// Todo form interface
export interface DeviceFormInterface {
    devices: DeviceInterface[]
    handleDeviceCreate: (device: DeviceInterface) => void
    handleSelectionChange: (id: string) => void
}

// Todo list interface
export interface DeviceListInterface {
    handleDeviceRemove: (id: string) => void
    devices: DeviceInterface[]
}

// Todo item interface
export interface DeviceItemInterface {
    handleDeviceRemove: (id: string) => void
    device: DeviceInterface
}

export interface ProjectInterface {
    id: string
    path: string
    subdir: string
    template: number
    projname: string
    pkgname: string
    maintname: string
    bfilter?: string
    kfilter?: string
    cprefix?: string
    wsection?: string
    subprojects: ProjectInterface[]
}

// Todo form interface
export interface ProjectFormInterface {
    projects: ProjectInterface[]
    handleProjectCreate: (project: ProjectInterface) => void
}

// Todo list interface
export interface ProjectListInterface {
    handleProjectRemove: (id: string) => void
    projects: ProjectInterface[]
}

// Todo item interface
export interface ProjectItemInterface {
    handleProjectRemove: (id: string) => void
    project: ProjectInterface
}