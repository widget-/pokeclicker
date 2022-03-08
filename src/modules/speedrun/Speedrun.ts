import {
    Observable as KnockoutObservable,
} from 'knockout';
import * as GameConstants from '../GameConstants';

export default class Speedrun {
    public active: KnockoutObservable<boolean>;

    constructor(
        public type: string,
        public description: string,
        active = false,
    ) {
        this.active = ko.observable(active);
    }

    activate(): void {
        this.active(true);
    }

    disable(): void {
        // If the player hasn't selected a starter yet, no need to confirm
        if (player.starter() === GameConstants.Starter.None) {
            this.active(false);
        }
    }

    toJSON(): boolean {
        return this.active();
    }
}
