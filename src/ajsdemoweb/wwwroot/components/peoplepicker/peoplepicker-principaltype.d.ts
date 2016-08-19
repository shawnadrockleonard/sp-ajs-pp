declare module SharePointEnums {

    const enum Directions {
        Up,
        Down,
        Left,
        Right
    }

    export enum SPPrincipalType {
        None = 0,
        User = 1,
        DistributionList = 2,
        SecurityGroup = 4,
        SharePointGroup = 8,
        All = 15
    }
    //None | User | DistributionList | SecurityGroup | SharePointGroup

}