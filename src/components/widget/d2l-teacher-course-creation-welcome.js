import '@brightspace-ui/core/components/button/button.js';
import '../create-course-illustration';
import { css, html, LitElement } from 'lit-element/lit-element';
import { BaseMixin } from '../../mixins/base-mixin';
import { heading2Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { PAGES } from '../../constants';
import { TccServiceFactory } from '../../services/tccServiceFactory';

class TeacherCourseCreationWelcome extends BaseMixin(LitElement) {

	static get properties() {
		return {
		};
	}

	static get styles() {
		return [heading2Styles, css`
			:host {
				display: inline-block;
				text-align: center;
			}
			:host([hidden]) {
				display: none;
			}
			.tcc-welcome__illustration {
				margin-top: 48px;
			}
			.tcc-welcome__text {
				margin-bottom: 30px;
			}
			.tcc-welcome__button-get-started {
				width: 100%;
				max-width: 250px;
			}
		`];
	}

	constructor() {
		super();

		this.tccService = TccServiceFactory.getTccService();
	}

	connectedCallback() {
		super.connectedCallback();
	}

	_changePage() {
		this.changePage(PAGES.INPUT_PAGE);
	}

	render() {
		return html`
			<div class="tcc-welcome__illustration">
				<tcc-create-course-illustration>
				</tcc-create-course-illustration>
			</div>


			<h1 class="d2l-heading-2">${this.localize('welcomeTitle')}</h1>
			<div class="tcc-welcome__text">
				${this.localize('welcomeText')}
			</div>

			<d2l-button
				class="tcc-welcome__button-get-started"
				description=${this.localize('welcomeButtonDescription')}
				@click=${this._changePage}>
				${this.localize('welcomeButtonText')}
			</d2l-button>
		`;
	}
}
customElements.define('d2l-tcc-welcome', TeacherCourseCreationWelcome);
