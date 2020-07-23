import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CafeService } from 'src/app/service/cafe.service';

@Component({
  selector: 'app-cafe',
  templateUrl: './cafe.component.html',
  styleUrls: ['./cafe.component.css'],
})
export class CafeComponent implements OnInit {
  CafeForm: FormGroup;
  update = false;
  Data;
  cafeId;
  constructor(public cafeService: CafeService, public fb: FormBuilder) {}

  ngOnInit(): void {
    this.CafeForm = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
    });
    this.cafeService.getCafes().subscribe((data) => {
      this.Data = data.map((e) => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          city: e.payload.doc.data()['city'],
        };
      });
    });
  }
  AddCafe() {
    console.log(this.CafeForm.value);
    this.cafeService.addCafes(this.CafeForm.value);
    this.CafeForm.reset();
  }
  delete(id) {
    this.cafeService.deleteCafe(id);
  }
  onclick(item) {
    this.update = true;
    this.cafeId = item.id;
    this.CafeForm.setValue({
      name: item.name,
      city: item.city,
    });
  }
  updateCafe() {
    this.update = false;
    this.cafeService.updateCafe(this.cafeId, this.CafeForm.value);
    this.cafeId = null;
  }
}
