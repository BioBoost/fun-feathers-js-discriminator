// Initializes the `posts` service on path `/posts`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Posts } from './posts.class';
import createModel from '../../models/posts.model';
import hooks from './posts.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'posts': Posts & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const models = createModel(app);

  const options = {
    Model: models[0],
    paginate: app.get('paginate'),
    discriminators: models.slice(1)
  };

  // Initialize our service with any options it requires
  app.use('/posts', new Posts(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('posts');

  service.hooks(hooks);
}
