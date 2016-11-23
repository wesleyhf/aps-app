import { Component } from '@angular/core';
import {
    NavController,
    LoadingController,
    ModalController,
    AlertController,
} from 'ionic-angular';

// services
import { ClientService } from '../../providers/client-service';

// pages
import { ClientCreatePage } from '../client-create/client-create'

@Component({
    selector: 'page-clients',
    templateUrl: 'clients.html',
    providers: [
        ClientService,
    ],
})

export class ClientsPage {
    loader: any;
    clients = [];

    createPage = ClientCreatePage;

    constructor(
        public nav: NavController,
        private loading: LoadingController,
        private modal: ModalController,
        private alert: AlertController,
        public clientService: ClientService,
    ) {
        this.load();
    }

    load(reload = false) {
        if (this.clients.length && !reload) return;

        this.createLoader();

        this.clientService.load(reload)
            .then(data => {
                this.clients = data;
                this.loader.dismiss();

                console.log(this.clients);
            });
    }

    createLoader() {
        this.loader = this.loading.create({
            content: 'Loading...',
        });

        this.loader.present();
    }

    clientCreateModal() {
        let clientCreateModal = this.modal.create(ClientCreatePage);

        clientCreateModal.onDidDismiss(data => {
            this.load(data.reload);
        });

        clientCreateModal.present();
    }

    destroyClient(id) {
        let confirm = this.alert.create({
            title: 'Destroy',
            message: 'Do you agree to destroy this user?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                },
                {
                    text: 'Destroy',
                    handler: () => {
                        this.createLoader();

                        this.clientService.destroy(id)
                            .then(data => {
                                this.loader.dismiss();
                                this.load(true);
                            });
                    }
                }
            ]
        });

        confirm.present();
    }
}
