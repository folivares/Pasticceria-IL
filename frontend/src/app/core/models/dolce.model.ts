import { IDolceVetrina } from "./dolce-vetrina.model";
import { IIngredienteDolce } from "./ingrediente-dolce.model";

export interface IDolce {

    id?: number;
    nome: string;
    ingredientiDolce: IIngredienteDolce[];
    dolceVetrina: IDolceVetrina;

}