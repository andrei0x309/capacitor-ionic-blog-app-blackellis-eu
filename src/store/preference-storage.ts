import { Preferences } from '@capacitor/preferences';
import { CONSTANTS } from './constants';

await Preferences.configure({
    group: CONSTANTS.backgroundTaskLabel
})

export const setOption = async (key: string, value: any) => {
    await Preferences.set({
        key,
        value: JSON.stringify(value),
    });
};

export const getOption = async (key: string, defaultValue: any) => {
    const value = await Preferences.get({ key });
 
    if (value.value) {
        return JSON.parse(value.value);
    }
    return defaultValue;
};

export const allKeys = async () => {
    return await Preferences.keys()
};