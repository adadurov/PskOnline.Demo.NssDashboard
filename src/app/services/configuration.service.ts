﻿
import { Injectable } from '@angular/core';

import { AppTranslationService } from './app-translation.service';
import { LocalStoreManager } from './local-store-manager.service';
import { DBkeys } from './db-keys';
import { Utilities } from './utilities';
import { stringify } from 'querystring';



interface UserConfiguration {
    language: string;
}

@Injectable()
export class ConfigurationService {

    public static readonly appVersion: string = '1.0.0';

    // ***Specify default configurations here***
    public static readonly defaultLanguage: string = 'ru';
    public static readonly defaultHomeUrl: string = '/';
    public static readonly defaultTheme: string = 'Default';
    public static readonly defaultShowDashboardStatistics: boolean = true;
    public static readonly defaultShowDashboardNotifications: boolean = true;
    public static readonly defaultShowDashboardTodo: boolean = false;
    public static readonly defaultShowDashboardBanner: boolean = true;
    // ***End of defaults***

    public _baseUrl: string = Utilities.baseUrl();
    public fallbackBaseUrl = 'https://test.psk-online.ru';
    public loginUrl = '/auth';


    private _language: string = null;
    private readonly _homeUrl = '/';

    constructor(private localStorage: LocalStoreManager, private translationService: AppTranslationService) {
        this.loadLocalChanges();
    }

    get baseUrl() {
        const url = Utilities.baseUrl();
        if (url.includes('localhost')) {
            return this.fallbackBaseUrl;
        }
        return url;
    }

    private loadLocalChanges() {

        if (this.localStorage.exists(DBkeys.LANGUAGE)) {
            this._language = this.localStorage.getDataObject<string>(DBkeys.LANGUAGE);
            this.translationService.changeLanguage(this._language);
        } else {
            this.resetLanguage();
        }
    }

    private saveToLocalStore(data: any, key: string) {
        setTimeout(() => this.localStorage.savePermanentData(data, key));
    }

    public import(jsonValue: string) {

        this.clearLocalChanges();

        if (!jsonValue) {
            return;
        }

        const importValue: UserConfiguration = Utilities.JSonTryParse(jsonValue);

        if (importValue.language != null) {
            this.language = importValue.language;
        }
    }

    public export(changesOnly = true): string {

        const exportValue: UserConfiguration = {
            language: changesOnly ? this._language : this.language
        };

        return JSON.stringify(exportValue);
    }

    public clearLocalChanges() {
        this._language = null;

        this.localStorage.deleteData(DBkeys.LANGUAGE);

        this.resetLanguage();
    }


    private resetLanguage() {
        const language = this.translationService.useBrowserLanguage();

        if (language) {
            this._language = language;
        } else {
            this._language = this.translationService.changeLanguage();
        }
    }

    set language(value: string) {
        this._language = value;
        this.saveToLocalStore(value, DBkeys.LANGUAGE);
        this.translationService.changeLanguage(value);
    }
    get language() {
        if (this._language != null) {
            return this._language;
        }
        return ConfigurationService.defaultLanguage;
    }

    get homeUrl() {
        return this._homeUrl;
    }

}
