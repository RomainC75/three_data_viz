export interface ICoordinates{
    x: number,
    y: number,
    z: number
}

export type TCoord = [number,number,number]

export interface IPoint{
    coord: TCoord
    size: number
    color: string
}