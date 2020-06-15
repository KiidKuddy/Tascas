import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditTascaComponent } from './edit-tasca/edit-tasca.component';
import { HomeComponent } from './home/home.component';
import { TascaDetailsComponent } from './tasca-details/tasca-details.component';
import { ImageResolver } from './_services/resolvers/image-resolver.service';
import { TascaResolver } from './_services/resolvers/tasca-resolver.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'edit-tasca/:id', component: EditTascaComponent },
  {
    path: 'tasca-details/:id',
    component: TascaDetailsComponent,
    resolve: {
      tasca: TascaResolver,
      image: ImageResolver
    },
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
