// Initializes the `images` service on path `/images`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Images } from './images.class';
import createModel from '../../models/images.model';
import hooks from './images.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'images': Images & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/images', new Images(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('images');

  service.hooks(hooks);
}
