import { Saveable } from '../DataStore/common/Saveable';
import Speedrun from './Speedrun';

export default class SpeedrunSettings implements Saveable {
    saveKey = 'speedrun_settings';

    defaults: Record<string, any> = {};

    list: Record<string, Speedrun> = {
        autoclicker: new Speedrun('Enable autoclicker', 'Automatically click every 100ms when holding the mouse down on the battlefield'),
        show_stats: new Speedrun('Show speedrun stats', 'Always show extended statistics useful for validating speedruns'),
        skip_ui_animations: new Speedrun('Disable UI animations', 'Disable all slow UI animations, such as popup fade-ins and fade-outs'),
        disable_event_pokemon: new Speedrun('Disable event Pokémon', 'Prevent invalid runs by disabling all event Pokémon'),
    };

    fromJSON(json): void {
        if (!json || !json.list) {
            return;
        }

        Object.entries(json.list).forEach(([challenge, value]) => {
            this.list[challenge]?.active(!!value);
        });
    }

    toJSON(): Record<string, any> {
        const list = {};
        Object.entries(this.list).forEach(([c, v]) => {
            list[c] = v.active();
        });
        return {
            list,
        };
    }
}
