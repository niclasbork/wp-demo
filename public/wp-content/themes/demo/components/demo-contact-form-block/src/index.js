/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import metadata from '../block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	/**
	 * @see ./save.js
	 */
	save: ({ attributes }) => {
		const { heading, toEmail, successMessage, errorMessage } = attributes;
		const blockProps = useBlockProps.save();

		return (
			<div { ...blockProps } data-to-email={toEmail} data-success-message={successMessage} data-error-message={errorMessage}>
				<h2 className="demo-contact-form-heading">{heading}</h2>
				<form className="demo-contact-form">
					<div className="form-group">
						<label htmlFor="contact-name">{__('Name:', 'demo-contact-form-block')}</label>
						<input type="text" id="contact-name" name="name" required />
					</div>
					<div className="form-group">
						<label htmlFor="contact-email">{__('Email:', 'demo-contact-form-block')}</label>
						<input type="email" id="contact-email" name="email" required />
					</div>
					<div className="form-group">
						<label htmlFor="contact-subject">{__('Subject:', 'demo-contact-form-block')}</label>
						<input type="text" id="contact-subject" name="subject" required />
					</div>
					<div className="form-group">
						<label htmlFor="contact-message">{__('Message:', 'demo-contact-form-block')}</label>
						<textarea id="contact-message" name="message" rows="5" required></textarea>
					</div>
					<button type="submit">{__('Send Message', 'demo-contact-form-block')}</button>
					<div className="form-message" aria-live="polite"></div>
				</form>
			</div>
		);
	},
} );