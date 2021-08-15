import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { IDolce } from 'src/app/core/models/dolce.model';
import { IFormAddVetrina } from 'src/app/core/models/form-add-vetrina';
import { IIngrediente } from 'src/app/core/models/ingrediente.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProgressBarService } from 'src/app/core/services/progress-bar.service';

/**
 * Component Form Vetrina
 * 
 * Form per la gestione della vendita di un dolce
 */
@Component({
    selector: 'app-bo-dolci-form-vetrina',
    templateUrl: './form-vetrina.component.html',
    styleUrls: ['./form-vetrina.component.css']
})
export class FormVetrinaComponent implements OnInit {

    @Input() dolce: IDolce;
    @Output() formCompilato = new EventEmitter<IFormAddVetrina>();

    listaIngredienti: IIngrediente[] = [];

    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private notificationService: NotificationService,
        public progressBarService: ProgressBarService) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            qta: [0, [Validators.required]],
            prezzoBase: [0, [Validators.required]]
        });
        this.setValoriForm();
    }

    /**
     * Popola form in caso di oggetto dolce vetrina presente
     */
    setValoriForm() {
        if (!!this.dolce.dolceVetrina && !!this.dolce.dolceVetrina.id) {
            // popolo form
            this.form.patchValue({
                qta: this.dolce.dolceVetrina.qta,
                prezzoBase: this.dolce.dolceVetrina.prezzoBase
            });
        }
    }

    /**
     * Accesso ai campi del form
     */
    get f() { return this.form.controls; }

    /**
     * Submit del form
     */
    onSubmit() {
        if (this.form.invalid) {
            this.notificationService.openSnackBar('Attenzione! Compilare correttamente tutti i campi');
            return;
        }
        // popolo oggetto dolce dal form
        const formAddVetrinaCompilato: IFormAddVetrina = {
            idDolce: this.dolce.id,
            qta: this.f.qta.value,
            prezzoBase: this.f.prezzoBase.value
        }
        this.inviaForm(formAddVetrinaCompilato);
    }

    /**
     * Invia oggetto dolce modificato a component superiore
     */
    inviaForm(formAddVetrinaCompilato: IFormAddVetrina) {
        this.formCompilato.emit(formAddVetrinaCompilato);
    }

}
