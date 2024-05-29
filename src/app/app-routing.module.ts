import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObservablesComponent } from './observables/observables.component';
import { FormsComponent } from './forms/forms.component';
import { SingleFaceSnapComponent } from './single-face-snap/single-face-snap.component';

const routes: Routes = [
  { path: 'facesnaps/:id', component: SingleFaceSnapComponent },
  { path: 'observables', component: ObservablesComponent },
  { path: 'forms', component: FormsComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
