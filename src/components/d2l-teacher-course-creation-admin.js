import { css, html, LitElement } from 'lit-element/lit-element';
import { BaseMixin } from '../mixins/base-mixin';

class TeacherCourseCreationAdmin extends BaseMixin(LitElement) {

	static get properties() {
		return {
			prop1: { type: String },
		};
	}

	static get styles() {
		return css`
			:host {
				display: inline-block;
			}
			:host([hidden]) {
				display: none;
			}
		`;
	}

	constructor() {
		super();

		this.prop1 = 'custom-teacher-course-creation';
	}

	render() {
		return html`
			<h2>Hello ${this.prop1}!</h2>
			<div>Localization Example: ${this.localize('myLangTerm')}</div>
		`;
	}
}
customElements.define('d2l-tcc-admin', TeacherCourseCreationAdmin);
