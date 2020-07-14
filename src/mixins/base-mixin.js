import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin';

const langTerms = {};
const baseUrl = import.meta.url;

export const BaseMixin = superclass => class extends RtlMixin(LocalizeMixin(superclass)) {

	static async getLocalizeResources(langs) {
		const uniqueLangs = new Set(langs);

		const getLangUrl = function(lang) {
			const langTermRelativeUrl = `../../locales/${lang}.json`;
			return `${new URL(langTermRelativeUrl, baseUrl)}`;
		};

		for await (const lang of uniqueLangs) {
			if (!lang) {
				continue;
			}

			const langTermUrl = getLangUrl(lang);

			if (langTerms[langTermUrl]) {
				return await langTerms[langTermUrl];
			}

			langTerms[langTermUrl] = (async() => {
				let response = await fetch(langTermUrl);
				if (!response.ok) {
					response = await fetch(getLangUrl('en'));
				}
				const translations = await response.json();
				if (!translations) {
					return;
				}
				return {
					language: lang,
					resources: translations
				};
			})();

			return await langTerms[langTermUrl];
		}

		return null;
	}
	localize(key, params) {
		return super.localize(key, params) || `{language term '${key}' not found}`;
	}
};
