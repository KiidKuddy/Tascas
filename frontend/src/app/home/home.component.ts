import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TascaService } from '../_services/tasca.service';
import Tasca from '../models/tasca.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  submitted = false;
  createTascaForm: FormGroup;
  selectedFile: File;
  tascas: Tasca[] = [];

  private savedTascas: Tasca[];

  @ViewChild('file') file: ElementRef;
  @ViewChild('notiflixCreated') notiflixCreated: ElementRef;
  @ViewChild('notiflixDeleted') notiflixDeleted: ElementRef;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private tascaService: TascaService
  ) {
    this.createTascaForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      rating: [
        '',
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.max(10),
        ]),
      ],
      photo: '',
    });
  }

  ngOnInit() {
    this.tascaService
      .fetchTascas()
      .subscribe((data: Tasca[]) => (this.tascas = data));
  }

  get form() {
    return this.createTascaForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.createTascaForm.invalid) {
      return;
    }

    const newTasca = new Tasca({
      name: this.createTascaForm.get('name').value,
      address: this.createTascaForm.get('address').value,
      rating: this.createTascaForm.get('rating').value,
      photo: this.selectedFile,
    });

    this.tascaService.createTasca(newTasca).subscribe(
      (next) => {
        this.submitted = false;
        this.selectedFile = undefined;
        this.createTascaForm.reset();
        this.tascaService.fetchTascas().subscribe(
          (data: Tasca[]) => (this.tascas = data),
          () => this.notiflixCreated.nativeElement.click()
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onCancel() {
    this.createTascaForm.reset();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  onKeyUp(event: any) {
    const searchString: string = event.target.value.toLowerCase();
    if (searchString.length === 0) {
      this.tascas = this.savedTascas;
      return;
    }

    if (!this.savedTascas) {
      this.savedTascas = this.tascas;
    }
    this.tascas = this.tascas.filter((tasca) => {
      return (
        tasca.name.toLowerCase().includes(searchString) ||
        tasca.address.toLowerCase().includes(searchString) ||
        tasca.rating.toString().includes(searchString)
      );
    });
  }

  deleteTasca(tasca: Tasca) {
    this.tascaService.deleteTasca(tasca._id).subscribe((next) => {
      this.tascas.splice(this.tascas.indexOf(tasca), 1);
      this.notiflixDeleted.nativeElement.click();
    });
  }

  showTascaDetails(tascaId: string) {
    this.router.navigate(['/tasca-details', tascaId]);
  }

  sortTableByName() {
    this.tascas.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }

  sortTableByAddress() {
    this.tascas.sort((a, b) => {
      if (a.address < b.address) {
        return -1;
      }
      if (a.address > b.address) {
        return 1;
      }
      return 0;
    });
  }

  sortTableByRating() {
    this.tascas.sort((a, b) => {
      if (a.rating < b.rating) {
        return -1;
      }
      if (a.rating > b.rating) {
        return 1;
      }
      return 0;
    });
  }
}
