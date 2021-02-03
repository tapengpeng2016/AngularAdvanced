import { UserCardComponent } from './user-card/user-card.component';
import { NgModule } from '@angular/core'
import { UsersComponent } from './users.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [UsersComponent, UserCardComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        SharedModule
    ],
    exports: [UsersComponent, UserCardComponent]
})
export class UsersModule {}
