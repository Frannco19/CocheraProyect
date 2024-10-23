import { parkingLot } from "./parkingLot";

export interface Garage{
    id: number;
    descripcion: string;
    deshabilitado: number;
    eliminada: number;
    parkingLot: parkingLot | undefined;
}