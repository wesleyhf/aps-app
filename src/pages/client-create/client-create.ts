import { Component } from '@angular/core';
import {
    NavController,
    LoadingController,
    AlertController,
    ViewController
} from 'ionic-angular';

// services
import { ClientService } from '../../providers/client-service';

@Component({
    selector: 'page-client-create',
    templateUrl: 'client-create.html',
    providers: [
        ClientService,
    ],
})

export class ClientCreatePage {
    loader: any;
    reload = false;
    form = {
        name: '',
        cpf: '',
        gender: 'm',
    };

    constructor(
        public nav: NavController,
        private loading: LoadingController,
        private alert: AlertController,
        private view: ViewController,
        public clientService: ClientService,
    ) {
        // ...
    }

    createLoader() {
        this.loader = this.loading.create({
            content: 'Loading...',
        });

        this.loader.present();
    }

    create() {
        this.createLoader();

        this.clientService.save(this.form)
            .then(data => {
                this.loader.dismiss();

                let alert = this.alert.create({
                    title: 'Created',
                    subTitle: `Client ${this.form.name} created with success.`,
                    buttons: [
                        {
                            text: 'OK',
                            handler: () => {
                                this.view.dismiss({
                                    reload: true,
                                });
                            },
                        }
                    ]
                });

                alert.present();
            });
    }
}
