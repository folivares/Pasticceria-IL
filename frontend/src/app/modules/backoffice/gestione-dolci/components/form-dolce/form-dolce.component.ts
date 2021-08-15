import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { IDolce } from 'src/app/core/models/dolce.model';
import { IIngrediente } from 'src/app/core/models/ingrediente.model';
import { IngredientiService } from 'src/app/core/services/ingredienti.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProgressBarService } from 'src/app/core/services/progress-bar.service';

/**
 * Component Form Dolce
 * 
 * Form per la creazione/modifica di un oggetto dolce
 */
@Component({
    selector: 'app-bo-dolci-form-dolce',
    templateUrl: './form-dolce.component.html',
    styleUrls: ['./form-dolce.component.css']
})
export class FormDolceComponent implements OnInit {

    @Input() dolce: IDolce;
    @Output() dolceModificato = new EventEmitter<IDolce>();

    listaIngredienti: IIngrediente[] = [];

    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private ingredientiService: IngredientiService,
        private notificationService: NotificationService,
        public progressBarService: ProgressBarService) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            nome: ['', [Validators.required]],
            ingredienti: this.formBuilder.array([])
        });
        this.setValoriForm();
        this.loadIngredienti();
    }

    /**
     * Richiedi lista ingredienti a servizio REST API
     * per popolare la selecet ingredienti del form
     */
    loadIngredienti() {
        this.ingredientiService.getAllIngredienti()
            .then(
                (result: IIngrediente[]) => {
                    this.listaIngredienti = result;
                }
            )
            .catch((error) => {
                this.notificationService.openSnackBarWithDismiss(error?.error?.response || 'Si è verificato un errore');
            }
            )
            .finally(() => {

            });
    }

    /**
     * Popola form in caso di oggetto dolce con id presente
     */
    setValoriForm() {
        if (!!this.dolce && this.dolce.id) {
            // creo formarray ingredienti
            this.dolce.ingredientiDolce.forEach(ingrediente => {
                const ingredienteForm = this.formBuilder.group({
                    id: [ingrediente.ingrediente.id, Validators.required],
                    qta: [ingrediente.qta, Validators.required],
                });
                this.ingredienti.push(ingredienteForm);
            });
            // popolo form
            this.form.patchValue({
                nome: this.dolce.nome
            });
        }
    }

    /**
     * Accesso ai campi del form
     */
    get f() { return this.form.controls; }

    /**
     * Accesso al form array degli ingredienti
     */
    get ingredienti() {
        return this.form.controls["ingredienti"] as FormArray;
    }

    /**
     *  Aggiungi nuovo ingrediente form
     */
    addIngrediente() {
        // verifica se esistono ingredienti form
        // e se l'ultmo è valido
        const latestIngredienteForm = this.ingredienti.controls[this.ingredienti.controls.length - 1];
        if (!!latestIngredienteForm && latestIngredienteForm.invalid) {
            return;
        }
        const ingredienteForm = this.formBuilder.group({
            id: ['', Validators.required],
            qta: [0, Validators.required],

        });
        this.ingredienti.push(ingredienteForm);
    }

    /**
     * Rimuovi ingrediente form
     * 
     * @param ingredienteIndex 
     */
    deleteIngrediente(ingredienteIndex: number) {
        this.ingredienti.removeAt(ingredienteIndex);
    }

    /**
     * Verifica la presenza di duplicati dopo la selezione di un ingrediente
     * 
     * @param select 
     * @param selectIndex 
     */
    onSelectIngrediente(select: any, selectIndex: number) {
        const idIngrediente = select.value;
        const ingredientiDuplicati = this.ingredienti.controls.filter(i => i.get('id').value == idIngrediente);
        if (!!ingredientiDuplicati && ingredientiDuplicati.length > 1) {
            this.deleteIngrediente(selectIndex);
            this.notificationService.openSnackBar('Attenzione! L\'ingrediente è già stato aggiunto');
        }
    }

    /**
     * Submit del form
     */
    onSubmit() {
        if (this.form.invalid) {
            this.notificationService.openSnackBar('Attenzione! Compilare correttamente tutti i campi');
            return;
        }
        // popolo oggetto dolce dal form
        this.dolce.nome = this.f.nome.value;
        let ingredientiDolce = [];
        this.ingredienti.controls.forEach(currentForm => {
            let ingredienteDolce = {
                ingrediente: {
                    id: currentForm.get('id').value
                },
                qta: currentForm.get('qta').value,
            }
            ingredientiDolce.push(ingredienteDolce);
        });
        this.dolce.ingredientiDolce = ingredientiDolce;
        this.inviaDolce();
    }

    /**
     * Invia oggetto dolce modificato a component superiore
     */
    inviaDolce() {
        this.dolceModificato.emit(this.dolce);
    }

}
