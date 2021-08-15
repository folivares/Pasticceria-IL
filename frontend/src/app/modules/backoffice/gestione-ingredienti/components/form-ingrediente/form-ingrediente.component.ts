import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IIngrediente } from 'src/app/core/models/ingrediente.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProgressBarService } from 'src/app/core/services/progress-bar.service';

/**
 * Component Form Ingrediente
 * 
 * Form per la creazione/modifica di un oggetto ingrediente
 */
@Component({
    selector: 'app-bo-ingredienti-form-ingrediente',
    templateUrl: './form-ingrediente.component.html',
    styleUrls: ['./form-ingrediente.component.css']
})
export class FormIngredienteComponent implements OnInit {

    @Input() ingrediente: IIngrediente;
    @Output() ingredienteModificato = new EventEmitter<IIngrediente>();

    listaIngredienti: IIngrediente[] = [];

    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private notificationService: NotificationService,
        public progressBarService: ProgressBarService) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            nome: ['', [Validators.required]],
            um: ['', [Validators.required]]
        });
        this.setValoriForm();
    }

    /**
     * Popola form in caso di oggetto ingrediente con id presente
     */
    setValoriForm() {
        if (!!this.ingrediente && this.ingrediente.id) {
            // popolo form
            this.form.patchValue({
                nome: this.ingrediente.nome,
                um: this.ingrediente.um
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
        this.ingrediente.nome = this.f.nome.value;
        this.ingrediente.um = this.f.um.value;
        this.inviaIngrediente();
    }

    /**
     * Invia oggetto ingrediente modificato a component superiore
     */
    inviaIngrediente() {
        this.ingredienteModificato.emit(this.ingrediente);
    }

}
