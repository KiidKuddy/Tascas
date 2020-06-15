import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TascaService } from '../_services/tasca.service';

import Tasca from '../models/tasca.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-tasca',
  templateUrl: './edit-tasca.component.html',
  styleUrls: ['./edit-tasca.component.css'],
})
export class EditTascaComponent implements OnInit {
  submitted = false;
  editTascaForm: FormGroup;
  selectedFile: File;
  tasca: Tasca;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tascaService: TascaService
  ) {
    this.editTascaForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      rating: [
        '',
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.max(10),
        ]),
      ]
    });
  }

  ngOnInit() {
    const tascaId: string = this.route.snapshot.paramMap.get('id');
    this.tascaService.fetchTasca(tascaId).subscribe((tasca: Tasca) => {
      this.tasca = tasca;
      this.editTascaForm.get('name').setValue(tasca.name);
      this.editTascaForm.get('address').setValue(tasca.address);
      this.editTascaForm.get('rating').setValue(tasca.rating);
    });
  }

  get form() {
    return this.editTascaForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.editTascaForm.invalid) {
      return;
    }

    this.tasca.name = this.editTascaForm.get('name').value;
    this.tasca.address = this.editTascaForm.get('address').value;
    this.tasca.rating = this.editTascaForm.get('rating').value;
    this.tasca.photo = this.selectedFile;

    this.tascaService
      .editTasca(this.tasca)
      .subscribe((next) => this.router.navigate(['/']));
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }
}
