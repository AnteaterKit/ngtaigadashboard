import {chain, Rule} from '@angular-devkit/schematics';
import {
  buildComponent
} from '@angular/cdk/schematics';
import {Schema} from './schema';

/**
 * Scaffolds a new table component.
 * Internally it bootstraps the base component schematic
 */
export default function(options: Schema): Rule {
  return chain([
    buildComponent({...options}, {
      template: './__path__/__name@dasherize@if-flat__/__name@dasherize__.component.html.template',
      stylesheet:
          './__path__/__name@dasherize@if-flat__/__name@dasherize__.component.__style__.template',
    })
  ]);
}