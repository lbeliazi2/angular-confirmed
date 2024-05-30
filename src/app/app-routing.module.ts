import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObservablesComponent } from './observables/observables.component';
import { FormsComponent } from './forms/forms.component';
import { HttpClientComponent } from './http-client/http-client.component';

const routes: Routes = [
  { path: 'facesnaps/:id', component: HttpClientComponent },
  { path: 'observables', component: ObservablesComponent },
  { path: 'forms', component: FormsComponent },
  { path: 'http-client', component: HttpClientComponent }
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
