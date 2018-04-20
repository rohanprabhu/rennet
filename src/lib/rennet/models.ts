import { PathLike } from "fs";

export enum FileType {
    ModuleIndexReference,
    SpecializedModule,
    GenericModule
}

export class ManagedFile {
constructor(
    public sha1Digest: string,
    public fileType: FileType,
    public filePath: PathLike
) {}
}

export class ManagedComponent {
constructor(
    public componentFile: ManagedFile
) {}
}

export class RennetState {
constructor(
    public components: Array<ManagedComponent>
) {}
}

export class RennetOptions {
}

export class RennetConfig {
constructor(
    public rennetState: RennetState,
    public rennetOptions: RennetOptions
) {}
}
