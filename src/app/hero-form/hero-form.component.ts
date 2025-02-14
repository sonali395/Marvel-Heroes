import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { Hero } from '../models/hero.model';
import { HeroActions } from '../store/actions/hero.actions';
import { COLUMN_DEFINITIONS } from '../config/constants';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
})
export class HeroFormComponent implements OnInit {
  heroForm: FormGroup;
  isEditMode = false;
  title = 'Create Hero';
  columnDefinitions = COLUMN_DEFINITIONS;

  constructor(
    private readonly dialogRef: MatDialogRef<HeroFormComponent>,
    private readonly store: Store,
    private readonly fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private readonly data: Hero
  ) {
    this.heroForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.columnDefinitions = [{ columnDef: 'id', header: 'ID', required: false }, ...COLUMN_DEFINITIONS];
    this.createDynamicFormFields();
    if (this.data && this.data.id) {
      this.isEditMode = true;
      this.title = 'Edit Hero';
      this.heroForm.patchValue(this.data);
    } else {
      this.heroForm.patchValue({ id: `id-${Math.random().toString(36).substring(2, 10)}` });
    }
  }

  createDynamicFormFields(): void {
    this.columnDefinitions.forEach(field => {
      this.heroForm.addControl(field.columnDef, this.fb.control('', field.required ? Validators.required : []));
    });
  }

  onSubmit(): void {
    if (this.heroForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.store.dispatch(HeroActions.updateHero({ id: this.heroForm.value.id, hero: this.heroForm.value }));
    } else {
      this.store.dispatch(HeroActions.addHero({ hero: this.heroForm.value }));
    }
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
