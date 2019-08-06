import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhotoService } from '../photo/photo.service';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/components/alert/alert.service';
import { UserService } from '../../core/user/user.service';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File; // criado para poder enviar o binario da imagem
  preview: string;

  constructor(
    private formBuilder: FormBuilder, // como foi colocado o reactiveforrmmodule no modulo
                      // da pra inserir o formbuilder no constructor do component
    private photoService: PhotoService, // injeta para usar o servico
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.photoForm = this.formBuilder.group({

      file: ['', Validators.required], // tem que ser o mesmo nome no formControlName="file"
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    })
  }

  upload() {
    const description = this.photoForm.get('description').value; // nao da pra usar o getrawvalue
    const allowComments = this.photoForm.get('allowComments').value;
    this.photoService
      .upload(description, allowComments, this.file) //
      .subscribe(() => {
        this.alertService.success('Upload complete', true);
        this.router.navigate(['/user', this.userService.getUserName()]);
      });
        
  }

  handleFile(file: File) { // para fazer a conversao em base 64
    this.file = file;
    const reader = new FileReader(); // javascript
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }
}
