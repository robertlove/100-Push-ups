import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestsPage } from './tests';

@NgModule({
  declarations: [
    TestsPage,
  ],
  imports: [
    IonicPageModule.forChild(TestsPage),
  ],
})

export class TestsPageModule {}
