import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { FlatpickrDirective } from './flatpickr.directive';
import { FlatpickrDefaults, FlatpickrDefaultsInterface } from './flatpickr-defaults.service';

export const USER_DEFAULTS: InjectionToken<string> = new InjectionToken('flatpickr defaults');

export function defaultsFactory(userDefaults: FlatpickrDefaultsInterface): FlatpickrDefaults {
  const defaults: FlatpickrDefaults = new FlatpickrDefaults();
  Object.assign(defaults, userDefaults);
  return defaults;
}

@NgModule({
  declarations: [
    FlatpickrDirective
  ],
  exports: [
    FlatpickrDirective
  ]
})
export class FlatpickrModule {

  static forRoot(userDefaults: FlatpickrDefaultsInterface = {}): ModuleWithProviders {
    return {
      ngModule: FlatpickrModule,
      providers: [{
        provide: USER_DEFAULTS,
        useValue: userDefaults
      }, {
        provide: FlatpickrDefaults,
        useFactory: defaultsFactory,
        deps: [USER_DEFAULTS]
      }]
    };
  }

}