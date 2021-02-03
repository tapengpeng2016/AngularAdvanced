import { UserService } from './app/core/services/user.service';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const providers = [{
  provide: 'BASE_URL',
  useValue: environment.apiUrl
}];

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.error(err));
